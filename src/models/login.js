import { resultHandler } from '@/utils/resultHandler';
import { accountLogin } from '@/services/api/login';
import Auth from '@/common/auth'

export default {
  namespace: 'login',
  state: {

  },
  effects: {
    * getLogin({ payload }, { call, put }) {
      const { isSuccess, data } = resultHandler(yield call(accountLogin, payload));
      const loginResult = isSuccess ? data : [];
      isSuccess && Auth.setAuthInfo(JSON.stringify(loginResult))
      return new Promise((resolve) => {
        resolve(isSuccess)
      })
    }
  }
}
