import Vue from 'vue'

export default {
	SET_HOME_DATA: (state, data) => {
		Vue.set(state, "homeData", data)
	},
	SET_SEARCH_DATA: (state, data) => {
		Vue.set(state, "searchData", data)
	},
	SET_SPACE_DATA: (state, data) => {
		Vue.set(state, "spaceData", data)
	}
}
