import { getData } from "@/api/index"

export default {
    GET_DATA: ({ commit, dispatch, state }, id) => {
        return getData(id)
            .then(res => commit('SET_DATA', res.data))
    },
}
