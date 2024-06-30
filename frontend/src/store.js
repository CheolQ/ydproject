import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {},
            cart: [],
        };
    },
    //     cartCount: (state) => {
    //       return state.cart.length;
    //     },
    //   },
    mutations: {
        //로그인부분 주석풀어야됨
        user(state, data) {
            state.user = data;
        },
        setCart(state, items) {
            state.cart = items;
        },
    },
    getters: {
        loggedInUserId(state) {
            return state.user.user_id || ''; // 로그인된 사용자 ID 반환 (없으면 빈 문자열 반환)
        },
        getCartInfo(state) {
            return state.cart || ''; // 로그인된 사용자 ID 반환 (없으면 빈 문자열 반환)
        },
    },
    plugins: [persistedstate({ paths: ['user'] })],
});

export default store;
