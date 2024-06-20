import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Select ,Cascader} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';

import   citySelect  from './city.tsx';
const { Option } = Select;
const { RangePicker } = DatePicker;

const NewProductPage = () => {
  const [form] = Form.useForm();
  const [draftSaved, setDraftSaved] = useState(false);

  // 模拟已登录的代理人信息
  const agentInfo = {
    id: 123,
    name: 'Agent Smith',
    role: 'admin',
    authorizedProducts: [1, 2, 3], // 代理人被授权的商品ID列表
  };

  // 模拟商品数据
  const initialProductData = {
    name: '',
    createdBy: agentInfo.id, // 默认为当前代理人
    price: 0,
    stock: 0,
    image: null,
  };

  const handleSaveAsDraft = () => {
    form.validateFields().then((values) => {
      // 将数据保存到本地缓存或服务器
      // 这里使用本地缓存示例
      localStorage.setItem('draftProduct', JSON.stringify(values));
      setDraftSaved(true);
      message.success('已保存为草稿');
    });
  };

  useEffect(() => {
    // 检查是否存在草稿，并恢复草稿数据
    const draft = localStorage.getItem('draftProduct');
    if (draft) {
      form.setFieldsValue(JSON.parse(draft));
      setDraftSaved(true);
    }
  }, [form]);

  const onFinish = (values:any) => {
    // 提交表单数据到服务器
    console.log('Submitted product data:', values);
  };

  return (
    <Form
      form={form}
      initialValues={initialProductData}
      onFinish={onFinish}
      style={{ maxWidth: '1000px', margin: '0 auto' }}
    >
      基本信息
      <Form.Item
        label="商品名称"
        name="goods_name"
        rules={[{ required: true, message: '请输入商品名称' }]}
      >
        <Input placeholder='请输入商品名称'/>
      </Form.Item>

      <Form.Item
        label="商品头像"
        name="goods_photo"
      >
        <Input placeholder='请输入画眉的图片地址'/>
      </Form.Item>

      <Form.Item
      label="商品文字描述"
      name="goods_desc"
      rules={[{ required: true, message: '请输入详细描述，最大不超过100字' }]}
      >
      <Input.TextArea placeholder='请输入详细描述，最大不超过100字'/>
     </Form.Item>

     <Form.Item
        label="商品类型"
        name="goods_type"
        rules={[{ required: true, message: '请选择' }]}
      >
        <Select placeholder="请选择">
          <Option value="photo">手机</Option>
          <Option value="cloth">衣服</Option>
          <Option value="bag">包包</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="商品详情"
        name="goods_details"
        rules={[{ required: true, message: '商品详情' }]}
      >
        <Input.TextArea placeholder='请输入详细描述，最大不超过100字'/>
      </Form.Item>

      <Form.Item
        label="商品分类"
        name="goods_distinct"
        rules={[{ required: true, message: '请选择' }]}
      >
        <Select placeholder="请选择">
          <Option value="photo">手机</Option>
          <Option value="cloth">衣服</Option>
          <Option value="bag">包包</Option>
        </Select>
      </Form.Item>

      服务条款
      <Form.Item
        label="供应商名称"
        name="supplier_name"
        rules={[{ required: true, message: '请输入供应商名称' }]}
      >
        <Input placeholder='请输入供应商名称'/>
      </Form.Item>

      <Form.Item
        label="供应商联系方式"
        name="supplier_number"
        rules={[{ required: true, message: '供应商联系方式' }]}
      >
        <Input placeholder='请输入供应商联系方式'/>
      </Form.Item>

      <Form.Item
      label="服务保障"
      name="service_assure"
      rules={[{ required: true, message: '请输入服务保障' }]}
      >
      <Input.TextArea placeholder='请输入服务保障'/>
     </Form.Item>



     兑换价格
      <Form.Item
        label="价格类型"
        name="price_type"
        rules={[{ required: true, message: '请输入价格类型' }]}
      >
        <Select placeholder="请选择">
          <Option value="code">纯积分</Option>
          <Option value="codeAndRmb">积分加钱</Option>
          <Option value="rmb">现金</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="积分价格"
        name="code_price"
        rules={[{ required: true, message: '积分价格' }]}
      >
        <Input placeholder='请输入积分价格'/>
      </Form.Item>

      <Form.Item
        label="现金价格"
        name="code_price"
        rules={[{ required: true, message: '现金价格' }]}
      >
        <Input placeholder='请输入现金价格'/>
      </Form.Item>

      快递
      (不发货地区)
      <Cascader
      options={citySelect.citySelect}
      placeholder="Please select cities"
      showSearch
      multiple
    />

    
    <Form.Item
        label="兑换上限"
        name="transter_top"
      >
        <Input placeholder='请输入'/>
      </Form.Item>

    上线下线时间
    <RangePicker showTime />

    投放城市
    <Cascader
      options={citySelect.citySelect}
      placeholder="Please select cities"
      showSearch
      multiple
    />
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button style={{ marginLeft: '10px' }} onClick={handleSaveAsDraft}>
          保存为草稿
        </Button>
        {draftSaved && <span style={{ marginLeft: '10px', color: 'green' }}>草稿已保存</span>}
      </Form.Item>
    </Form>
  );
};

export default NewProductPage;