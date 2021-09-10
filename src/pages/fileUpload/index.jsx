import React, { useEffect } from 'react'
import { Upload, message, Button } from 'antd';
import { connect } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import CryptoJS from 'crypto-js'
import axios from 'axios'

const FileUpload = ({ dispatch, fileList }) => {

    useEffect(() => {
        dispatch({
            type: 'common/getFileList'
        })
    }, [dispatch])

    const onChange = (info) => {
        const { file } = info
        if (file.status !== 'uploading') {
            console.log(file, info.fileList);
        }
        if (file.status === 'done') {
          message.success(`${file.name} 上传成功`);
        } else if (file.status === 'error') {
          message.error(`${file.name} 上传失败`);
        } console.log(file, info.fileList);
        dispatch({
            type: 'common/getFileList'
        })
      }
    
    const onRemove = (info) => {
        let { uid } = info
        dispatch({
            type: 'common/deleteFile',
            payload: { uid }
        }).then(() => {
            dispatch({
                type: 'common/getFileList'
            })
        })
    }

    const setData = (file) => {
        return {uid: file.uid}
    }

    const read = (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onError = reject
            reader.readAsBinaryString(file)
        })
    }

    const customRequest = async (options) => {
        const { file } = options
        const content = await read(file)
        //获取整个文件的hash值
        const hash = CryptoJS.MD5(content)
        const { size, name, type } = file

        let uploaded = 0  
        const local = localStorage.getItem(hash)
        if(local){
            uploaded = Number(local)
        }

        const chunkSize = 2 * 1024 *1024
        let total = Math.ceil(size/chunkSize)
        while(uploaded < size){
            const chunk = file.slice(uploaded, uploaded + chunkSize, type)
            const index = Math.floor(uploaded / chunkSize)

            /**
             * FormData对象用以将数据编译成键值对，以便用XMLHttpRequest来发送数据。
             * 其主要用于发送表单数据，但亦可用于发送带键数据(keyed data)，而独立于表单使用。
             */
            const formData = new FormData()
            formData.append('name', name)
            formData.append('size', size)
            formData.append('type', type)
            formData.append('file', chunk)
            formData.append('offset', uploaded)
            formData.append('hash', hash)
            formData.append('index', index)
            formData.append('total', total)
            try {
                await axios.post('/api/fileUpload', formData)
            } catch (error) {
                console.log('error', error)
            }

            uploaded += chunk.size
            localStorage.setItem(hash, uploaded)

            // if(uploaded > breakpoint){
            //     return
            // }
        }
        // 请求分片合并
        const formData = new FormData()
        formData.append('name', name)
        formData.append('total', total)
        formData.append('hash', hash)
        try {
            await axios.post('/api/mergeFiles', formData)
        } catch (error) {
            console.log('error', error)
        }
    }


    return (
        <>
            <Upload
                action="/api/fileUpload"
                listType="picture"
                onChange={ onChange }
                // defaultFileList={ fileList }
                onRemove={ onRemove }
                data={ setData }
                customRequest={ customRequest }
            >
                <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
            <br />
        </>
    )
}

export default connect(({ common }) => ({ fileList: common.fileList }))(FileUpload)