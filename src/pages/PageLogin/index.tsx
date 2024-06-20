import React from "react"
import type { FormProps } from 'antd';
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Flex, Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginDataType } from '../../types/user'
import { postLoginAPI } from '../../api/user'

// import { setAuthData } from '../../redux/reducer/user'

import { AppDispatch } from '../../redux/store'
import './index.less'


const Login = (props: any) => {
  const navigate = useNavigate()
  const onFinish: FormProps<loginDataType>['onFinish'] = (values) => {
    console.log('Success:', values);
    const { username, password } = values
    const loginData = { username, password }
     // 发送请求
    postLoginAPI(loginData).then(res => {
      console.log(res)

    const Logindata = {
      expire: "2024-06-1614:19:15.243",
      Id: 1,
      roleId: 1,
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6MSwiZXhwIjoxNzE5NzUyMjcwLCJpYXQiOjE3MTg4ODgyNzAsImp0aSI6ImFhZjAxNjgyLTdhYTgtNGQ0MS05NWZmLWI4MzhmZWI2ZjUwYyIsImF1dGhvcml0aWVzIjpbIlJPTEVfdXNlciJdfQ.UaReOsE28vKIT8FbHV2uESo_XB3uabH_bh0iYRxuKYQ",
      username: "admin"
    }
    props.setToken(Logindata)
    localStorage.setItem('user', JSON.stringify(Logindata))
    // 这里该如何跳转至首页
    navigate('/')
      }).catch(err => {
        console.log(err)
      })
  };

  const onFinishFailed: FormProps<loginDataType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Flex vertical={true} align='center' gap={10} className='login'>
      <h2>小二商城</h2>
      <div className='title'>小二商城数据管理平台</div>
      <Form
        name="login"
        className="login-form"
        initialValues={{ auto: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<loginDataType>

          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item<loginDataType>
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item >
          <Form.Item<loginDataType>
            name="auto"
            valuePropName="checked"
            noStyle
          >
            <Checkbox>自动登录</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/remeber">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>

        </Form.Item>
        Or <a href="/register">register now!</a>
      </Form>

    </Flex>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setToken: (data: any) => {
      console.log(dispatch({
        type: 'setUser',
        payload: data
      }));
    }
  }
}

export default connect(
  null,
  mapDispatchToProps // 第二个参数是发送action
)(Login);