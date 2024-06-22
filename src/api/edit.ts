import http from '../util/request'
import { Product } from "../types/product"
const api = {
  create:'/product'
};

export function postCreate(id: string,data:any) {
    return http.post(`${api.create}/${id}/createProduct`,data);
}