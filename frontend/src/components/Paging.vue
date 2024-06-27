<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#" @click="goPrevious">&#60;</a></li>
            <li class="page-item" v-for="page in pageArr" v-bind:key="page">
                <a class="page-link" href="#" @click="goPage(page)">{{ page }}</a>
            </li>
            <li class="page-item"><a class="page-link" href="#" @click="goNext">&#62;</a></li>
        </ul>
    </nav>
</template>
<script>
export default {
    props : ["currentPage",
             "firstPage",
             "lastPage",
             "startIdx",
             "endIdx"    
            ],
    data(){ return {}; },
    computed:{
        pageArr(){
            const pages = []
            for(let i=this.startIdx; i<=this.endIdx; i++){
                pages.push(i)
            }
            return pages;
        }
    },
    created(){},
    methods: {
        goPage(page){
            console.log(page);
            this.$emit('go-page', page);
        },
        goPrevious() {
            if (this.currentPage > this.firstPage) {
            this.$emit('go-page', this.currentPage - 1);
            }
        },
        goNext() {
            if (this.currentPage < this.lastPage) {
            this.$emit('go-page', this.currentPage + 1);
            }
        }
    }
}
</script>
<style>
.pagination{
    justify-content: center;
}
.pagination > li > a {
    float: none;
}
.pagination > li.disabled > a {
    pointer-events: none;
    cursor: default;
}
</style>
<style scoped src="../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../assets/admin/css/sb-admin-2.min.css"></style>