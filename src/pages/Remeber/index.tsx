import { useState } from 'react';
import type { FormProps } from 'antd';
import { Flex, Form, Input, Button, message } from 'antd';
import { MailOutlined, RobotOutlined, LockOutlined } from '@ant-design/icons';
import { remeberDataType } from '../../types/user'
import './index.less'
import { postRemeberAPI,postEmailCode } from '../../api/user'

const Remeber = () => {
    const [email, setEmail] = useState('');


    const [codeSent, setCodeSent] = useState(false);
    const [form] = Form.useForm();

    const onFinish: FormProps<remeberDataType>['onFinish'] = (values) => {
        console.log('Received values:', values);

        const { email, code, password } = values;
        const remeberData = {
            email,
            code,
            password
        }   
        postRemeberAPI(remeberData).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

        if (codeSent) {
            message.success('密码修改成功');
        } else {
            message.error('请检查验证码输入是否正确！');
        }
    };

    // 获取验证码按钮的点击事件处理逻辑
    const handleGetCode = () => {
        // 所有字段通过验证，可以执行获取验证码的操作
        form.validateFields().then(() => {
            const getCode = {email,type:"forget"}
            console.log(getCode);
            
            postEmailCode(getCode).then((res) => {
                console.log(res);
            })
            // 获取验证码按钮被点击变为disabled状态，在此调用发送邮箱验证码的接口
            setCodeSent(true);
            message.success('验证码已发送至邮箱！');
        }).catch((errorInfo) => {
            // 有字段未通过验证，显示错误提示
            message.error('请完整填写表单');
        });
    }
    return (
        <Flex align='center' vertical={true} gap={30} className="remeber">
            <h2>重置密码</h2>
            <Form
                name="remeber"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: '请输入邮箱号！' }]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="code"
                    rules={[{ required: true, message: '请输入验证码！' }]}
                >
                    <Flex gap="small">
                        <Input prefix={<RobotOutlined className="site-form-item-icon" />} placeholder="Code" />
                        <Button className='btn' onClick={ handleGetCode} disabled={codeSent}>
                            {codeSent ? '已发送验证码' : '获取验证码'}
                        </Button>
                    </Flex>
                </Form.Item>


                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码！' }]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
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
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" className="remeber-form-button">
                        修改密码
                    </Button>
                </Form.Item>

            </Form>
        </Flex>
    )
}

export default Remeber