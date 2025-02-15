<template>
    <div class="photo_container d-flex flex-column justify-content-center align-items-center gap-3">
        <RouterLink to="/home" class="btn btn-success btn_home">
            <i class="bi bi-house-fill"></i> Home
        </RouterLink>

        <RouterLink :to="`/library?user_id=${userData?._id}`" class="btn_exit text-white">
            <i class="bi bi-x-circle-fill" style="font-size: 30px;"></i>
        </RouterLink>
        <div class="img_container">
            <img :src="`${baseUrl}/images/${photo?.img}`" alt="photo" class="img-fluid"/>
        </div>
        <div class="info_container text-center">
            <p class="fw-bold fs-3">{{ photo?.name }}</p>
            <p>{{ photo?.description }}</p>
            <p class="text-warning"><span class="text-success fw-bold">Up at</span> {{ timeUp}} </p>
            <h4 class="d-flex align-items-center gap-2"><Avatar :word="word"/> {{ photo?.fullname }}</h4>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watchEffect, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import axios from '../../plugins/axios';
import moment from 'moment';
import Avatar from '../../components/Avatar/index.vue';
import { toast } from 'vue3-toastify';
const route = useRoute();
const token = localStorage.getItem('token');
const userData = JSON.parse(localStorage.getItem('userData'));
const baseUrl = import.meta.env.VITE_BASE_URL;
const photo_id = route.query.id;
const word = ref('');
const photo = ref();
const timeUp = ref();
const fetchPhoto = async () => {
    await axios.get(`/photos/${photo_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        photo.value = res.data.data;
        word.value = photo.value.fullname.split(" ")[photo.value.fullname.split(" ").length - 1][0];
        timeUp.value = new Date(photo.value.created_at).toLocaleDateString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour12: false, 
        });
    })
    .catch((e) => {
        toast.error(e.response?.data?.message);
    });
};
watchEffect(fetchPhoto);

</script>
<style lang="css" scoped>
.photo_container {
    position: relative;
    padding: 20px;
    height: 100vh;
    background-color: #333;
    color: #fff;
    overflow: hidden;
    overflow-y: auto;
}

.img_container {
    /* width: 90%; */
    /* height: 100%; */
    text-align: center;
}

.photo_container img {
    margin-top: 20px;
    max-height: 75vh;
    width: 90%;
    border-radius: 5px;
    object-fit: cover;
}

.info_container {
    /* width: 30%; */
    /* text-align: center; */
    margin: 0 auto;
    /* width: 100%; */
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); */
}

.btn_home {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
}

.btn_exit {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
}
</style>