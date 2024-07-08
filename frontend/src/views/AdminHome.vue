<template>
<div>
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                매출 (일주일)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ getNumberFormat(weekPrice) }}원</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Earnings (Annual) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                매출 (일일)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{getNumberFormat(dayprice)}}원</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Tasks Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    결제완료
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ orderCnt }}건</div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Pending Requests Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                답변 대기</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ replyCnt }}건</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-xl-8 col-lg-7">
            <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">일주일 매출 현황</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                    <div class="chart-area">
                        <canvas ref="myBarChart" height="100%"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4 col-lg-5">
            <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">카테고리 별 판매량</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                    <div class="chart-area" style="height:100%; width:100%">
                        <canvas ref="myPieChart" height="100%"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Paging from "@/mixin";
import axios from 'axios';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export default {
    mixins : [Paging],
    data() {
        return {
            BarChart: null,
            PieChart: null,
            barData: [],

            weekPrice: 1,
            dayprice: 1,
            orderCnt: 1,
            replyCnt: 1,
        }
    },
    mounted() {
        this.createBarChart();
        this.createPieChart();
        
    },
    created() {
        this.adminMainInfo();
    },
    methods: {
        createBarChart(){
            axios.get("/api/adminMain")
            .then(result => {
                let OrderDate = result.data.map(ele => {
                    return this.getDateFormat(ele.date)
                })
                let OrderPrice = result.data.map(ele => {
                    return ele.price
                })
                const ctx = this.$refs.myBarChart;
                this.BarChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: OrderDate,
                        datasets: [{
                            label: '매출',
                            data: OrderPrice,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                // 'rgba(255, 159, 64, 0.2)',
                                // 'rgba(255, 205, 86, 0.2)',
                                // 'rgba(75, 192, 192, 0.2)',
                                // 'rgba(54, 162, 235, 0.2)',
                                // 'rgba(153, 102, 255, 0.2)',
                                // 'rgba(201, 203, 207, 0.2)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            })
            .catch(err => console.log(err))
        },
        

        createPieChart(){
            axios.get('/api/adminMain/category')
            .then(result => {
                let categoryName = result.data.map(ele => {
                    return ele.category_name
                })
                let categoryCnt = result.data.map(ele => {
                    return ele.cnt
                })
                const ctx = this.$refs.myPieChart;
                this.PieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: categoryName,
                        datasets: [{
                            label: 'My First Dataset',
                            data: categoryCnt,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
                        }]
                    },
                    options : {
                        
                    }
                })
            })
            .catch(err => console.log(err))
        },
        
        beforeDestroy() {
            if (this.myChart) {
                this.myChart.destroy();
            }
        },
        adminMainInfo(){
            axios.get('/api/adminMain/mainInfo')
            .then(result => {
                console.log(result.data.daySales[0].price)
                console.log(result.data.orderComplete[0].orderCnt)
                console.log(result.data.qnaReply.length)
                this.weekPrice = result.data.weekSales[0].price
                this.dayprice = result.data.daySales[0].price
                this.orderCnt = result.data.orderComplete[0].orderCnt
                this.replyCnt = result.data.qnaReply.length
            })
            .catch(err => console.log(err))
        },

        getDateFormat (date ){
 	        return this .$dateFormat (date );
 	    },
        getNumberFormat (number ){
            return this .$numberFormat (number );
        }
    }
}
</script>

<style scoped src="../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../assets/admin/css/sb-admin-2.min.css"></style>