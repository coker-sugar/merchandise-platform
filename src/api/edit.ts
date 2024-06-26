import http from '../util/request'
const api = {
  create:'/product'
};

export function postCreate(id: string,data:any) {
    return http.post(`${api.create}/${id}/createProduct`,data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
}