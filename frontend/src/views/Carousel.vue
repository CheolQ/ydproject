<template>
    <div class="owl-carousel">
        <div class="item">Content 1</div>
        <div class="item">Content 2</div>
        <!-- 추가적인 Carousel 아이템 -->
    </div>
</template>

<script>
export default {
    mounted() {
        // Vue 컴포넌트가 마운트된 후 Owl Carousel 초기화
        $(document).ready(() => {
            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 5
                    }
                }
            });
        });
    },
};
</script>

<style scoped>
/* 필요한 스타일 지정 */
</style>