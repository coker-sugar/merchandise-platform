import http from '../util/request'

const api = {
    exchange: '/product/exchangeData',
    saleTop20:'/product/saleTop20Data',
    exchangeWay:'/product/exchangeWayData',
   
};

export function exchangeAPI(startTime:string, endTime:string) {
    return http.post(api.exchange,{
        timeOn:startTime,
        timeOff:endTime
    });
}
export function saleTop20API(startTime:string, endTime:string) {
    return http.post(api.saleTop20,{
        timeOn:startTime,
        timeOff:endTime
    });
}
export function exchangeWayAPI(startTime:string, endTime:string) {
    return http.post(`${api.exchangeWay}?timeOn=${startTime}&timeOff=${endTime}`,{
        timeOn:startTime,
        timeOff:endTime
    });
}