<template >
    <div>
        <Header class="mb-2"/>
        <div class="row flex-nowrap gap-3">
            <div class="card col-2 ms-md-4 p-3">
                <div class="card-title fs-5 fw-bold text-success">
                    <img src="../../../public/images/library.png" class="icon"/>
                    Chinh's library
                </div>
                <div class="text-warning"><i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i></div>
                <div class="card-text">
                    <p class="mt-2"><i class="bi bi-image"></i> Images:</p>
                    <p><i class="bi bi-person-bounding-box"></i> Follower:</p>
                </div>
            </div>

            <div class="col-9 img_container">
                <!-- <div class="card-title fs-5 text-danger fw-bold">
                    <img src="../../../public/images/photo01.png" class="icon"/>
                     List image
                </div> -->
                
                <div class="list_image">
                    <div class="list_image_item p-3 d-flex justify-content-center align-items-center flex-column">
                        <p class="fs-5 fw-bold"><i class="bi bi-stars text-danger"></i> Do you have any new images?</p>
                        <button class="btn btn-danger text-white d-block mx-auto mt-3">
                            <i class="bi bi-cloud-upload-fill"></i>
                            Upload photo
                        </button>
                    </div>
                    <div class="list_image_item">
                        <img src="../../../public/images/family01.jpg" class="image w-100"/>
                        <div class="p-4">
                            <p class="fw-bold">Name image</p>
                            <p class="mt-1">Decription</p>
                            <hr/>
                            <div class="d-flex justify-content-between flex-wrap action_image">
                                <p class="d-flex align-items-center gap-2" @click="isLove = !isLove">
                                    <i class="bi bi-heart" v-if="!isLove"></i>
                                    <i class="bi bi-heart-fill text-danger" v-else></i>
                                    Love
                                </p>
                                <p class="d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-chat-left-text"></i>Comment</p>
                            </div>
                        </div>
                    </div>

                    <div class="list_image_item">
                        <img src="../../../public/images/family02.jpg" class="image w-100"/>
                        <div class="p-4">
                            <p class="fw-bold">Name image</p>
                            <p class="mt-1">Decription</p>
                        </div>
                    </div>

                    <div class="list_image_item">
                        <img src="../../../public/images/family03.jpg" class="image w-100"/>
                        <div class="p-4">
                            <p class="fw-bold">Name image</p>
                            <p class="mt-1">Decription</p>
                        </div>
                    </div>

                    <div class="list_image_item">
                        <img src="../../../public/images/family03.jpg" class="image w-100"/>
                        <div class="p-4">
                            <p class="fw-bold">Name image</p>
                            <p class="mt-1">Decription</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Comment/>
    </div>
</template>
<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
import Header from '../../components/Header/index.vue'
import Comment from '../../components/Comment/index.vue';
const isLove = ref(false);

</script>
<style lang="css">
.img_container {
   height: calc(100vh - 100px);
   overflow: hidden;
   overflow-y:scroll
}

.list_image {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    /* justify-content: center; */
    /* width: 100%; */
}
.list_image_item {
    width: calc(33% - 30px);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.list_image_item img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    object-fit: cover;
}

p {
    margin: 0;
}

.btn_item {
    padding: 2px 8px;
    border: none;
    border-radius: 5px;
    display: block;
    margin-left: auto;
}

.action_image p {
    cursor: pointer;
}
</style>