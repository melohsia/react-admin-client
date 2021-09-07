import request from '../request'

export const getFileList = async () => request('/fileList')
export const deleteFileByUid = async (data) => request('/deleteFile?uid=' + data.uid)