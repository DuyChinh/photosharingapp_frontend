import{_ as O,c as P,a as T,b as s,w as x,d as p,e as m,v,n as B,r as c,u as I,f as k,o as U,g as C,l as g,h as E}from"./index-D8N1V1Ye.js";import{a as b}from"./index-DW_MHI2K.js";const R="/photosharingapp_frontend/public/assets/family01-BK6ecVho.jpg",M="/photosharingapp_frontend/public/assets/family02-tdT2a_od.jpg",z="/photosharingapp_frontend/public/assets/family03-ooCmdrei.jpg",A="/photosharingapp_frontend/public/assets/family04-CMfObOEe.jpg",L="/photosharingapp_frontend/public/assets/photos_icon-Bant5QGU.png",X="/photosharingapp_frontend/public/assets/shareEveryone-w5oVTsZV.jpg",G="/photosharingapp_frontend/public/assets/comment-D-EFjxDn.jpg",H="/photosharingapp_frontend/public/assets/signup-Dj67ObcZ.png",J="/photosharingapp_frontend/public/assets/login-peKu41dF.png",K={__name:"index",setup(N,{expose:a}){a();const f="https://photosharingapp.up.railway.app",e=c(!0),w=c(!1),d=c(""),t=c(""),h=c(""),_=I(),V=k();let u;const j=async()=>{!d.value||!t.value||await b.post(`${f}/auth/login`,{username:d.value,password:t.value}).then(o=>{clearInterval(u);const n=o.data.userData;localStorage.setItem("token",o.data.access_token),localStorage.setItem("userData",JSON.stringify({_id:n._id,username:n.username,fullname:n.fullname})),_.push("/home")}).catch(o=>{var n,l;g.error((l=(n=o.response)==null?void 0:n.data)==null?void 0:l.message)})},q=async()=>{if(!d.value||!t.value||!h.value){g.error("Please enter email, password and full name");return}await b.post(`${f}/auth/signup`,{username:d.value,password:t.value,fullname:h.value}).then(o=>{g.success("Sign up successfully"),e.value=!e.value}).catch(o=>{var n,l;g.error((l=(n=o.response)==null?void 0:n.data)==null?void 0:l.message)})},D=()=>{e.value=!e.value};let i=0;const y=o=>{const n=document.querySelectorAll("#customCarousel .custom-carousel-item"),l=n.length;n.length&&(o>=l?(i=0,setTimeout(()=>{const r=document.querySelector("#customCarousel .custom-carousel-inner");r.style.transition="none",r.style.transform="translateX(-100%)"},500)):o<0?(i=l-1,setTimeout(()=>{const r=document.querySelector("#customCarousel .custom-carousel-inner");r.style.transition="none",r.style.transform=`translateX(${-(l-1)*100}%)`},500)):i=o,setTimeout(()=>{const r=document.querySelector("#customCarousel .custom-carousel-inner");if(r){r.style.transition="transform 0.5s ease-in-out";const F=-100*i;r.style.transform=`translateX(${F}%)`}},1e3))};U(()=>{u=setInterval(()=>{y(i+1)},2e3),y(i)}),C(()=>{clearInterval(u)});const S={baseUrl:f,isSignUp:e,isLogin:w,email:d,password:t,fullName:h,router:_,route:V,get slideInterval(){return u},set slideInterval(o){u=o},handleSignIn:j,handleSignUp:q,toggleForm:D,get currentIndex(){return i},set currentIndex(o){i=o},showSlide:y,get useRouter(){return I},get useRoute(){return k},ref:c,onMounted:U,onUnmounted:C,get toast(){return g},get axios(){return b}};return Object.defineProperty(S,"__isScriptSetup",{enumerable:!1,value:!0}),S}},Y={class:"block"},Z={class:"form-container sign-up-container"},Q={class:"form-container sign-in-container"};function W(N,a,f,e,w,d){return E(),P("div",Y,[a[16]||(a[16]=T('<div id="customCarousel" class="custom-carousel" data-v-45258083><div class="custom-carousel-inner" data-v-45258083><div class="custom-carousel-item custom-active" data-v-45258083><img src="'+R+'" class="d-block w-100" alt="..." data-v-45258083></div><div class="custom-carousel-item" data-v-45258083><img src="'+M+'" class="d-block w-100" alt="..." data-v-45258083></div><div class="custom-carousel-item" data-v-45258083><img src="'+z+'" class="d-block w-100" alt="..." data-v-45258083></div><div class="custom-carousel-item" data-v-45258083><img src="'+A+'" class="d-block w-100" alt="..." data-v-45258083></div></div></div><div class="image_icon" data-v-45258083><img src="'+L+'" data-v-45258083></div><div class="card guide" style="width:16%;" data-v-45258083><img src="'+X+'" class="card-img-top" alt="..." data-v-45258083><div class="card-body" data-v-45258083><h5 class="card-title" data-v-45258083>Share photo</h5><p class="card-text" data-v-45258083> Share photos with everyone. You can share your photos with everyone. </p><button class="btn btn-primary" style="font-size:12px;" data-v-45258083>Login to explore now!</button></div></div><div class="card guide_2" style="width:16%;" data-v-45258083><img src="'+G+'" class="card-img-top" alt="..." data-v-45258083><div class="card-body" data-v-45258083><h5 class="card-title" data-v-45258083>Comment photo</h5><p class="card-text" data-v-45258083> Comment photos with everyone. You can comment your photos with everyone. </p><button class="btn btn-primary" style="font-size:12px;" data-v-45258083>Login to explore now!</button></div></div><div class="title_block" data-v-45258083><a class="title text-black" data-v-45258083><i class="bi bi-camera2 mx-1" data-v-45258083></i> PHOTOSHARING APP</a></div>',5)),s("div",{class:B(["container",{"right-panel-active":!e.isSignUp}]),id:"container"},[s("div",Z,[s("form",{onSubmit:x(e.handleSignUp,["prevent"])},[a[5]||(a[5]=s("img",{class:"login_logo",src:H,alt:""},null,-1)),a[6]||(a[6]=s("h1",{class:"mb-3"},"Sign Up",-1)),p(` <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div> `),p(" <span>or use your email for registration</span> "),p(' <input type="text" placeholder="Name" /> '),m(s("input",{"onUpdate:modelValue":a[0]||(a[0]=t=>e.email=t),type:"text",placeholder:"Nickname or Email",required:""},null,512),[[v,e.email]]),m(s("input",{"onUpdate:modelValue":a[1]||(a[1]=t=>e.fullName=t),type:"text",placeholder:"Fullname",required:""},null,512),[[v,e.fullName]]),m(s("input",{"onUpdate:modelValue":a[2]||(a[2]=t=>e.password=t),type:"password",placeholder:"Password",required:""},null,512),[[v,e.password]]),a[7]||(a[7]=s("button",{class:"mt-2",type:"submit"},"Sign Up",-1))],32)]),s("div",Q,[s("form",{onSubmit:x(e.handleSignIn,["prevent"])},[a[8]||(a[8]=s("img",{class:"login_logo",src:J,alt:""},null,-1)),a[9]||(a[9]=s("h1",{class:"my-3"},"Sign In",-1)),p(` <div class="social-container">
                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div> `),p(" <span>or use your email account</span> "),m(s("input",{"onUpdate:modelValue":a[3]||(a[3]=t=>e.email=t),type:"text",placeholder:"Nickname or Email",required:""},null,512),[[v,e.email]]),m(s("input",{"onUpdate:modelValue":a[4]||(a[4]=t=>e.password=t),type:"password",placeholder:"Password",required:""},null,512),[[v,e.password]]),a[10]||(a[10]=s("a",{href:"#"},"Forgot your password?",-1)),a[11]||(a[11]=s("button",{type:"submit"},"Sign In",-1))],32)]),s("div",{class:"overlay-container"},[s("div",{class:"overlay"},[s("div",{class:"overlay-panel overlay-left"},[a[12]||(a[12]=s("h1",null,"Welcome Back!",-1)),a[13]||(a[13]=s("p",null,"If you already have an account, please sign in to continue.",-1)),s("button",{class:"ghost",id:"SignIn",onClick:e.toggleForm},"Sign In")]),s("div",{class:"overlay-panel overlay-right"},[a[14]||(a[14]=s("h1",null,"Join Us!",-1)),a[15]||(a[15]=s("p",null,"If you're new here, enter your details and create an account to get started.",-1)),s("button",{class:"ghost",id:"SignUp",onClick:e.toggleForm},"Sign Up")])])])],2)])}const sa=O(K,[["render",W],["__scopeId","data-v-45258083"],["__file","/Users/doanduychinh/Documents/photosharingapp_frontend/src/pages/login/index.vue"]]);export{sa as default};
