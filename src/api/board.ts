import http from '../util/request'
import  { Dayjs } from 'dayjs';

const api = {
    exchange: '/product/exchangeData',
    saleTop20:'/product/saleTop20Data',
    exchangeWay:'/product/exchangeWayData',
   
};

export function exchangeAPI(startTime:Dayjs, endTime:Dayjs) {
    return http.post(api.exchange,{
        timeOn:startTime,
        timeOff:endTime
    });
}
export function saleTop20API(startTime:Dayjs, endTime:Dayjs) {
    return http.post(api.saleTop20,{
        timeOn:startTime,
        timeOff:endTime
    });
}
export function exchangeWayAPI(startTime:Dayjs, endTime:Dayjs) {
    return http.post(api.exchangeWay,{
        timeOn:startTime,
        timeOff:endTime
    });
}