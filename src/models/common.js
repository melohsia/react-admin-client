import { getFileList, uploadFile, deleteFileByUid } from '@/services/api/common'
import { resultHandler } from '@/utils/resultHandler';

export default {
    namespace: 'common',
    state: {
        fileList: []
    },
    effects: {
      * getFileList({ payload }, { call, put }) {
        const { isSuccess, data } = resultHandler(yield call(getFileList));
        const fileList = isSuccess ? data : [];
        if(isSuccess){
            yield put({
                type: 'save',
                payload: { fileList }
            })
        }
      },

      * upload({ payload }, { call, put }) {
        const { isSuccess, data } = resultHandler(yield call(uploadFile));
      },
      * deleteFile({ payload }, { call, put }) {
        const { isSuccess, data } = resultHandler(yield call(deleteFileByUid, payload));
        const fileList = isSuccess ? data : [];
        if(isSuccess){
            yield put({
                type: 'save',
                payload: { fileList }
            })
        }
      },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    }
  }