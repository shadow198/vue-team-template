import axios from 'axios';
import {isObject} from 'utils/index';
let param = function (obj) {
    var query = '', name, value;
    for(name in obj) {
        value = obj[name];
        if(value instanceof Array) {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(value)) + '&';
        }
        else if(value instanceof Object) {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(value)) + '&';
        }
        else if(value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
};
axios.defaults.baseURL = api_url;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
export default (data, url, info)=> {
    if (info) {data.info = info}
    return axios.request({
        url: url,
        method: 'post',
        transformRequest: [function (data) {
            return isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }],
        transformResponse: [function (data) {
            return data;
        }],
        data:data,
        responseType: 'json',
        progress: function (progressEvent) {}
    })
}