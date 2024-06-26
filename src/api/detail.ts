import http from '../util/request'

const api = {
    exmple: '/m1/3169753-0-default/index',
    approved:'/product/audit/approved/',
    rejected:'/product/audit/refuse/',
    batches:'/product/batchesOffline',
    review:'/product/submitForReview/',

    product:'/product/',
};

export function getExmple() {
    return http.get(api.exmple);
}

export function getApproved(id:string) {
    return http.get(api.approved+id);
}

export function getRejected(id:string) {
    return http.get(api.rejected+id);
}

export function getBatches(ids:string[]) {
    return http.post(api.batches,ids);
}

export function getReview(id:string) {
    return http.get(`${api.review}${id}`);
}

export function getProduct(id:string) {
    return http.get(`${api.product}${id}`);
}
