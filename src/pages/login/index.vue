<template lang="">
    <div class="block">
        <div id="customCarousel" class="custom-carousel">
            <div class="custom-carousel-inner">
                <div class="custom-carousel-item custom-active">
                    <img src="../../../public/images/family01.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="custom-carousel-item">
                    <img src="../../../public/images/family02.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="custom-carousel-item">
                    <img src="../../../public/images/family03.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="custom-carousel-item">
                    <img src="../../../public/images/family04.jpg" class="d-block w-100" alt="...">
                </div>
            </div>
        </div>

        <div class="image_icon">
            <img src="../../../public/images/photos_icon.png">
        </div>
        <div class="card guide">
            <img src="../../../public/images/shareEveryone.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Share photo</h5>
                <p class="card-text">
                    Share photos with everyone. You can share your photos with everyone.
                </p>
                <button class="btn btn-primary btn-explore" style="font-size: 12px">Login to explore now!</button>
            </div>
        </div>

        <div class="card guide_2">
            <img src="../../../public/images/comment.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Comment photo</h5>
                <p class="card-text">
                    Comment photos with everyone. You can comment your photos with everyone.
                </p>
                <button class="btn btn-primary btn-explore" style="font-size: 12px">Login to explore now!</button>
            </div>
        </div>

        <div class="title_block">
            <a class="title text-black"><i class="bi bi-camera2 mx-1"></i> PHOTOSHARING APP</a>
        </div>
        <div class="container" id="container" :class="{'right-panel-active': !isSignUp}">
            <div class="form-container sign-up-container">
                <form @submit.prevent="handleSignUp">
                    <img class="login_logo" src="../../../public/images/signup.png" alt=""/>
                    <h1 class="mb-3">Sign Up</h1>
                    <!-- <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div> -->
                    <!-- <span>or use your email for registration</span> -->
                    <!-- <input type="text" placeholder="Name" /> -->
                    <input v-model="email" type="text" placeholder="Nickname or Email" required/>
                    <input v-model="fullName" type="text" placeholder="Fullname" required/>
                    <input v-model="password" type="password" placeholder="Password" required/>
                    <button class="mt-2" type="submit" v-if="!loading">
                        Sign Up
                     </button>
                    <button class="mt-2" type="submit" v-else>
                        <LoadingBtn style="width: 35px; border-color: #fff #0000"/>
                     </button>
                    <button class="btn-sm-show mt-2" @click="toggleForm">Sign In</button>
                </form>
        
            </div>
            <div class="form-container sign-in-container">
            <form @submit.prevent="handleSignIn">
                <img class="login_logo" src="../../../public/images/login.png" alt=""/>
                <h1 class="my-3">Sign In</h1>
                <!-- <div class="social-container">
                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div> -->
                <!-- <span>or use your email account</span> -->
                <input v-model="email" type="text" placeholder="Nickname or Email" required/>
                <input v-model="password" type="password" placeholder="Password" required/>
                <router-link to="/changepassword">
                    Forgot your password?
                </router-link>
                <!-- <a href="#">Forgot your password?</a> -->
                <GoogleSignInButton
                    shape="circle"
                    @success="handleLoginSuccess"
                    @error="handleLoginError"
                >
                </GoogleSignInButton>
                <button class="mt-2" type="submit" v-if="!loading">
                        Sign In
                </button>
                <button class="mt-2" type="submit" v-else>
                    <LoadingBtn style="width: 35px; border-color: #fff #0000"/>
                </button>
                <button class="btn-sm-show mt-2" @click="toggleForm">Sign Up</button>
            </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>If you already have an account, please sign in to continue.</p>
                        <button class="ghost" id="SignIn" @click="toggleForm">Sign In</button>              
                    </div>

                    <div class="overlay-panel overlay-right">
                        <h1>Join Us!</h1>
                        <p>If you're new here, enter your details and create an account to get started.</p>
                        <button class="ghost" id="SignUp" @click="toggleForm">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue';
