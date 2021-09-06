
import React, { useState, useEffect, useRef, memo } from 'react'
import { getAll, accountLogin } from '@/services/api/login';
import { connect } from 'react-redux';
import imgUrl from '@/common/imgUrl'
import style from './index.less'

const Login = ({ dispatch }) => {
    
    return(
        <div>
            登录
        </div>
    )
}

export default connect(({ login }) => ({ login }))(Login)