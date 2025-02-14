<script setup> 
import { RouterLink, useRouter } from 'vue-router';
import Avatar from '../../components/Avatar/index.vue'
import { defineProps, ref, watch, watchEffect, defineEmits, onMounted, onUnmounted } from 'vue'
const mode = ref(true);
const isMenu = ref(false);
import { toast } from 'vue3-toastify'
import axios from '../../plugins/axios';
const token = localStorage.getItem('token');
const route = useRouter();
const userData = JSON.parse(localStorage.getItem('userData'));
const word = userData?.fullname.split(" ")[userData?.fullname.split(" ").length - 1][0];

if (localStorage.getItem('mode')) {
    mode.value = localStorage.getItem('mode') === 'light' ? true : false;
}

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
    if (!event.target.closest('.user_menu') && !event.target.closest('.btn_avatar')) {
        isMenu.value = false;
    }
};

// Lắng nghe sự kiện click bên ngoài
onMounted(() => {
    window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
});

const logout = async() => {
    // setLoading(true);
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
        // setLoading(false);
    });
};


</script>
<template>
    <div>
        <nav class="navbar navbar-container bg-primary text-white py-3">
            <div class="container-fluid">
                <RouterLink to="/home" class="navbar-brand text-white" style="font-size: 25px; font-weight: 700;"><i class="bi bi-camera2 mx-1"></i> 
                    Photosharing app
                </RouterLink>
                <div class="d-flex align-items-center gap-3">
                    <!-- <h5>Home</h5> -->
                    <div class="mode" @click="handleChangeMode">
                        <i class="bi bi-brightness-high-fill" style="font-size: 20px;" v-if="mode"></i>
                        <i class="bi bi-moon-stars-fill" style="font-size: 20px;" v-else></i>
                    </div> 

                    <button class="btn_avatar" style="background: transparent; border: none; color: #fff;">
                        <Avatar :word="word" style="width: 35px; height: 35px; line-height: 35px;" @click="showMenu"/> 
                    </button>


                    <!-- <i class="bi bi-box-arrow-right"></i> -->
                    
                </div>

                <div class="user_menu text-black p-2 rounded-2" v-if="isMenu">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <div class="flex_full" style="height: 35px">
                                <Avatar :word="word" style="width: 35px; height: 35px; line-height: 35px; color: #fff;"/> 
                                <div class="mt-3" style="height: 35px">
                                    <p style="">{{ userData?.fullname }}</p>
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

.navbar-container {
    position: relative;
}

.user_menu {
    box-shadow: 0 0 10px #ccc;
    position: absolute;
    right: 10px;
    top: 80%;
    z-index: 1;
    background: #fff;
}

.user_menu ul li:hover{
    opacity: 0.7;
}

.btn_nav_item {
    background: transparent;
    border: none;
    cursor: pointer;
}
</style>