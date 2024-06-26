import { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import './index.css';
import { postRegisterAPI, getEmailCode } from '../../api/user'
import { registerDataType } from '../../types/user'


const Register = () => {
  const [codeSent, setCodeSent] = useState(false);
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');


  // 提交表单后处理逻辑
  const onFinish = (values: registerDataType) => {
    console.log('Received values:', values);

    const { email, code, password } = values;
    const registerData = {
      email,
      code,
      password
    }


    postRegisterAPI(registerData).then(res => {
      console.log(res)
      // 跳转至登录
    }).catch(err => {
      console.log(err)
    })
    // 验证码已发送，可以执行注册操作
    // if (codeSent) {
    //   // 处理注册逻辑，此处模拟后端注册请求
     
    // } else {
    //   message.error('请获取验证码！');
    // }
  };

  // 获取验证码按钮的点击事件处理逻辑
  const handleGetCode = () => {
    // 除code外所有字段通过验证，可以执行获取验证码的操作
    form.validateFields(['email']).then(() => {
      // 获取验证码按钮被点击变为disabled状态，在此调用发送邮箱验证码的接口
      // message.success('验证码已发送至邮箱！');
      // const getCode = {email,type:"register"}
      // console.log(getCode);
      // getEmailCode(getCode).then((res) => {
      //   console.log(res);
      //   // console.log(res.message.email.substring(0, 6));
      //   // alert(`验证码为：${res.message.email.substring(0, 6)}`)

      // }).catch((err) => {
      //   console.log(err);
      // })
      // setCodeSent(true);
      // message.success('验证码已发送至邮箱！');
      const getCode = { email, type: "forget" }
      getEmailCode(getCode).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
        console.log("请求错误");
        console.log(err);
        if (err.message.includes('|')) {
            message.success(`请求成功，请复制：${ err.message.split('|')[0]}`) ;
        } else {
            message.error(err.message)
        }
      })

    }).catch((error) => {
      // 有字段未通过验证，显示错误提示
      message.error('请填写邮箱');
    });


  };

  return (
    <div className="register">
      <h1 className='register-header'>一站式商品管理平台</h1>

      <Row className='register-content' justify="center" align="middle" style={{ height: '100vh' }}>
        <Col span={8}>
          <Form
            form={form}
            name="register-form"
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >

            <Form.Item
              label="邮箱号"
              name="email"
              rules={[{ required: true, message: '请输入邮箱号！' }]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="验证码"
              name="code"

              rules={[{ required: true, message: '请输入验证码！' }]}
            >
              <div style={{ display: 'flex' }}>
                <Input />
                <Button onClick={handleGetCode} >
                  {codeSent ? '已发送验证码' : '获取验证码'}
                </Button>
              </div>
            </Form.Item>


            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请再次输入密码！',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
              <Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px' }}>
                注册
              </Button>
            </Form.Item>

          </Form>
        </Col>
      </Row>

      <div className="register-footer">
        <p>@2023蚂蚁集团体验技术部出品</p>
      </div>

    </div>

  );
}

export default Register;
