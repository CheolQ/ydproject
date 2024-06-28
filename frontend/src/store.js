import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {},
        };
    },
    //     cartCount: (state) => {
    //       return state.cart.length;
    //     },
    //   },
    // mutations: {
    //     user(state, data) {
    //         state.user = data;
    //     },
    // },
    // plugins: [persistedstate({ paths: ['user'] })],

});



export default store;