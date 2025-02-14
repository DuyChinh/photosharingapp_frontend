import{_ as z,c as r,h as i,b as e,d as n,j as m,z as M,t as R,p as h,F as A,r as g,u as v,o as x,g as y,s as N,x as B,l as w,R as E}from"./index-BbVe6PBw.js";import{A as H,a as k}from"./axios-B8y3i6d1.js";const V={__name:"index",setup(S,{expose:o}){o();const a=g(!0),t=g(!1),c=localStorage.getItem("token"),d=v(),s=JSON.parse(localStorage.getItem("userData")),I=s==null?void 0:s.fullname.split(" ")[(s==null?void 0:s.fullname.split(" ").length)-1][0];localStorage.getItem("mode")&&(a.value=localStorage.getItem("mode")==="light");const C=()=>{a.value=!a.value,a.value?(localStorage.setItem("mode","light"),document.body.classList.remove("dark")):(localStorage.setItem("mode","dark"),document.body.classList.add("dark"))},L=()=>{t.value=!t.value},u=l=>{!l.target.closest(".user_menu")&&!l.target.closest(".btn_avatar")&&(t.value=!1)};x(()=>{window.addEventListener("click",u)}),y(()=>{window.removeEventListener("click",u)});const f={mode:a,isMenu:t,token:c,route:d,userData:s,word:I,handleChangeMode:C,showMenu:L,handleClickOutside:u,logout:async()=>{const l={msg:"inactive"};await k.post("/auth/logout",l,{headers:{Authorization:`Bearer ${c}`}}).then(_=>{localStorage.removeItem("token"),localStorage.setItem("userData",""),d.push("/login")}).catch(_=>{var b,p;w.error((p=(b=_.response)==null?void 0:b.data)==null?void 0:p.message)}).finally(()=>{})},get RouterLink(){return E},get useRouter(){return v},Avatar:H,ref:g,watch:B,watchEffect:N,onMounted:x,onUnmounted:y,get toast(){return w},get axios(){return k}};return Object.defineProperty(f,"__isScriptSetup",{enumerable:!1,value:!0}),f}},O={class:"navbar navbar-container bg-primary text-white py-3"},j={class:"container-fluid"},D={class:"d-flex align-items-center gap-3"},F={key:0,class:"bi bi-brightness-high-fill",style:{"font-size":"20px"}},P={key:1,class:"bi bi-moon-stars-fill",style:{"font-size":"20px"}},U={class:"btn_avatar",style:{background:"transparent",border:"none",color:"#fff"}},J={key:0,class:"user_menu text-black p-2 rounded-2"},T={class:"navbar-nav me-auto mb-2 mb-lg-0"},q={class:"nav-item"},G={class:"flex_full",style:{height:"35px"}},K={class:"mt-3",style:{height:"35px"}},Q={style:{}};function W(S,o,a,t,c,d){var s;return i(),r(A,null,[e("div",null,[e("nav",O,[e("div",j,[m(t.RouterLink,{to:"/home",class:"navbar-brand text-white",style:{"font-size":"25px","font-weight":"700"}},{default:M(()=>o[0]||(o[0]=[e("i",{class:"bi bi-camera2 mx-1"},null,-1),h(" Photosharing app ")])),_:1}),e("div",D,[n(" <h5>Home</h5> "),e("div",{class:"mode",onClick:t.handleChangeMode},[t.mode?(i(),r("i",F)):(i(),r("i",P))]),e("button",U,[m(t.Avatar,{word:t.word,style:{width:"35px",height:"35px","line-height":"35px"},onClick:t.showMenu},null,8,["word"])]),n(' <i class="bi bi-box-arrow-right"></i> ')]),t.isMenu?(i(),r("div",J,[e("ul",T,[e("li",q,[e("div",G,[m(t.Avatar,{word:t.word,style:{width:"35px",height:"35px","line-height":"35px",color:"#fff"}},null,8,["word"]),e("div",K,[e("p",Q,R((s=t.userData)==null?void 0:s.fullname),1)])])]),o[2]||(o[2]=e("hr",null,null,-1)),o[3]||(o[3]=e("li",{class:"nav-item"},[e("button",{class:"btn_nav_item"},[e("i",{class:"bi bi-gear-fill mx-2",style:{"font-size":"20px"}}),h(" Setting ")])],-1)),o[4]||(o[4]=e("hr",null,null,-1)),e("li",{class:"nav-item"},[e("button",{class:"btn_nav_item",onClick:t.logout},o[1]||(o[1]=[e("i",{class:"bi bi-box-arrow-right mx-2",style:{"font-size":"20px"}},null,-1),h(" Logout ")]))])])])):n("v-if",!0),n(` <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
                </form> `)])])]),n(" model ")],2112)}const $=z(V,[["render",W],["__scopeId","data-v-eef40c4c"],["__file","/Users/doanduychinh/Documents/photosharingapp_frontend/src/components/Header/index.vue"]]);export{$ as H};
