import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Vuex 스토어 설정이 있는 경우

// import 'bootstrap'
// import './assets/home/css/bootstrap.min.css';
// import './assets/home/css/style.css';
// import './assets/home/js/main.js';

// router.beforeEach((to, from, next) => {
//     if (to.meta.template === 'admin') {
//         // Admin 템플릿의 CSS 파일 동적 로드
//         import('./assets/admin/css/styles.css').then(() => {
//             // Admin 템플릿의 JS 파일 동적 로드
//             import('./assets/admin/js/scripts.js').then(() => {
//                 // 데모 스크립트 로드
//                 import('./assets/admin/demo/chart-area-demo.js');
//                 import('./assets/admin/demo/chart-bar-demo.js');
//                 import('./assets/admin/demo/chart-pie-demo.js');
//                 import('./assets/admin/demo/datatables-demo.js');
//                 import('./assets/admin/js/datatables-simple-demo.js');
//             });
//         });
//     }
//     next();
// });

createApp(App).use(router).mount('#app');
