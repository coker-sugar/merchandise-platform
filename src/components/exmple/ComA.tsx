// 用类的形式创建ComA组件
import React from 'react'
import { connect } from 'react-redux'
import './common.less'
import { Button } from 'antd';
// 引入api文件夹下的user.ts/postLoginAPI这一APi
import { postLoginAPI } from '../../api/user';


class ComA extends React.Component {
    handleClick = () => {
        this.props.sendAction()
    }

    handleRequest = () => {
        // 调用postLoginAPI
        postLoginAPI({
            username: 'admin',
            password: '123456'
        }).then(res => {
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                <Button className='btn' onClick={this.handleClick}> + </Button>
                <Button onClick={this.handleRequest}>发起请求</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (disptch: any) => {
    return {
        sendAction: () => {
            disptch({
                type: 'ADD'
            })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps // 第二个参数是发送action
)(ComA)
