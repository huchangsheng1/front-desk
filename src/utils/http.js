import axios from 'axios'
import router from '../router'

axios.defaults.timeout = 3000000;
axios.defaults.baseURL = '/api'

axios.interceptors.request.use(
    config => {
        
        if (config.url == "/user/login") {
            return config;
        }
        let token = localStorage.getItem('User-Token');
        if (!token) {
            // router.push('/login') 
        }
        config.headers['User-Token'] = token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        if (response.headers['user-token']) {
            localStorage.setItem('User-Token',response.headers['user-token']);

        }
        if (response.data.code == 502 || response.data.code == 501) {
            localStorage.removeItem('User-Token');
            router.push('/login')
        }
        
        return Promise.resolve(response.data);
    },
    error => {
        return Promise.reject(error);
    }
);

export default {
    get(url, params, headers){
        console.log('get');
        let options = {}
        if (params) options.params = params;
        if (headers) options.headers = headers;
        return axios.get(url, options)
    },

    post(url, data, headers){

        let str2 = '';
        for (let i in data){
            str2 += i + '=' + data[i] + '&';
        }
        str2 = str2.substr(0,str2.length-1); 
        data = str2;
        return axios.post(url, data, headers)
    }
}