import { toast } from 'vue3-toastify'
import LoadingBtn from '../../components/LoadingBtn/index.vue';
import changePassword from '../changePassword/index.vue';
import axios from '../../plugins/axios';
import { GoogleSignInButton } from 'vue3-google-signin';
const baseUrl = import.meta.env.VITE_BASE_URL;
const isSignUp = ref(true);
const isLogin = ref(false);
const email = ref('');
const password = ref('');
const fullName = ref('');
const router = useRouter();
const route = useRoute();
const loading = ref(false);
let slideInterval;


const handleSignIn = async() => {
    loading.value = true;
    if (!email.value || !password.value) {
        // toast.error('Please enter email and password');
        return;
    }
    await axios.post(`/auth/login`, {
        username: email.value,
        password: password.value
    })
    .then((res) => {
        clearInterval(slideInterval);
        const user = res.data.userData;
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('userData', JSON.stringify({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            avatar: user.avatar,
        }));
        router.push("/home");
    })
    .catch((err) => {
        toast.error(err.response?.data?.message);
    })
    .finally(() => {
        loading.value = false;
    });
}

const handleSignUp = async() => {
    loading.value = true;
    if (!email.value || !password.value || !fullName.value) {
        toast.error('Please enter email, password and full name');
        return;
    }
    await axios.post(`/auth/signup`, {
        username: email.value,
        password: password.value,
        fullname: fullName.value
    })
    .then((res) => {
        toast.success('Sign up successfully');
        isSignUp.value = !isSignUp.value;
    })
    .catch((err) => {
        toast.error(err.response?.data?.message);
    })
    .finally(() => {
        loading.value = false;
    });
}


const toggleForm = () => {
    isSignUp.value = !isSignUp.value;
}
let currentIndex = 0;

const showSlide = (index) => {
  const slides = document.querySelectorAll('#customCarousel .custom-carousel-item');
  const totalSlides = slides.length;
  if (!slides.length) return;
  if (index >= totalSlides) {
    currentIndex = 0;
    setTimeout(() => {
      const carouselInner = document.querySelector('#customCarousel .custom-carousel-inner');
      carouselInner.style.transition = 'none'; 
      carouselInner.style.transform = `translateX(-100%)`; 
    }, 500); 
  } else if (index < 0) {
    currentIndex = totalSlides - 1;
    setTimeout(() => {
      const carouselInner = document.querySelector('#customCarousel .custom-carousel-inner');
      carouselInner.style.transition = 'none';
      carouselInner.style.transform = `translateX(${-(totalSlides - 1) * 100}%)`; 
    }, 500);
  } else {
    currentIndex = index;
  }

  setTimeout(() => {
    const carouselInner = document.querySelector('#customCarousel .custom-carousel-inner');
    if(carouselInner) {
        carouselInner.style.transition = 'transform 0.5s ease-in-out'; 
        const offset = -100 * currentIndex;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }
  }, 1000); 
};

const handleLoginSuccess = async(response) => {
    loading.value = true;
    const { credential } = response;
    if (credential) {
    await axios
        .post(`/auth/google/signin`, {
            token: credential,
        })
        .then((res) => {
            clearInterval(slideInterval);
            const user = res.data.userData;
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('userData', JSON.stringify({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                avatar: user.avatar,
            }));
            router.push("/home");
        })
        .catch((error) => {
            toast(`${error?.response?.data?.msg}` );
        }).finally(() => {
            loading.value = false;
        }); 
    }
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};

onMounted(() => {
    slideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 2000);
    showSlide(currentIndex);
});

onUnmounted(() => {
    clearInterval(slideInterval);
});
</script>

<style lang="css" scoped>
.custom-carousel {
  position: absolute;
  width: 18%;
  top: 1%;
  right: 1%;
  overflow: hidden;
  border-radius: 10px;
}

.custom-carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.custom-carousel-item {
  min-width: 100%;
  height: auto;
}

/* img {
  width: 100%;
  height: auto;
} */

.block {
    position: relative;
    /* max-height: 100vh; */
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #f1f7f9;
    background: url("../../../public/images/family02.jpg") no-repeat center center fixed;
    background-size: cover;
}

.title {
    display: inline-block;
    font-size: 35px;
    font-weight: bold;
    margin-left: 30px;
}

.guide {
    position: absolute;
    top: 1%;
    left: 1%;
    width: 16%;
}

