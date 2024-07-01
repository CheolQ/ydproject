<template>
    <div class="card mb-4">
        <div class="card-body shadow">
            <h3>검색</h3>
            <div class="row">
                <div class="col-2">{{ title1 }}</div>
                <div class="col-10"><input type="text" class="form-control" v-model="name" value="" @change="test"></div>
            </div>
            <div class="row">
                <div class="col-2">{{ title2 }}</div>
                <div class="col-10">
                    <input type="date" v-model="date1" @change="test"> ~ <input type="date" v-model="date2" @change="test">
                </div>
            </div>
            <div class="row">
                <div class="col-2">{{ title3 }}</div>
                <div class="col-10">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" v-model="category" :id="0" value="" @change="test">
                        <label class="form-check-label" :for="0">전체</label>
                    </div>
                    <div class="form-check form-check-inline" v-for="c in Categorys" :key="c">
                        <input class="form-check-input" type="radio" v-model="category" :id="c.seqs" :value="c.category_code" @change="test">
                        <label class="form-check-label" :for="c.seqs">{{c.category_name}}</label>
                    </div>
                </div>
            </div>    
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title1: String,
        title2: String,
        title3: String,
        Categorys: Object, 
    },
    data() {
        return{
            name: '',
            date1: '',
            date2: '',
            category: '',
        }
    },
    methods : {
        test(){
            this.$emit('obj', this.name, this.date1, this.date2, this.category);
        },
        test2(){
            this.name = "";
            this.date1 = '';
            this.date2 = '';
            this.category = "";
            this.$emit('obj', this.name, this.date1, this.date2, this.category);
        }
    },
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>