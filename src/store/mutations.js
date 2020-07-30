import Vue from 'vue'

export default {
  SET_DATA: (state, id) => {
    // state.id = id
    Vue.set(state, "id", id)
  },
}
