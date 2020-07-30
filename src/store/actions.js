import { getData } from "@/api/index"
export default {
    GET_DATA: ({ dispatch, getters }) => {
        return getData(id)
            .then(res => commit('SET_DATA', res.data))
    },
}
