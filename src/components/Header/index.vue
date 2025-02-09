<script setup> 
import Avatar from '../../components/Avatar/index.vue'
import { defineProps, ref, watch, defineEmits } from 'vue'
const mode = ref(true);
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

</script>
<template>
    <div>
        <nav class="navbar bg-primary text-white py-3">
            <div class="container-fluid">
                <a class="navbar-brand text-white" style="font-size: 25px; font-weight: 700;"><i class="bi bi-camera2 mx-1"></i> Photosharing app</a>
                <div class="d-flex align-items-center gap-3">
                    <!-- <h5>Home</h5> -->
                    <button type="button" class="btn btn-outline-light"><i class="bi bi-person-fill"></i> Login</button>
                    <div class="mode" @click="handleChangeMode">
                        <i class="bi bi-brightness-high-fill" style="font-size: 20px;" v-if="mode"></i>
                        <i class="bi bi-moon-stars-fill" style="font-size: 20px;" v-else></i>
                    </div>
                </div>
                
                <!-- <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
                </form> -->
            </div>
        </nav>
    </div>
</template>

<style lang="css">
.mode {
    cursor: pointer;
}
</style>