.guide_2 {
    position: absolute;
    bottom: 1%;
    right: 1%;
    width: 16%;
}

.title_block {
    margin: 0 auto;
    width: fit-content;
    text-align: center;
    background: #fff;
    padding: 10px 20px;
    opacity: 0.8;
    border-radius: 10px;
}

#carouselExampleSlidesOnly {
    border-radius: 8px;
    width: 22%;
    position: absolute;
    right: 2%;
    top: 16%;
}

.image_icon {
    position: absolute;
    left: 5%;
    top: 70%;
}

.image_icon img {
    width: 150px;
    height: 150px;
}

.login_logo {
    width: 50px;
    height: 50px;
}

h1 {
    color: #24C6DC;
    font-weight: bold;
    margin: 0;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 14px;
}

a {
    color: #514A9D;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

button {
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
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: transparent;
    border-color: #ffffff;
}

form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

input {
    background-color: #eee;
    font-size: 14px;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
    color: #000;
}

.container {
    background-color:#ffffff;
    border-radius: 8px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* margin-top: 150px; */
}
.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}
.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background: #ff9966; 
    background: -webkit-linear-gradient(to right, #ff5e62, #ff9966);  
    background: linear-gradient(to right, #ff5e62, #ff9966); 
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-panel h1 {
  color: white;
}
.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

#info {
  margin-top: 1rem;
  text-align: center; 
}

.btn-explore {
    display: none;
}

.btn-sm-show {
    background: #f64f59;
    display: none;
}

@media screen and (max-width: 250px) {
    .custom-carousel {
        display: none;
    }
    .guide, .guide_2 {
        display: none;
    }

    .image_icon {
        display: none;
    }

    .title {
        font-size: 14px;
    }

    .container.right-panel-active .sign-in-container {
        transform: translateX(100%);
    }

    .container.right-panel-active .sign-up-container {
        transform: translateX(0);
        opacity: 1;
        z-index: 5;
        animation: show 0.6s;
    }

    .btn-sm-show {
        display: block;
    }
}

@media screen and (min-width: 250px) and (max-width: 420px) {
    .custom-carousel {
        display: none;
    }
    .guide, .guide_2 {
        display: none;
    }

    .image_icon {
        display: none;
    }

    .sign-up-container, .sign-in-container {
        width: 100%;
    }

    .overlay-container {
        display: none;
    }

    .title {
        font-size: 20px;
    }

    .container.right-panel-active .sign-in-container {
        transform: translateX(100%);
    }

    .container.right-panel-active .sign-up-container {
        transform: translateX(0);
        opacity: 1;
        z-index: 5;
        animation: show 0.6s;
    }

    .btn-sm-show {
        display: block;
    }
}

@media screen and (min-width: 420px) and (max-width: 576px) {
    .custom-carousel {
        display: none;
    }
    .guide, .guide_2 {
        display: none;
    }

    .image_icon {
        display: none;
    }

    .sign-up-container, .sign-in-container {
        width: 100%;
    }

    .overlay-container {
        display: none;
    }

    .title {
        font-size: 30px;
    }

    .container.right-panel-active .sign-in-container {
        transform: translateX(100%);
    }

    .container.right-panel-active .sign-up-container {
        transform: translateX(0);
        opacity: 1;
        z-index: 5;
        animation: show 0.6s;
    }

    .btn-sm-show {
        display: block;
    }
}

@media screen and (min-width: 576px) and (max-width: 792px) {
    .guide, .guide_2 {
        display: none;
    }

    .image_icon {
        display: none;
    }

    .custom-carousel {
        display: none;
    }    
}

@media screen and (min-width: 792px) and (max-width: 992px) {
    .guide h5, .guide_2 h5 {
        font-size: 16px;
    }
    .guide p, .guide_2 p {
        display: none;
    }

    .image_icon {
        display: none;
    }
}


@media screen and (min-width: 992px) and (max-width: 1200px) {
    #container {
        width: 64%;
    }

}

@media screen and (min-width: 1200px) and (max-width: 1400px) {
    /* .btn-explore {
        display: block;
    } */
}

@media screen and (min-width: 1500px) {
    .btn-explore {
        display: block;
    }
}
</style>
