import {getHomeData, getSearchData, getSpaceData} from "@/api/index"

export default {
	GET_HOME_DATA: ({commit, dispatch, state}, id) => {
		return getHomeData(id)
			.then(res => commit('SET_HOME_DATA', res.data))
	},
	GET_SEARCH_DATA: ({commit, dispatch, state}, id) => {
		return getSearchData(id)
			.then(res => commit('SET_SEARCH_DATA', res.data))
	},
	GET_SPACE_DATA: ({commit, dispatch, state}, id) => {
		return getSpaceData(id)
			.then(res => commit('SET_SPACE_DATA', res.data))
	},
}
