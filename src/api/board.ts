import http from '../util/request'

const api = {
    exchange: '/product/exchangeData',
    saleTop20:'/product/saleTop20Data',
    exchangeWay:'/product/exchangeWay',
   
};

export function exchangeAPI(startTime:string, endTime:string) {
    return http.post(
      `${api.exchange}?beginTime=${startTime}&endTime=${endTime}`,
      {
        timeOn: startTime,
        timeOff: endTime,
      }
    );
}
export function saleTop20API(startTime:string, endTime:string) {
    return http.post(
      `${api.saleTop20}?beginTime=${startTime}&endTime=${endTime}`,
      {
        timeOn: startTime,
        timeOff: endTime,
      }
    );
}
export function exchangeWayAPI(startTime:string, endTime:string) {
    return http.post(`${api.exchangeWay}?beginTime=${startTime}&endTime=${endTime}`,{
        timeOn:startTime,
        timeOff:endTime
    });
}