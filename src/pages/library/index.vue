<template >
    <div>
        <Header class="mb-2"/>
        <div class="row flex-nowrap gap-3">
            <div class="card col-3 ms-md-4 p-3">
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

            <div class="card col-8 p-3">
                <div class="card-title fs-5 text-danger fw-bold">
                    <img src="../../../public/images/photo01.png" class="icon"/>
                     List image
                </div>
                
                <div class="list_image mt-3">
                    <div class="list_image_item">
                        <img src="../../../public/images/family01.jpg" class="image w-100"/>
                        <div class="p-2 pb-3">
                            <p class="fw-bold">Name image</p>
                            <p class="mt-1">Decription</p>
                            <button class="btn_item bg-info text-white mt-2"><i class="bi bi-eye-fill"></i> view detail</button>
                        </div>
                    </div>

                    <div class="list_image_item">
                        <img src="../../../public/images/family02.jpg" class="image w-100"/>
                        <div class="p-2">
                            <p class="fw-bold">Name image</p>
                            <p class="mt-1">Decription</p>
                            <button class="btn_item bg-info text-white mt-2"><i class="bi bi-eye-fill"></i> view detail</button>
                        </div>
                    </div>

                    <div class="list_image_item">
                        <img src="../../../public/images/family03.jpg" class="image w-100"/>
                        <div class="p-2">
                            <p class="fw-bold">Name image</p>
                            <p class="mt-1">Decription</p>
                            <button class="btn_item bg-info text-white mt-2"><i class="bi bi-eye-fill"></i> view detail</button>
                        </div>
                    </div>

                    <div class="list_image_item">
                        <img src="../../../public/images/family03.jpg" class="image w-100"/>
                        <div class="p-2">
                            <p class="fw-bold">Name image</p>
                            <p class="mt-1">Decription</p>
                            <button class="btn_item bg-info text-white mt-2"><i class="bi bi-eye-fill"></i> view detail</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, watch } from 'vue'
import Header from '../../components/Header/index.vue'
</script>
<style lang="css">
.list_image {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    /* width: 100%; */
}
.list_image_item {
    width: 31%;
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
</style>