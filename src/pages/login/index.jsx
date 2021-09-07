
// import React, { useState, useEffect, useRef, memo } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import imgUrl from '@/common/imgUrl';
import { LOGIN_TIPS } from './config'
import style from './index.less';

const Login = ({ dispatch, history }) => {

    const onFinish = (values) => {
        dispatch({
            type: 'login/getLogin',
            payload: values
        }).then((isSuccess) => {
            isSuccess && history.replace('/fileUpload')
        })
    }
    
    return(
        <div className={style.loginContainer}>
            <img className={style.logoImg} src={imgUrl.cloudLogo} alt='404'></img>
            <div className={style.loginPanelContainer}>
                <div className={style.loginPanel}>
                    <div className={style.title}>云平台</div>
                    <div className={style.loginContent}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <label>登录名</label>
                            <Form.Item
                                name="username"
                                style={{ height: '30px' }}
                                rules={[]}
                            >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                style={{ height: '38px'}} 
                                placeholder= { LOGIN_TIPS.USER_PLACE } 
                            />
                            </Form.Item>
                            <label>密码</label>
                            <Form.Item
                                name="password"
                                style={{ height: '20px' }}
                                rules={[]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password" 
                                    style={{ height: '38px'}} 
                                />
                            </Form.Item>
                            <Form.Item style={{ height: '20px' }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item style={{ height: '30px' }}>
                                <Button type="primary" htmlType="submit" className={style.loginButton}>登录</Button>
                                <div className={style.checkIn}>注册</div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect()(Login)