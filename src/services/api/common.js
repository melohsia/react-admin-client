import request from '../request'

export const getFileList = async () => request('/fileList')
export const uploadFile = async (formData) => request('/fileUpload', { method: 'POST', formData, headers: { ContentType: 'multipart/form-data' }})
export const deleteFileByUid = async (data) => request('/deleteFile?uid=' + data.uid)