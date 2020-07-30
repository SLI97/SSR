import axios from 'axios'

// 创建axios实例
const service = axios.create({
    baseURL: 'localhost:3000',
    timeout: 30000, // 请求超时时间
    // withCredentials: true // 跨域请求，允许保存cookie
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (!config.headers['Content-type']) { // 指定content-type 则跳过
            config.headers['Content-type'] = 'application/json; charset=utf-8'
        }
        return config
    },
    error => {
        // Do something with request error
        // console.log(error) // for debug
        Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * success为false 表示错误，code 错误码确定错误信息
         */
        const res = response.data
        if (!res.code === 200) {
            console.log(res.msg, 'error')
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        const res = error.response
        console.log(res.status)
        return Promise.reject(error)
    }
)

export default service
