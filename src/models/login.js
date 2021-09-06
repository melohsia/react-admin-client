import { resultHandler } from '@/utils/resultHandler';
import { accountLogin } from '@/services/api/login';

export default {
  namespace: 'login',
  state: {

  },
  effects: {
    *getLogin({ payload }, { call, put }) {
      console.log('payload', payload)
      const { isSuccess, data } = resultHandler(yield call(accountLogin, payload));
      const loginResult = isSuccess ? data : [];
      console.log('loginResult', loginResult)
    }
  },
  reducers: {

  },
}
