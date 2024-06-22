interface ProductMarket {
    purchaseType: number;
    integralAmount: number;
    cashPrice?: number; // 这个字段是可选的，因为第一个对象中没有这个字段
}

interface ProxyUserInfo {
    userId: number;
    username: string;
}

export interface Product {
    name: string;
    picture: string;
    description: string;
    typeId: string;
    categoryId: string;
    supplierName: string;
    supplierPhone: string;
    serviceGuarantee: string;
    productMarketList: ProductMarket[];
    stock: number;
    exchangeRestriction: number;
    cityBlackList: string[]; 
    cityWhiteList: string[]; 
    timeOn: string; 
    timeOff: string; 
    proxyUserInfoDtos: ProxyUserInfo[];
    // 任何类型
    [key: string]: any;
}
