import { FilterType} from '../types/manage'
import http from '../util/request'
// api接口 - 此处用了统一保存接口url路径
const api = {
  pageSearch:'product/pageSearch',
  batchesOffline:'product/batchesOffline',
  getProductDetail:'/product'
};

//查询
export function searchAPI(data: FilterType) {
  return http.post(
    `${api.pageSearch}?pageNo=${data.pageNo}&pageSize=${data.pageSize}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

//批量下线
export function batchesOfflineAPI(ids: string[]) {
    return http.post(`${api.batchesOffline}?${ids.map(item => `ids=${item}`).join(" & ")}`, ids);
}

// 根据id查询商品信息
export function getProductDetailAPI(id:string) {
  return http.get(`${api.getProductDetail}/${id}`);
}