<template>
  <div class="home">
    <DefaultLayout>
    </DefaultLayout>
  </div>
</template>

<script>
// @ is an alias to /src
//
import DefaultLayout from '@/layouts/DefaultLayout.vue';
export default {
  name: 'HomeView',
  components: {
    DefaultLayout
  },
  mounted() {
    // Vue 컴포넌트가 마운트된 후 jQuery를 사용할 수 있습니다.
    $(document).ready(() => {
      // jQuery 코드 작성
      // 예시: 클릭 이벤트 처리
      $('#myButton').click(() => {
        console.log('Button clicked');
      });
    });
  }
}
</script>
