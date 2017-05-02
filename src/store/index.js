import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import A from './modules/A'
import menu from './modules/Route'

Vue.use(Vuex);
const store = new Vuex.Store({
    strict: true,// process.env.NODE_ENV !== 'production',
    actions,
    getters,
    modules:{
        'a':A,
        menu,
    },
    state: {
        pkg,
        app:{

        }
    },
    mutations: {

    }
});

export default store
