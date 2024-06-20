import type { FormProps } from 'antd';
import { Flex, Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginDataType } from '../../types/user'
import { postLoginAPI } from '../../api/user'
import './index.less'

const onFinish: FormProps<loginDataType>['onFinish'] = (values) => {
  console.log('Success:', values);
  const { username, password } = values
  const valuesData = { username, password }
  console.log(valuesData);

  // 发送请求
  postLoginAPI(valuesData).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
};

const onFinishFailed: FormProps<loginDataType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {
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
  );
}

export default Login;