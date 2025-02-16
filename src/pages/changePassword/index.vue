<template lang="">
    <div class="block">
      <div class="container">
        <div class="form-container change-password-container">
          <form @submit.prevent="handleChangePassword">
            <img class="login_logo" src="../../../public/images/password-change.png" alt=""/>
            <h1 class="mb-4">Change Password</h1>
            <input v-model="email" type="text" placeholder="Nickname or Email" required/>
            <input v-model="newPassword" type="password" placeholder="New Password" required />
            <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required class="mt-3"/>
            <div class="d-flex flex-column">
                <button class="btn btn-success mt-3 text-center" type="submit" v-if="!loading">
                  Change Password
                </button>
                <button class="mt-3" type="submit" v-else>
                  <LoadingBtn style="width: 35px; border-color: #fff #0000"/>
                </button>
                <button class="btn btn-danger btn-sm-show mt-3" @click="cancelChangePassword">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../../plugins/axios';
import { toast } from 'vue3-toastify'
import LoadingBtn from '../../components/LoadingBtn/index.vue';
const email = ref('');
const confirmPassword = ref('');
const newPassword = ref('');
const loading = ref(false);
const router = useRouter();
  
const handleChangePassword = async () => {
    loading.value = true;
    if (newPassword.value !== confirmPassword.value) {
        toast.error('Passwords do not match');
        return;
    }                

    await axios
    .patch(`/auth/${email.value}`, {
        password: newPassword.value,
    })
    .then((res) => {
        toast.success('Password changed successfully');
        router.push("/login");   
    })
    .catch((err) => {
        toast.error(err.response?.data?.message);
    })
    .finally(() => {
        loading.value = false;
    });
};

const cancelChangePassword = () => {
    router.push("/login");
};
</script>
  
<style lang="css" scoped>
.block {
    position: relative;
    height: 100vh;
    background-color: #f1f7f9;
    background: url("../../../public/images/password-change-bg.jpg") no-repeat center center fixed;
    background-size: cover;
}

.container {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
}

h1 {
    color: #24C6DC;
    font-weight: bold;
    margin-bottom: 30px;
}

input {
    background-color: #eee;
    font-size: 14px;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

/* button {
border-radius: 20px;
border: 1px solid #20e3b2;
background-color: #20e3b2;
color: #ffffff;
font-size: 14px;
font-weight: bold;
padding: 12px 45px;
letter-spacing: 1px;
text-transform: uppercase;
transition: transform 80ms ease-in;
} */
/*   
button:active {
transform: scale(0.95);
} */

button:focus {
    outline: none;
}

button.ghost {
    background-color: transparent;
    border-color: #ffffff;
}

input[type="password"] {
    font-family: 'Arial', sans-serif;
}

.btn-sm-show {
    background: #f64f59;
    display: block;
    margin-top: 10px;
}
</style>
  