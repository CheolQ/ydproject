<template>
	<div class="col-lg-12">
		<nav>
            <div class="nav nav-tabs mb-3">
                <button class="nav-link active border-white border-bottom-0" type="button" role="tab"
                    id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                    aria-controls="nav-about" aria-selected="true">Description</button>
                <button class="nav-link border-white border-bottom-0" type="button" role="tab"
                    id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                    aria-controls="nav-mission" aria-selected="false">Reviews</button>
				<button class="nav-link border-white border-bottom-0" type="button" role="tab"
                    id="nav-qna-tab" data-bs-toggle="tab" data-bs-target="#nav-qna"
                    aria-controls="nav-qna" aria-selected="false">QnA</button>
            </div>
        </nav>
        <div class="tab-content mb-5">
			<div class="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
			<prodDetail/>
			</div>
            <div class="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
			<reviewDetail />
            </div>
			<div class="tab-pane" id="nav-qna" role="tabpanel" aria-labelledby="nav-qna-tab">
			<qnaDetail />
            </div>
		</div>
	</div>
</template>

<script>
import prodDetail from "@/components/ProdDetail.vue"
import qnaDetail from "@/components/QnaDetail.vue"
import reviewDetail from './ReviewDetail.vue';


export default { 
    components: { prodDetail, qnaDetail, reviewDetail },
    data() { 
        return { 
        }
    },
    created() {
    },

    methods: {
	}
}	

</script>

<style>
</style>