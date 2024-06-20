import { FilterType} from '../types/manage'
import http from '../util/request'
// api接口 - 此处用了统一保存接口url路径
const api = {
  pageSearch:'/product/pageSearch',
  batchesOffline:'/product/batchesOffline'
};

export function searchAPI(data: FilterType) {
  return http.post<{ token: string }>(api.pageSearch, data);
}

//批量下线
export function batchesOfflineAPI(ids: string[]) {
    return http.post<{ token: string }>(api.batchesOffline, ids);
}