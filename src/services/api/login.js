import request from '../request'

export const accountLogin = async (data) => request('/login', {method: 'POST', data})