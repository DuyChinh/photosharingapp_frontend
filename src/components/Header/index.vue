<script setup> 
import { RouterLink, useRouter } from 'vue-router';
import Avatar from '../../components/Avatar/index.vue'
import moment from 'moment';
import { defineProps, ref, watch, watchEffect, defineEmits, onMounted, onUnmounted } from 'vue'
const mode = ref(true);
const isMenu = ref(false);
import { toast } from 'vue3-toastify'
import axios from '../../plugins/axios';
import LoadingBtn from '../../components/LoadingBtn/index.vue'
import Loading from '../../components/Loading/index.vue'
const token = localStorage.getItem('token');
const route = useRouter();
const userData = JSON.parse(localStorage.getItem('userData'));
const word = userData?.fullname.split(" ")[userData?.fullname.split(" ").length - 1][0];
const loading = ref(false);
const loadinglogout = ref(false);
const isNoti = ref(false);
const user_work_id = ref("");
const user = ref({});
const readAll = ref(true);
const notis = ref([]);
const notiLength = ref(0);
const notiAllLength = ref(0);


if (localStorage.getItem('mode')) {
    mode.value = localStorage.getItem('mode') === 'light' ? true : false;
}

const getUser = async(user_id) => {
    loading.value = true;
    await axios.get(`/users/${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        user.value = res.data.data;
    })
    .catch((e) => {
        // toast.error(e.response?.data?.message);
    }).finally(() => {
        loading.value = false;
    });
};

const getNotis = async () => {
    readAll.value = true;
    loading.value = true;
    await axios.get(`/notifications/${userData?._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(async (res) => {
        let notifications = res.data.data;
        notis.value = await Promise.all(notifications.map(async (noti) => {
            await getUser(noti?.user_work_id);
            noti.avatar = user.value.avatar;
            return noti;
        }));
        notiAllLength.value = notis.value.length;
        // console.log(notis.value);
    })
    .catch((e) => {
        // toast.error(e.response?.data?.message);
    }).finally(() => {
        loading.value = false;
    }); 
};
// watchEffect(getNotis);

const convertTime = (time) => moment(time).fromNow();

const convertWord = (word) => {
    if(word?.length > 0) {
        const arr = word?.split(" ");
        if(arr.length > 0) {
            return arr[arr.length - 1][0];
        }
    }
    return "";
};

const handleChangeMode = () => {
    mode.value = !mode.value;
    if (mode.value) {
        localStorage.setItem('mode', 'light');
        document.body.classList.remove('dark');
    } else {
        localStorage.setItem('mode', 'dark');
        document.body.classList.add('dark');
    }
}

const showMenu = () => {
    isMenu.value = !isMenu.value;
}

const handleClickOutside = (event) => {
    if (!event.target.closest('.user_menu') && !event.target.closest('.btn_avatar') && !event.target.closest('.bell_block') && !event.target.closest('.btn-read-all') && !event.target.closest('.btn-unread')) {
        isMenu.value = false;
        isNoti.value = false;
    }
};

const showNoti = () => {
    isNoti.value = !isNoti.value;
}

const getUnreadNotis = async() => {
    readAll.value = false;
    loading.value = true;
    await axios.get(`/notifications/unread/${userData?._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(async (res) => {
        let notifications = res.data.data;
        notis.value = await Promise.all(notifications.map(async (noti) => {
            await getUser(noti?.user_work_id);
            noti.avatar = user.value.avatar;
            return noti;
        }));
        notiLength.value = notis.value.length;
        // readAll.value = false;
    })
    .catch((e) => {
        // toast.error(e.response?.data?.message);
    }).finally(() => {
        loading.value = false;
    });
}

watchEffect(getUnreadNotis);

const readNoti = async(noti_id) => {
    loading.value = true;
    await axios.post(`/notifications/mark-as-read/${noti_id}`,{}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        getUnreadNotis();
    })
    .catch((e) => {
        // toast.error(e.response?.data?.message); 
    }).finally(() => {
        loading.value = false;
    });
};

onMounted(() => {
    window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
});

const logout = async() => {
    loadinglogout.value = true;
    showMenu();
    const body = {
        msg: "inactive",
    };
    await axios.post(`/auth/logout`, body,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        localStorage.removeItem('token');
        localStorage.setItem('userData', "");
        route.push('/login');
    })
    .catch((e) => {
        toast.error(e.response?.data?.message);
    })
    .finally(() => {
        loadinglogout.value = false;
    });
};


</script>
<template>
    <div style="max-height: 100px;">
        <nav class="navbar navbar-container bg-primary text-white py-3">
            <div class="container-fluid">
                <RouterLink to="/home" class="navbar-brand text-white">
                    <i class="bi bi-camera2 mx-1"></i> 
                    Photosharing app
                </RouterLink>
                <div class="d-flex align-items-center gap-3">
                    <!-- <h5>Home</h5> -->
                    <div class="mode" @click="handleChangeMode">
                        <i class="bi bi-brightness-high-fill" style="font-size: 21px;" v-if="mode"></i>
                        <i class="bi bi-moon-stars-fill" style="font-size: 21px;" v-else></i>
                    </div> 

                    <div class="bell_block" @click="showNoti">
                        <i class="bi bi-bell-fill" style="font-size: 21px; cursor: pointer;"></i>
                        <span class="noti_num">{{ notiLength }}</span>
                    </div>

                    <button class="btn_avatar" style="background: transparent; border: none; color: #fff;" v-if="!loadinglogout">
                        <Avatar :word="word" style="width: 35px; height: 35px; line-height: 35px;" @click="showMenu" v-if="userData?.avatar?.length === 0"/> 
                        <div @click="showMenu" v-else>
                            <img :src="userData?.avatar" alt="" style="width: 35px; height: 35px; object-fit: cover; border-radius: 50%;">
                        </div>
                    </button>

                    <button class="btn_nav_item" v-else>
                        <LoadingBtn style="width: 32px; border-color: #fff #0000;"/>
                    </button>                    
                </div>

                <div class="user_menu text-black p-2 rounded-2" v-if="isMenu">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <div class="flex_full" style="height: 35px">
                                <Avatar :word="word" style="width: 35px; height: 35px; line-height: 35px; color: #fff;" v-if="userData?.avatar?.length === 0"/> 
                                <div v-else>
                                    <img :src="userData?.avatar" alt="" style="width: 35px; height: 35px; object-fit: cover; border-radius: 50%;">
                                </div>
                                <div class="mt-3" style="height: 35px">
                                    <p class="fw-bold">{{ userData?.fullname }}</p>
                                </div>
                            </div>
                        </li>
                        <hr/>
                        <li class="nav-item">
                            <button class="btn_nav_item">
                                <i class="bi bi-gear-fill mx-2" style="font-size: 20px;"></i> Setting
                            </button>
                        </li>
                        <hr/>
                        <li class="nav-item">
                            <button class="btn_nav_item" @click="logout">
                                <i class="bi bi-box-arrow-right mx-2" style="font-size: 20px;"></i> Logout    
                            </button>
                        </li>
                    </ul>
                </div>

                <div class="noti_menu text-black p-2 rounded-2" v-if="isNoti">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <div class="d-flex justify-content-between p-1">
                                <p class="text-danger fs-5 fw-bold">
                                    <i class="bi bi-bell-fill" style="font-size: 20px;"></i> Notifications
                                </p>
                            </div>
                        </li>

                        <li class="mt-2 px-2 d-flex gap-3">
                            <button class="badge text-white btn-read-all" :class="readAll ? 'text-bg-primary' : 'text-bg-secondary'" style="border: none;" @click="getNotis">All ({{(notiAllLength)}})</button>
                            <button class="badge text-white btn-unread" :class="readAll ? 'text-bg-secondary': 'text-bg-primary'" style="border: none;" @click="getUnreadNotis">Unread ({{ notiLength }})</button>
                        </li>

                        <li class="mt-1">
                            <div class="nav-item p-2" v-if="notis.length === 0">
                                <p class="">No new notifications</p>
                            </div>
                        </li>
                        
                        <li class="nav-item nav-item-noti p-2" v-for="noti in notis" :key="noti._id" @click="readNoti(noti._id)">
                            <router-link :to="`/library?user_id=${noti.title.includes('upload') ? noti?.user_work_id : noti?.user_id}`" class="d-flex align-items-start gap-2" style="text-decoration: none;">
                                <div v-if="noti?.avatar?.length === 0">
                                    <Avatar :word="convertWord(noti?.title)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;"/>
                                </div>
                                <div v-else>
                                    <img :src="noti?.avatar" alt="" style="width: 35px; height: 35px; object-fit: cover; border-radius: 50%;"/>
                                </div>
                                <div class="d-flex flex-column gap-0">
                                <p class="text-success">{{ noti?.message }}</p>
                                <p class="mt-0 text-primary">{{ convertTime(noti?.created_at) }}</p>
                                </div>
                            </router-link>
                        </li>   

                        <li v-if="loading">
                            <Loading/>
                        </li>
                
                        <!-- <hr/> -->
                        <!-- <li class="nav-item">
                            <button class="btn_nav_item">
                                <i class="bi bi-gear-fill mx-2" style="font-size: 20px;"></i> Setting
                            </button>
                        </li>
                        <hr/>
                        <li class="nav-item">
                            <button class="btn_nav_item" @click="logout">
                                <i class="bi bi-box-arrow-right mx-2" style="font-size: 20px;"></i> Logout    
                            </button>
                        </li> -->
                    </ul>
                </div>
                
                <!-- <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
                </form> -->
            </div>
        </nav>
    </div>
    <!-- model -->
    
    
</template>

<style lang="css" scoped>
.mode {
    cursor: pointer;
}

p {
    margin: 0;
}

.navbar-container {
    position: relative;
}

.user_menu {
    box-shadow: 0 0 10px #ccc;
    position: absolute;
    right: 10px;
    top: 80%;
    z-index: 10;
    background: #fff;
}

.user_menu ul li:hover{
    opacity: 0.7;
}

.noti_menu {
    box-shadow: 0 0 10px #ccc;
    position: absolute;
    border: 5px;
    right: 30px;
    top: 80%;
    z-index: 10;
    background: #fff;
    max-width: 350px;
    max-height: 350px;
    overflow: hidden;
    overflow-y: auto;
}

.noti_menu ul li:hover{
    cursor: pointer;
}

.nav-item-noti:hover {
    background: #E3F2FD;
    border-radius: 5px;
    opacity: 0.9;
}

.btn_nav_item {
    background: transparent;
    border: none;
    cursor: pointer;
}

.navbar-brand {
    display: inline-block;
    font-size: 25px;
    font-weight: bold;
}

.bell_block {
    position: relative;
}

.bell_block .noti_num {
    position: absolute;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    background: red;
    border-radius: 50%;
    top: -3px;
    right: -5px;
    font-size: 11px;
}

@media screen and (max-width: 299px) {
    .navbar-brand {
        display: inline-block;
        font-size: 15px;
    }

    .noti_menu {
        max-width: 80%;
        max-height: 200px;
        font-size: 12px;
    }
}

@media screen and (min-width: 300px) and (max-width: 420px) {
    .navbar-brand {
        display: inline-block;
        font-size: 18px;
    }

    .noti_menu {
        max-width: 85%;
        max-height: 300px;
        font-size: 15px;
    }
}

@media screen and (min-width: 420px) and (max-width: 577px) {   
  .navbar-brand {
    display: inline-block;
    font-size: 20px;
  }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
    .navbar-brand {
        display: inline-block;
        font-size: 22px;
    }   
}


</style>