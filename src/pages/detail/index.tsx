import './detail.less'
import { useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// 导入ant组件
import { Flex, Button, Tabs } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd';
// 导入自定义组件
import BasicInformation from '../../components/detail/BasicInformation'
import ProductPreview from '../../components/detail/ProductPreview'
// 导入API
import { getExmple, getReview,getApproved,getRejected,getBatches } from '../../api/detail'
// 导入类型
import {exmpleType,serverType} from "../../types/server"

const Detail = (props: any) => {
    const navigate = useNavigate();
    console.log(props);

    
    
    const overview = {
        updateUserId: '114515',
        id: '20202459886545342',
        createUSerId: '11234',
        state: 6
    }

    const onChange = (key: string) => {
        setTabKey(key);
    };
    let [tabKey, setTabKey] = useState('1');
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '基础信息'
        },
        {
            key: '2',
            label: '商品预览'
        }
    ];

    const basic = {
        name: "爱奇艺会议1",
        typeId: "虚拟",
        serviceGuarantee: "服务保障",
        description: "描述",
        categoryId: "商品分类",
        exchangeRestriction: "兑换限制",
        createTime: "创建时间",
        updateTime: "更新时间",
        time_off: "下线时间",
        time_on: "上线时间",
        cityWhiteList: "无限制",
        cityBlackList: "无限制",
        picture: ["https://seatmeat.oss-cn-shanghai.aliyuncs.com/Friend/Winter.jpg", "https://seatmeat.oss-cn-shanghai.aliyuncs.com/Friend/Winter.jpg", "https://seatmeat.oss-cn-shanghai.aliyuncs.com/Friend/Winter.jpg", "https://seatmeat.oss-cn-shanghai.aliyuncs.com/Friend/Winter.jpg"],
        Gname: "供应商",
        Gphone: "1992379919"
    }
    const preview = {
        name: '六色高颜值冰川杯',
        picture: "https://seatmeat.oss-cn-shanghai.aliyuncs.com/Friend/Winter.jpg",
        price: "基础价69元",
        description: '59积分+24.90元',
        basic: "月售130"
    }

    // 编辑
    const handleEdit = () => {
        console.log('编辑')
        // 跳转到编辑页
        setTimeout(() => {
            navigate('/exmple')
        }, 200)
    }
    // 发起审核
    const handleReview = (id:string) => {
        getReview(id).then((res) => {
            console.log(res)
        }).catch((e: any) => {
            console.log(e)
        })
    }
    
    // 审核通过
    const handlePermission = (id:string) => {
        console.log('审核通过')
        getExmple().then((res) => {
            console.log(res)
        }).catch((e: exmpleType) => {
            console.log(e)
        })

        getApproved(id).then((res) => {
            console.log(res)
        }).catch((e: any) => {
            console.log(e)
        })
    }

    // 审核驳回
    const handleRejection = (id:string) => {
        getRejected(id).then((res) => {
            console.log(res)
        }).catch((e: any) => {
            console.log(e)
        })
    }

    // 上线或下线请求
    const handleOnline = (ids:string[]) => {
        getBatches(ids).then((res) => {
            console.log(res)
        }).catch((e: any) => {
            console.log(e)
        })
    }
    return (
        <>
            <Flex vertical={true} gap="small" className='detail'>
                {/* btns */}
                <Flex className='btns' align='center' justify='space-between' >
                    <Flex gap="large">
                        <UserOutlined />
                        <h3>商品详情页</h3>
                    </Flex>
                    <Flex gap="middle">
                        <Button type='primary' onClick={handleEdit}>编辑</Button>
                        <Button type='primary' onClick={() => handleReview(overview.id)} >发起审核</Button>
                        <Button type='primary' onClick={() => handlePermission(overview.id)}>审核通过</Button>
                        <Button type='primary' onClick={() => handleRejection(overview.id)}>审核驳回</Button>
                        <Button danger type='primary' onClick={() => handleOnline([overview.id])}>上线</Button>
                    </Flex>
                </Flex>

                {/* overview */}
                <Flex className="overview" wrap={true}>
                    <div>管理人：{overview.updateUserId}</div>
                    <div>创建人：{overview.createUSerId}</div>
                    <div>权益ID：{overview.id}</div>
                    <div>状态：{overview.state == 1 && '暂存'}
                        {overview.state == 2 && '审核中'}
                        {overview.state == 3 && '审核通过'}
                        {overview.state == 4 && '审核驳回'}
                        {overview.state == 5 && '上线'}
                        {overview.state == 6 && '下线'}
                    </div>
                </Flex>

                {/* tabs */}
                <Tabs className='tabs' defaultActiveKey="1" items={items} onChange={onChange} />
                {tabKey == '1' ? <BasicInformation {...basic} /> : <ProductPreview {...preview} />}
            </Flex>
        </>
    );
}

// export default Detail;
const mapStateToProps = (state:any) => {
    return state.auth
}
export default connect(mapStateToProps,null)(Detail)