<script setup>
import { ref, defineProps, watch, watchEffect } from 'vue'
import Header from '../../components/Header/index.vue'
import ChangeInfo from '../../views/home/ChangeInfo.vue'
import Loading from '../../components/Loading/index.vue'
import axios from '../../plugins/axios';
import moment from 'moment';
import { toast } from 'vue3-toastify'
import { RouterLink } from 'vue-router';
import LoadingBtn from '../../components/LoadingBtn/index.vue';
const isChangeInfo = ref(false);
const loading = ref(false);
const userData = JSON.parse(localStorage.getItem('userData'));
const baseUrl = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem('token');
const currentUser = ref(userData);
const user = ref();
const users = ref([]);
const root_users = ref([]);
const photos = ref([]);
const searchWord = ref('');

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
// watchEffect(getUser);
getUser();

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
        root_users.value = users.value;
    })
    .catch((e) => {
        // toast.error(e.response?.data?.message);
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
        // toast.error(e.response?.data?.message);
    }).then(() => {
        loading.value = false;
    });
};
watchEffect(fetchPhotos);

const changeCurrentUser = (u) => {
    currentUser.value = u;
    photos.value = [];
    user.value = users.value.find((item) => item._id === u._id);
}

const handleChangeInfo = () => {
    isChangeInfo.value = true;
}

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const searchUser = () => {
    if(!searchWord.value) {
        users.value = root_users.value;
    } else {
        users.value = root_users.value.filter((user) => {
            return removeDiacritics(user.fullname.toLowerCase()).includes(removeDiacritics(searchWord.value.toLowerCase()));
        });
    }
}
watchEffect(searchUser)

const handleFollowClick = async (user) => {   
    // loading.value = true;
    users.value = users.value.map((item) => {
        if(item._id === user._id) {
            item.follow = item.follow.includes(userData._id) ? item.follow.filter((id) => id !== userData._id): [...item.follow, userData._id];
        }
        return item;
    });
    await axios.patch(
        `/users/follow/${user._id}`,
        {},  // Empty body if not needed
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    .then((res) => {
        // getUsers();
    })
    .catch((e) => {
        // toast.error(e.response?.data?.message);
    }).finally(() => {
        // loading.value = false;
    });
};


</script>
<template>
    <div style="overflow: hidden; overflow-x: hidden; overflow-y: auto;">
        <Header class="mb-2"/>
        <div class="">
            <div class="row gap-3 flex-wrap">
                <div class="col-md-3">
                    <input type="text" class="form-control mb-2" placeholder="Search user" aria-label="Search user" aria-describedby="button-addon2" v-model="searchWord"/>
                    <div class="list-group lsg_user">
                        <div class="list-group-item list-group-item-action" :class="u?._id === user?._id ? 'active': ''" aria-current="true" @click="changeCurrentUser(u)" style="cursor: pointer;"  v-for="u in users" :key="u.id">
                            <h5 class="mb-1">{{ u.fullname }}</h5>
                            <p class="mb-1" style="font-size: 15px;">@{{ u.username }}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <button class="btn btn-success btn-sm">{{ u?.follow?.length }} follower</button>
                                <i class="bi bi-bookmark-check-fill text-warning" v-if="u._id === userData._id"></i>
                                <span class="badge rounded-pill text-bg-danger" v-else @click.stop="handleFollowClick(u)">
                                    {{ u?.follow?.includes(userData._id) ? 'Following': 'Follow' }}
                                </span>
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
                        <p class="card-text"><i class="bi bi-person-fill-lock text-primary"></i> Full name: {{ user?.fullname }}</p>
                        <p class="card-text"><i class="bi bi-calendar2-week-fill text-info"></i> Birthday: {{ user?.dob ? moment(user.dob).format("DD/MM/YYYY"): "Not available" }}</p>
                        <p class="card-text"><i class="bi bi-telephone-fill text-black"></i> Phone: {{ user?.phone ? user.phone: "Not available" }}</p>
                        <p class="card-text"><i class="bi bi-geo-alt-fill text-success"></i> Address: {{ user?.address ? user.address: "Not avaiable" }}</p>
                        <p class="card-text"><i class="bi bi-person-check-fill text-black"></i> Follow: {{ user?.follow?.length }}</p>
                        <button class="btn btn-primary mt-4" @click="handleChangeInfo" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="user?._id == userData._id"><i class="bi bi-pen-fill"></i> Change my info</button>
                    </div>     

                </div>

                <div class="card col-md-4 library p-0">
                    <div class="card-body">
                        <div class="d-flex aligns-item-center gap-3">
                            <h5 class="card-title d-flex aligns-item-center">Library</h5>
                            <LoadingBtn v-if="loading"  style="width: 30px;"/>
                        </div>
                        <div class="d-flex align-items-center flex-direction-row mt-3 flex-wrap lsg_photo" v-if="photos.length > 0" style="width: 100%; gap: 20px;">
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
                            <button class="btn btn-primary text-white mt-5"><i class="bi bi-images"></i> View all library</button>
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

<style lang="css" scoped>
.img_item {
    width: calc(50% - 20px);
}

.lsg_user, .lsg_photo {
    width: 100%;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    overflow-x: hidden;
}

.lsg_user .list-group-item {
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: break-word;
}

.lsg_user {
    /* max-width: 300px; */
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

@media screen and (max-width: 250px) {
    .lsg_user {
        max-height: 250px;
        overflow-y: auto;
    }

    .lsg_photo {
        max-height: 350px;
        overflow-y: auto;
    }
}

@media screen and (min-width: 250px) and (max-width: 420px) {
    .lsg_user {
        max-height: 250px;
        overflow-y: auto;
    }

    .lsg_photo {
        max-height: 350px;
        overflow-y: auto;
    }
}

@media screen and (min-width: 420px) and (max-width: 576px) {
    .lsg_user {
        max-height: 250px;
        overflow-y: auto;
    }

    .lsg_photo {
        max-height: 350px;
        overflow-y: auto;
    }
}

@media screen and (min-width: 792px) and (max-width: 992px) {
    
}


@media screen and (min-width: 992px) and (max-width: 1200px) {
   

}

@media screen and (min-width: 1200px) and (max-width: 1400px) {
    
}

@media screen and (min-width: 1500px) {
    
}
</style>