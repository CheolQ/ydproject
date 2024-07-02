// import { createStore } from 'vuex';
// import persistedstate from 'vuex-persistedstate';

// const store = createStore({
//     state() {
//         return {
//             user: {
//                 user_id: '',
//                 // 다른 사용자 관련 상태
//             },
//             cart: [],
//         };
//     },
//     // cartCount: (state) => {
//     //   return state.cart.length;
//     // },
//     // },
//     mutations: {
//         setUser(state, user) {
//             state.user = user;
//         },
//         clearUser(state) {
//             state.user = {
//                 user_id: '',
//                 // 초기화할 다른 사용자 관련 상태
//             };
//         },
//         setCart(state, items) {
//             state.cart = items;
//         },
//     },
//     actions: {
//         // 다른 actions
//     },
//     getters: {
//         loggedInUserId(state) {
//             return state.user.user_id || ''; // 로그인된 사용자 ID 반환 (없으면 빈 문자열 반환)
//         },
//         getCartInfo(state) {
//             return state.cart || ''; // 장바구니 정보 반환 (없으면 빈 문자열 반환)
//         },
//         isAuthenticated: state => !!state.user.user_id,
//     },
//     plugins: [persistedstate({ paths: ['user'] })],
// });

// export default store;



import { createStore } from 'vuex';
import persistedstate from 'vuex-persistedstate';
import axios from 'axios';

const store = createStore({
    state() {
        return {
            user: {
                user_id: '',
                // 다른 사용자 관련 상태
            },
            cart: [],
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = {
                user_id: '',
                // 초기화할 다른 사용자 관련 상태
            };
        },
        setCart(state, items) {
            state.cart = items;
        },
    },
    actions: {
        async logout({ commit }) {
            try {
                await axios.post("/api/users/logout");
                commit('clearUser');
            } catch (err) {
                console.error('Logout failed', err);
            }
        }
    },
    getters: {
        loggedInUserId(state) {
            return state.user.user_id || ''; // 로그인된 사용자 ID 반환 (없으면 빈 문자열 반환)
        },
        getCartInfo(state) {
            return state.cart || ''; // 장바구니 정보 반환 (없으면 빈 문자열 반환)
        },
        // getDirectPay(state){
        //     return state.user.user_id || '';
        // },
        isAuthenticated: state => !!state.user.user_id,
    },
    plugins: [persistedstate({ paths: ['user'] })],
});

export default store;


