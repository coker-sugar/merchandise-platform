import http from '../util/request'
// import {serverType,exmpleType} from '../types/server'

const api = {
    exmple: '/m1/3169753-0-default/index',
    approved:'/product/audit/approved/',
    rejected:'/product/audit/refuse/',
    batches:'/product/batchesOffline',
    review:'/product/submitForReview/'
};

export function getExmple() {
    return http.get<{ token: string }>(api.exmple);
}

export function getApproved(id:string) {
    return http.get<{ token: string }>(api.approved+id);
}

export function getRejected(id:string) {
    return http.get<{ token: string }>(api.rejected+id);
}

export function getBatches(ids:string[]) {
    return http.post<{ token: string }>(api.batches,ids);
}

export function getReview(id:string) {
    return http.get(api.review+'1');
}

