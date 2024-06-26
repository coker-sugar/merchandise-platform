// 商品管理页-查询表单数据
export interface FilterType {
    id?: string,
    name?: string,
    startTime?: string,
    endTime?: string,
    state?: number,
    caretaker?: string,
    pageNo:number,
    pageSize:number 
}

// 商品列表行
export interface RowType {
  id: number;
  managerName: string;
  name: string;
  state: number;
  stock: number;
  timeOff: string;
  timeOn: string;
}
