// 商品管理页-查询表单数据
export interface FilterType {
    productId?: string,
    productName?: string,
    startTime?: string,
    endTime?: string,
    productStatus?: number,
    manager?: string,
    pageNo:number,
    pageSize:number
}

export interface RowType {
    id: string;
    name: string;
    stock: number;
    startTime: string;
    endTime: string;
    status: number;
    manager: string;
}
