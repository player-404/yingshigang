import axios from 'axios';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface config {
    url: string,
    method: Method,
    params?: any
}
function request(config: config) {
    const instance = axios.create({
        baseURL: 'https://api.tmdb.org/3',
        timeout: 2500
    })
    instance.interceptors.request.use(config => {
        if (!config.params) {
            config.params = {}
        }
        config.params.api_key = 'b2185bc53f4175f0a02fd7990ce5b388';
        if (!config.params.language) {
            config.params.language = "zh";
        }
        return config;
    })
    return instance(config);
}
export default request
