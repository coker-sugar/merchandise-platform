// 商品详情页-基础信息
export interface BasicInformationProps {
    name: string;
    typeId: string;
    serviceGuarantee: string;
    description: string;
    categoryId: string;
    exchangeRestriction: string;
    createTime: string;
    updateTime: string;
    time_off: string;
    time_on: string;
    cityWhiteList: string;
    cityBlackList: string;
    picture: Array<string>;
    Gname: string;
    Gphone: string;
}

// 商品详情页-表格信息
export interface DataType {
    key: React.Key;
    ID: string;
    status:string;
    time:string;
    operator: string;
}


// 商品详情页-商品预览
export interface ProductProps {
    name: string;
    picture: string;
    price: string;
    description: string;
    basic: string;
}