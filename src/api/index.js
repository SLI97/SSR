import request from '@/util/request'

export function getHomeData() {
  return request({
    url: '/api/home',
    method: 'get',
  })
}

export function getSearchData(params) {
	return request({
		url: '/api/search/' + params,
		method: 'get',
	})
}

export function getSpaceData() {
	return request({
		url: '/api/space',
		method: 'post',
	})
}
