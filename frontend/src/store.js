import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {},
            cart: [],
        };
    },
    //   getters: {
    //     cartCount: (state) => {
    //       return state.cart.length;
    //     },
    //   },
    // mutations: { //로그인부분 주석풀어야됨
    //     user(state, data) {
    //         state.user = data;
    //     },
    // },
    // plugins: [persistedstate({ paths: ['user'] })],

});

export default store;
