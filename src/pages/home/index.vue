<script setup>
import { ref, defineProps, watch, watchEffect } from 'vue'
import Header from '../../components/Header/index.vue'
import ChangeInfo from '../../views/home/ChangeInfo.vue'
import Loading from '../../components/Loading/index.vue'
import axios from '../../plugins/axios';
import moment from 'moment';
import { toast } from 'vue3-toastify'
import { RouterLink } from 'vue-router';
const isChangeInfo = ref(false);
const loading = ref(false);
const userData = JSON.parse(localStorage.getItem('userData'));
const baseUrl = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem('token');
const currentUser = ref(userData);
const user = ref();
const users = ref([]);
const photos = ref([]);

const getUser = async() => {
    loading.value = true;
    await axios.get(`/users/${currentUser.value?._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        user.value = res.data.data;
    })
    .catch((e) => {
        toast.error(e.response?.data?.message);
    }).finally(() => {
        loading.value = false;
    });
};
watchEffect(getUser);

const getUsers = async() => {
    loading.value = true;
    await axios.get(`/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })   
    .then((res) => {
        let listUser = res.data.data;
        const userFirst = listUser.find((item) => {
            return item._id === userData._id;
        });
        listUser = listUser.filter((item) => {
            return item._id !== userData._id;
        });
        users.value = [userFirst, ...listUser];
    })
    .catch((e) => {
        toast.error(e.response?.data?.message);
    }).finally(() => {
        loading.value = false;
    });
};
watchEffect(getUsers);

const fetchPhotos = async () => {
    loading.value = true;
    await axios.get(`/photos?userId=${currentUser.value._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        photos.value = res.data.data;
        if(currentUser.value._id !== userData._id) {
            photos.value = photos.value.filter((photo) => photo.share_status === 'public');
        }
    })
    .catch((e) => {
        toast.error(e.response?.data?.message);
    }).then(() => {
        loading.value = false;
    });
    // setLoading(false);
};
watchEffect(fetchPhotos);

const changeCurrentUser = (user) => {
    currentUser.value = user;
}

const handleChangeInfo = () => {
    isChangeInfo.value = true;
}

</script>
<template>
    <div>
        <Header class="mb-2"/>
        <div class="">
            <div class="row gap-3 flex-nowrap">
                <div class="col-md-3">
                    <div class="list-group" style="max-height:calc(100vh - 100px); overflow-y:scroll;" v-for="user in users" :key="user.id">
                        <div class="list-group-item list-group-item-action" :class="currentUser._id === user._id ? 'active': ''" aria-current="true" @click="changeCurrentUser(user)" style="cursor: pointer;">
                            <h5 class="mb-1">{{ user.fullname }}</h5>
                            <p class="mb-1">@{{ user.username }}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <button class="btn btn-success btn-sm">{{ user?.follow?.length }} follower</button>
                                <i class="bi bi-bookmark-check-fill text-warning" v-if="user._id === userData._id"></i>
                            </div>
                        </div>
                    </div>
                </div>
                        
                <div class="card col-md-4 intro">
                    <div class="card-body">
                        <h5 class="card-title mb-4 d-flex justify-content-between aligns-item-center">Introduce </h5>
                        <p class="card-text" v-if="user?.username?.includes('@')">
                            <i class="bi bi-envelope-at-fill text-warning"></i> Email: {{ user?.username }}
                        </p>
                        <p class="card-text" v-else>
                            <i class="bi bi-envelope-at-fill text-warning"></i> Username: {{ user?.username }}
                        </p>
                        <p class="card-text"><i class="bi bi-person-fill-lock text-primary"></i> Full name:{{ user?.fullname }}</p>
                        <p class="card-text"><i class="bi bi-calendar2-week-fill text-info"></i> Birthday: {{ user?.dob ? moment(user.dob).format("DD/MM/YYYY"): "Not available" }}</p>
                        <p class="card-text"><i class="bi bi-telephone-fill text-black"></i> Phone: {{ user?.phone ? user.phone: "Not available" }}</p>
                        <p class="card-text"><i class="bi bi-geo-alt-fill text-success"></i> Address: {{ user?.address ? user.address: "Not avaiable" }}</p>
                        <p class="card-text"><i class="bi bi-person-check-fill text-black"></i> Follow: {{ user?.follow?.length }}</p>
                        <button class="btn btn-primary mt-4" @click="handleChangeInfo" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="user?._id == userData._id"><i class="bi bi-pen-fill"></i> Change my info</button>
                    </div>     
                </div>

                <div class="card col-md-4 library">
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-between aligns-item-center">Library</h5>
                        <div class="d-flex align-items-center flex-direction-row mt-3 flex-wrap" v-if="photos.length > 0" style="width: 100%; gap: 20px;">
                            <div class="img_item" v-for="photo in photos" :key="photo._id">
                                <RouterLink :to="{
                                    path: `/photo`,
                                    query: {
                                        id: photo._id,
                                    },
                                }">
                                    <img :src="`${baseUrl}/images/${photo.img}`" class="" alt="...">
                                </RouterLink>
                                <!-- <img :src="`${baseUrl}/images/${photo.img}`" class="" alt="..."> -->
                            </div>
                            <!-- <div class="col-6">
                                <img src="https://th.bing.com/th/id/OIG2.9O4YqGf98tiYzjKDvg7L" class="img-thumbnail" alt="...">
                            </div>
                            <div class="col-6 mt-3">
                                <img src="https://image-processor-storage.s3.us-west-2.amazonaws.com/images/866759932dc5358cee86f6552d1250f2/inside-bubble-spheres.jpg" class="img-thumbnail" alt="...">
                            </div> -->
                        </div>
                        <div v-else class="no-image text-center text-black">
                            <i class="bi bi-image text-black" style="font-size: 2rem;"></i>
                            <p class="mt-2 text-black">No images available</p>
                        </div>
                        <!-- <Loading style="height: 30px;" v-if="loading"/> -->
                        <router-link :to="{
                            path: '/library',
                            query: {
                                user_id: currentUser._id,
                            },
                        }">
                            <button class="btn btn-info text-white mt-5"><i class="bi bi-images"></i> View all library</button>
                        </router-link>
                    </div>     
                </div>
            </div>
        </div>
        <ChangeInfo 
            v-model:isChangeInfo="isChangeInfo"
            :user="user"
            :getUser="getUser"
        />
    </div>
</template>

<style lang="css">
.img_item {
    width: calc(50% - 20px);
}

.img_item img {
    border-radius: 5px;
    width: 100%;
    /* height: 300px; */
    object-fit: cover;
}

.img_item img:hover {
    opacity: 0.8;
}

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