import { useState, useEffect } from 'react';
import { Flex, Form, Input, Button, Select, Cascader, CascaderProps, Typography, message } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
// 导入useNavigate
import { useNavigate } from 'react-router-dom'
import { InfoCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { Product } from '../../types/product.ts'
import { postCreate } from '../../api/edit.ts'

import './index.less'
import citySelect from './city.tsx';
const { Option } = Select;

const NewProductPage = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  // const [draftSaved, setDraftSaved] = useState(false);
  const [methodid, setMethodid] = useState<string>('');
  const [timeon, setTimeson] = useState("2000-01-01T00:11:00")
  const [timeoff, setTimesoff] = useState("2000-01-05T12:12:12")
  
  // 表单初始数据
  const [initialValues, setInitValues] = useState(
    {
    name: "新商品",
    picture: "http...",
    description: "...",
    typeId: "1-1",
    categoryId: "1-1-1",
    supplierName: "cvqw",
    supplierPhone: "12256398192",
    serviceGuarantee: "。。。",

    stock: 123,
    exchangeRestriction: 10,

    proxyUserInfoDtos: [
      
    ],

    productMarketList:[
      {
        purchaseType: 0,
        integralAmount: 100
      },
      {
        purchaseType: 1,
        integralAmount: 100,
        cashPrice: 40
      }
    ],

    cityBlackList: [['衡阳市'], ['岳阳市']],
    cityWhiteList: [['长沙市'], ['湘潭市']],
    // cityBlackList: [['衡阳市'], ['岳阳市']],
    // cityWhiteList: [['长沙市'], ['湘潭市']],
    timeOn: [dayjs('2000-01-01 00:11:00')],
    timeOff: [dayjs('2000-01-05 12:12:12')]

  }
)

localStorage.setItem('detail',JSON.stringify(initialValues))
  const [productMarketList, setProductMarketList] = useState([
    {
      purchaseType: 0,
      integralAmount: 100
    },
    {
      purchaseType: 1,
      integralAmount: 100,
      cashPrice: 40
    }
  ]
  );

  const [initProductElse, setInitProductElse] = useState<InitProductElse>({
    cityBlackList: [['衡阳市'], ['岳阳市']],
    cityWhiteList: [['长沙市'], ['湘潭市']],
    timeOn: [dayjs('2000-01-01 00:11:00')],
    timeOff: [dayjs('2000-01-05 12:12:12')]
  })

  // 通用间距
  const commonGap = {
    gap: 30,
    select: 20,
    input: 200
  }

  /* 兑换价格类型 */
  const handlePriceChange = (value: any, index: number) => {
    const updatedList = [...productMarketList];
    console.log(index);
    updatedList[index].purchaseType = value
    console.log(updatedList);

    setProductMarketList(updatedList);
  };


  const handleDelete = (index: number) => {
    const updatedList = [...productMarketList];
    updatedList.splice(index, 1);
    setProductMarketList(updatedList);
  };

  const handleAdd = () => {
    const newItem = {
      purchaseType: 0,
      integralAmount: 100,
      cashPrice: 40
    };

    setProductMarketList([...productMarketList, newItem]);
  };


  // 黑名单
  interface OP {
    value: string;
    label: string;
    children?: OP[];
  }
  interface InitProductElse {
    cityBlackList: string[][];
    cityWhiteList: string[][];
    timeOn: dayjs.Dayjs[];
    timeOff: dayjs.Dayjs[];
  }
  const handleBlackCityChange: CascaderProps<OP>['onChange'] = (value: string[]) => {
    console.log(value);
    const newCityBlackList = (value as string[]).map((v) => [v[0]]);
    setInitProductElse((prevState) => ({
      ...prevState,
      cityBlackList: newCityBlackList
    }));
  };
  const handleWhiteCityChange: CascaderProps<OP>['onChange'] = (value: string[]) => {
    console.log(value);
    const newCityWhiteList = (value as string[]).map((v) => [v[0]]);
    setInitProductElse((prevState) => ({
      ...prevState,
      cityWhiteList: newCityWhiteList
    }));
  };


  // 上线时间 | 下线时间
  const onChangeOn: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    const formattedDateString = Array.isArray(dateString) ? dateString[0] : dateString;
    setInitProductElse((prevState) => ({
      ...prevState,
      timeOn: [dayjs(formattedDateString)]
    }))
    const time = initProductElse.timeOff.map(date => date.format('YYYY-MM-DD HH:mm:ss')).toString().replace(/^\[|\]$/g, '').replace(' ', 'T')
    console.log(time);
    
    setTimeson(time)
  };
  const onChangeOff: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
    console.log(date);
    console.log("下线时间");
    const formattedDateString = Array.isArray(dateString) ? dateString[0] : dateString;
    setInitProductElse((prevState) => ({
      ...prevState,
      timeOff: [dayjs(formattedDateString)]
    }))

    const time = initProductElse.timeOff.map(date => date.format('YYYY-MM-DD HH:mm:ss')).toString().replace(/^\[|\]$/g, '').replace(' ', 'T')
    setTimesoff(time)
  };

  const handleReset = () => {
    setMethodid('2')
    setProductMarketList([])
    setInitProductElse({
      cityBlackList: [],
      cityWhiteList: [],
      timeOn: [],
      timeOff: []
    })
    setInitValues({
      name: '',
      picture: '',
      description: '',
      typeId: '',
      categoryId: '',
      supplierName: '',
      supplierPhone: '',
      serviceGuarantee: '',
      stock: 0,
      exchangeRestriction: 0,
      proxyUserInfoDtos: [],
      productMarketList:[],
      cityBlackList:[],
      cityWhiteList:[],
      timeOn:[],
      timeOff:[]
    })
  }
  useEffect(() => {
    if (methodid === '2') {
      form.resetFields();
    }
  }, [methodid])

  const onFinish = (values: Product) => {
    // 提交表单数据到服务器
    // console.log('Submitted product data:', values);
    // console.log(productMarketList);
    // console.log(initProductElse.timeOff);
    // 选择需要保留的字段
    const {
      name,
      picture,
      description,
      typeId,
      categoryId,
      supplierName,
      supplierPhone,
      serviceGuarantee,
      exchangeRestriction,
      ...rest
    } = values;

    // 构建新的对象，只包含选择的字段
    const filteredData = {
      name,
      picture,
      description,
      typeId,
      categoryId,
      supplierName,
      supplierPhone,
      serviceGuarantee,
      exchangeRestriction
    };
    const { cityBlackList, cityWhiteList } = initProductElse
    const filteredDataElse = {
      cityBlackList:cityBlackList.flat().join(','),
      cityWhiteList:cityWhiteList.flat().join(',')
    };
    const productData = {
      ...filteredData,
      productMarketList,
      ...filteredDataElse,
      timeOff:timeoff,
      timeOn:timeon,
      stock: 123, // 这个不知道是什么
      proxyUserInfoDtos: [] // 代理人暂时为空
    };
    console.log(productData);

    console.log(methodid);
    switch (methodid) {
      case '1':
        console.log('提交');
        postCreate('1', productData).then((res) => {
          console.log('res:', res);
          navigate('/detail')
          
          localStorage.setItem('ProductId',res.data)

          
          
        })
        // message.success("创建商品成功")
        localStorage.setItem('detail',JSON.stringify(initialValues))
        break;
      case '2':
        console.log('重置');
        // setInitProductElse({})
        setProductMarketList([])
        // setInitValues({})
        break;
      case '3':
        console.log('存草稿');
        postCreate('0', productData).then((res) => {
          console.log('res:', res);
        })
        message.success("保存草稿成功")
        localStorage.setItem('detail',JSON.stringify(initialValues))
        break;
      default:
        break;
    }


  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      className='newProduct'
    >

      <h3>基本信息</h3>
      <Flex gap={commonGap.gap} >
        <Form.Item
          label="商品名称"
          name="name"
          className='name'
          rules={[{ required: true, message: '请输入商品名称' }]}
        >
          <Input placeholder='请输入商品名称' />
        </Form.Item>

        <Form.Item
          label="商品头像"
          name="picture"
        >
          <Input placeholder='请输入画眉的图片地址' />
        </Form.Item>
      </Flex>

      <Form.Item
        label="商品文字描述"
        name="description"
        rules={[{ required: true, message: '请输入详细描述，最大不超过100字' }]}
      >
        <Input.TextArea style={{ width: 500, height: 140, resize: 'none' }} placeholder='请输入详细描述，最大不超过100字' />
      </Form.Item>

      <Flex gap={commonGap.gap}>
        <Form.Item
          label="商品类型"
          name="typeId"
          rules={[{ required: true, message: '请选择' }]}
        >
          <Select placeholder="请选择" className='select' defaultValue={initialValues.typeId}>
            <Option value="1">一级</Option>
            <Option value="1-1">二级</Option>
            <Option value="1-1-1">三级</Option>
          </Select>
        </Form.Item>


        <Button onClick={() => { navigate('/detail') }} style={{ marginTop: 30 }}>商品详情</Button>
        {/* </Form.Item> */}
        <Form.Item
          label="商品分类"
          name="categoryId"
          rules={[{ required: true, message: '请选择' }]}
        >
          <Select placeholder="请选择" className='select' defaultValue={initialValues.categoryId}>
            <Option value="1">一级</Option>
            <Option value="1-1">二级</Option>
            <Option value="1-1-1">三级</Option>
          </Select>
        </Form.Item>
      </Flex>

      <h3>服务条款</h3>
      <Flex gap={commonGap.gap}>
        <Form.Item
          label="供应商名称"
          className='goods_name'
          name="supplierName"
          rules={[{ required: true, message: '请输入供应商名称' }]}
        >
          <Input placeholder='请输入供应商名称' />
        </Form.Item>

        <Form.Item
          label="供应商联系方式"
          name="supplierPhone"
          rules={[{ required: true, message: '供应商联系方式' }]}
        >
          <Input placeholder='请输入供应商联系方式' />
        </Form.Item>
      </Flex>

      <Form.Item
        label="服务保障"
        name="serviceGuarantee"
        rules={[{ required: true, message: '请输入服务保障' }]}
      >
        <Input.TextArea placeholder='请输入服务保障' style={{ width: 500, height: 140, resize: 'none' }} />
      </Form.Item>



      <h3>兑换价格</h3>
      {
        productMarketList && productMarketList.map((item, index) => {
          return (
            <Flex gap={commonGap.gap} key={index}>
              <Form.Item
                label="价格类型"
                name={`purchaseType-${index}`}
              >
                <Select onChange={(value) => handlePriceChange(value, index)} placeholder="请选择" className='select' defaultValue={item.purchaseType.toString()} >
                  <Option value="0">纯积分</Option>
                  <Option value="1">积分加钱</Option>
                  <Option value="2">现金</Option>
                </Select>
              </Form.Item>


              {(item.purchaseType == 0 || item.purchaseType == 1) && (
                <Flex gap="middle" align='center'>
                  <Form.Item
                    label="积分数量"
                    name={`integralAmount-${index}`}

                  >
                    <Input placeholder='请输入' defaultValue={item.integralAmount} />
                  </Form.Item>
                </Flex>
              )}

              {(item.purchaseType == 2 || item.purchaseType == 1) && (
                <Form.Item
                  label="现金价格"
                  name={`cashPrice-${index}`}

                >
                  <Input placeholder='请输入' defaultValue={item.cashPrice} />
                </Form.Item>
              )}
              <DeleteOutlined onClick={() => handleDelete(index)} />
            </Flex>
          )
        })
      }
      <Button type="dashed" onClick={handleAdd} style={{ width: 600, marginLeft: 30 }}>
        + 添加一行价格类型
      </Button>

      <h3>快递</h3>
      {/* <p>()</p> */}
      <Form.Item
          label="不发货地区"
          name="cityBlackList"
          rules={[{ required: true, message: '请选择' }]}
        >
      <Cascader
        options={citySelect.citySelect}
        defaultValue={initialValues.cityBlackList}
        className='select select_city'
        placeholder="选择城市"
        onChange={handleBlackCityChange}
        showSearch
        multiple
      />
     </Form.Item>

      <h3>兑换限制</h3>
      <Form.Item
        label="兑换上限"
        name="exchangeRestriction"
        tooltip={{ title: '兑换限制', icon: <InfoCircleOutlined /> }}
        className='goods_name'
      >
        <Input placeholder='请输入' defaultValue={initialValues.exchangeRestriction}/>
      </Form.Item>


      <Flex gap={commonGap.gap}>

      <Form.Item 
       label="上线时间"
       name="timeOn"
       className='goods_name'
      >
        <Space direction="vertical">
          {/* <Typography.Title className='online_time'></Typography.Title> */}
          <DatePicker
            // style={{width:300}}
            showTime
            onChange={onChangeOn}
            maxTagCount="responsive"
            defaultValue={initialValues.timeOn}
          />
        </Space>
        </Form.Item>

        <Form.Item 
       label="下线时间"
       name="timeOff"
       className='goods_name'
      >
        <Space direction="vertical">
          {/* <Typography.Title className='online_time'>下线时间</Typography.Title> */}
          <DatePicker
            showTime
            onChange={onChangeOff}
            maxTagCount="responsive"
            defaultValue={initialValues.timeOff}
          />
        </Space>

        </Form.Item>

        <Form.Item 
       label="投放城市"
       name="cityWhiteList"
       className='goods_name'
      >
        {/* <Flex vertical={true} gap={10} className='select_city'> */}
          {/* <div></div> */}
          <Cascader
            options={citySelect.citySelect}
            placeholder="Please select cities"
            defaultValue={initialValues.cityWhiteList}
            onChange={handleWhiteCityChange}
            showSearch
            multiple
          />
           </Form.Item>
        {/* </Flex> */}
      </Flex>

      <Form.Item>
        <Flex gap="large" style={{ marginTop: 20, marginLeft: -10 }}>
          <Button type="primary" htmlType="submit" onClick={() => { setMethodid('1') }}>
            提交
          </Button>

          <Button type="primary" onClick={handleReset}>
            重置
          </Button>

          <Button type="primary" htmlType="submit" onClick={() => { setMethodid('3') }}>
            保存为草稿
          </Button>
          {/* {draftSaved && <span style={{ marginLeft: '10px', color: 'green' }}>草稿已保存</span>} */}
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default NewProductPage;