<template>
    <div>
        <Header/>
        <div class="row flex-nowrap gap-3 mt-2">
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
                
            </div> 
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, watch } from 'vue'
import Header from '../../components/Header/index.vue'


</script>
<style lang="css">

</style>