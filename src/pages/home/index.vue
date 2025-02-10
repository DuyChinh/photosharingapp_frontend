<script setup>
import { ref, defineProps, watch } from 'vue'
import Header from '../../components/Header/index.vue'
import ChangeInfo from '../../views/home/ChangeInfo.vue'
const baseUrl = import.meta.env.VITE_BASE_URL;
const isChangeInfo = ref(false);
const handleChangeInfo = () => {
    isChangeInfo.value = true;
}

</script>
<template lang="">
    <div>
        <Header class="mb-2"/>
        <div class="">
            <div class="row gap-3 flex-nowrap">
                <div class="col-md-3">
                    <div class="list-group" style="max-height:calc(100vh - 100px); overflow-y:scroll;">
                        <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                            <h5 class="mb-1">List group item heading</h5>
                            <p class="mb-1">Some placeholder content in a paragraph.</p>
                            <small>And some small print.</small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">
                            <h5 class="mb-1">List group item heading</h5>
                            <p class="mb-1">Some placeholder content in a paragraph.</p>
                            <small class="text-body-secondary">And some muted small print.</small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">   
                            <h5 class="mb-1">List group item heading</h5>
                            <p class="mb-1">Some placeholder content in a paragraph.</p>
                            <small class="text-body-secondary">And some muted small print.</small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                            <h5 class="mb-1">List group item heading</h5>
                            <p class="mb-1">Some placeholder content in a paragraph.</p>
                            <small>And some small print.</small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">
                            <h5 class="mb-1">List group item heading</h5>
                            <p class="mb-1">Some placeholder content in a paragraph.</p>
                            <small class="text-body-secondary">And some muted small print.</small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">   
                            <h5 class="mb-1">List group item heading</h5>
                            <p class="mb-1">Some placeholder content in a paragraph.</p>
                            <small class="text-body-secondary">And some muted small print.</small>
                        </a>
                    </div>
                </div>
                        
                <div class="card col-md-4 intro">
                    <div class="card-body">
                        <h5 class="card-title">Introduce</h5>
                        <p class="card-text"><i class="bi bi-envelope-at-fill text-warning"></i> Email: doanchinhit21@gmail.com</p>
                        <p class="card-text"><i class="bi bi-person-fill-lock text-primary"></i> Full name: Doan Duy Chinh</p>
                        <p class="card-text"><i class="bi bi-calendar2-week-fill text-info"></i> Birthday: 21/10/2000</p>
                        <p class="card-text"><i class="bi bi-telephone-fill text-black"></i> Phone: 0987654321</p>
                        <p class="card-text"><i class="bi bi-geo-alt-fill text-success"></i> Address: Hanoi, Vietnam</p>
                        <p class="card-text"><i class="bi bi-person-check-fill text-black"></i> Follow: 30</p>
                        <button class="btn btn-primary mt-4" @click="handleChangeInfo" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pen-fill"></i> Change my info</button>
                    </div>     
                </div>

                <div class="card col-md-4 library">
                    <div class="card-body">
                        <h5 class="card-title">Library</h5>
                        <div class="row">
                            <div class="col-6">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1pb-qVaXaLJyJJAWV6jsx1yHQ-0iZS_PzAg&s" class="img-thumbnail" alt="...">
                            </div>
                            <div class="col-6">
                                <img src="https://th.bing.com/th/id/OIG2.9O4YqGf98tiYzjKDvg7L" class="img-thumbnail" alt="...">
                            </div>
                            <div class="col-6 mt-3">
                                <img src="https://image-processor-storage.s3.us-west-2.amazonaws.com/images/866759932dc5358cee86f6552d1250f2/inside-bubble-spheres.jpg" class="img-thumbnail" alt="...">
                            </div>
                        </div>
                        <router-link to="/library">
                            <button class="btn btn-info text-white mt-5"><i class="bi bi-images"></i> View all library</button>
                        </router-link>
                    </div>     
                </div>
            </div>
        </div>
        <ChangeInfo v-model:isChangeInfo="isChangeInfo"/>
    </div>
</template>

<style lang="css">

.intro {
    color: #fff;
    background: #CB356B;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #BD3F32, #CB356B);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #BD3F32, #CB356B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.library {
    color: #fff;
    background: #0cebeb;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #29ffc6, #20e3b2, #0cebeb);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #29ffc6, #20e3b2, #0cebeb); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>