import request from '@/util/request'

export function getData(params) {
  return request({
    url: '/api/' + params,
    method: 'get',
  })
}
