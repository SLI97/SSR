import request from '@/util/request'

export function getData(params) {
  return request({
    url: '/api',
    method: 'get',
    params: params
  })
}
