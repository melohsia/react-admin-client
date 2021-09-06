// import { SUCCESS_CODE } from '@/common/responseCode';
// import { notification } from 'antd';
// import { formatMessage } from 'umi-plugin-react/locale';

const errorStatus = [400, 401, 403, 404, 405, 406, 410, 413, 422, 500, 502, 503, 504];

export function resultHandler(response) {
  let isSuccess = false;
  if (!response || errorStatus.indexOf(response.status) > -1) return { isSuccess };
  const { data, msgCode } = response;
  isSuccess = true
  // if (code === SUCCESS_CODE) {
  //   isSuccess = true
  // } else if (msgCode) {
  //   notification.error({ message: { id: msgCode } });
  // }
  return { isSuccess, data, msgCode }
}
