const AUTH_INFO = 'AUTH_INFO'
// const AUTH_URL = 'AUTH_URL'
// const AUTH_PERMISSIONS = 'AUTH_PERMISSIONS'

function setAuthInfo (value) {
    try {
        localStorage.setItem(AUTH_INFO, value || '')
    } catch (e) {
        console.log('set auth info failed' + e)
    }
}

function getAuthInfo () {
    try {
        const authInfo = localStorage.getItem(AUTH_INFO)
        if (authInfo) {
            return JSON.parse(authInfo)
        } else return ''
    } catch (e) {
        console.log('get auth info failed' + e)
    }
}

function getAuthToken () {
    try {
        const authInfo = getAuthInfo()
        if (authInfo.access_token) {
            return authInfo.access_token
        } else return ''
    } catch (e) {
        console.log('get auth token failed' + e)
        return ''
    }
}

function validateToken () {
    const authInfo = getAuthInfo()
    if(getAuthToken()){
        return  authInfo.exp > Date.parse(new Date())
    }else{
        return false
    }
}

export default{
    setAuthInfo,
    getAuthInfo,
    getAuthToken,
    validateToken
}


