import React, { useEffect, useState } from 'react'
import { Upload, message, Button } from 'antd';
import { connect } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';


const FileUpload = ({ dispatch, fileList }) => {

    useEffect(() => {
        dispatch({
            type: 'common/getFileList'
        })
    }, [dispatch])

    const onChange = (info) => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
        dispatch({
            type: 'common/getFileList'
        })
      }
    
    const onRemove = (info) => {
        console.log('info', info)
        let { uid } = info
        uid = Math.abs(uid) - 1
        dispatch({
            type: 'common/deleteFile',
            payload: { uid }
        }).then(() => {
            dispatch({
                type: 'common/getFileList'
            })
        })
    }

    return (
        <>
            <Upload
                action="api/fileUpload"
                listType="picture"
                onChange={ onChange }
                fileList={fileList}
                onRemove={ onRemove }
            >
                <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
            <br />
        </>
    )
}

export default connect(({ common }) => ({ fileList: common.fileList }))(FileUpload)