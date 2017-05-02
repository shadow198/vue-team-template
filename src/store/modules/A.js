const state = {
    demo:0
};
const getters = {
    demoDone:state=>{
        return state.demo+245
    }
};
const mutations = {
    increment (state,payload) {
        state.demo+=payload.n||2;
    }
};
const actions = {
    increment ({commit}) {//context
        setTimeout(() => {
            commit({type:'increment',n:3})
        }, 1000);
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}
