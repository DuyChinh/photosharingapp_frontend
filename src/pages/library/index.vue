<template >
    <div>
        <Header class="mb-2"/>
        <div class="row flex-nowrap gap-3">
            <div class="card col-2 ms-md-4 p-3" style="background: #333; color: #fff;">
                <div class="card-title fs-5 fw-bold text-success">
                    <img src="../../../public/images/library.png" class="icon"/>
                    {{ user?.fullname?.split(" ")[user.fullname.split(" ").length - 1] }}'s library
                </div>
                <div class="text-warning"><i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i></div>
                <div class="card-text">
                    <p class="mt-3"><i class="bi bi-image"></i> Images: 
                        <span class="badge rounded-pill text-bg-info text-white">{{ total_image }}</span>
                    </p>
                    <p class="mt-3 d-flex align-items-center gap-1"><i class="bi bi-person-bounding-box"></i> Follower: 
                        <span class="badge rounded-pill text-bg-danger">{{ total_follower }}</span>
                    </p>
                </div>
            </div>

            <div class="col-9 img_container">
                <!-- <div class="card-title fs-5 text-danger fw-bold">
                    <img src="../../../public/images/photo01.png" class="icon"/>
                     List image
                </div> -->
                
                <div class="list_image">
                    <div class="list_image_item p-3 d-flex justify-content-center align-items-center flex-column" v-if="userData._id === user_id">
                        <p class="fs-5 fw-bold"><i class="bi bi-stars text-danger"></i> Do you have any new images?</p>
                        <!-- <button class="btn btn-danger text-white d-block mx-auto mt-3">
                            <input type="file" @change="handleUpload" class="file-input" hidden/>
                            <i class="bi bi-cloud-upload-fill"></i>
                            Upload photo
                        </button> -->
                        <label class="btn btn-danger text-white d-block mx-auto mt-3 upload-btn">
                            <i class="bi bi-cloud-upload-fill"></i>
                                Upload Photo
                            <input type="file" @change="handleUpload" class="file-input" hidden/>
                        </label>
                    </div>
                    <div class="list_image_item p-2" v-for="photo in photos" :key="photo._id">
                        <RouterLink :to="{
                            path: `/photo`,
                            query: {
                                id: photo._id,
                            },
                        }">
                            <img :src="`${baseUrl}/images/${photo.img}`" class="image w-100"/>
                        </RouterLink>
                        <div class="p-4">
                            <p class="fw-bold fs-5 title" style="width: 100%;">{{ photo.name }}</p>
                            <p class="mt-1 desc">{{  photo.description }}</p>
                            <span class="badge rounded-pill text-bg-info text-white mt-2">{{ formatTime(photo?.created_at)  }}</span>
                            <hr/>
                            <div class="d-flex justify-content-between flex-wrap action_image">
                                <p class="d-flex align-items-center gap-2" @click="handleLove(photo._id)">
                                    <i class="bi bi-heart" v-if="!isPhotoLoved(photo)"></i>
                                    <i class="bi bi-heart-fill text-danger" v-else></i>
                                    Love <span class="badge rounded-pill text-bg-warning" style="font-size: 10px;">{{ photo.love?.length }}</span>
                                </p>
                                <p class="d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="changeCurrentPhoto(photo)"><i class="bi bi-chat-left-text"></i>Comment</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between flex-wrap gap-2 p-3" v-if="userData._id === user_id">
                            <button class="badge rounded-pill" :class="{
                                'text-bg-success': photo.share_status === 'public',
                                'text-bg-secondary': photo.share_status === 'private'
                                }" data-bs-target="#changeShareStatus" data-bs-toggle="modal" @click="changeCurrentPhoto(photo)">
                                {{ photo.share_status }}
                            </button>
                            <button @click="changeCurrentPhoto(photo)" class="badge rounded-pill text-bg-warning" data-bs-target="#editPhotoModal" data-bs-toggle="modal">
                                <i class="bi bi-pencil-fill"></i> Edit
                            </button>
                            <button @click="changeCurrentPhoto(photo)" class="badge rounded-pill text-bg-danger" data-bs-target="#deleteModal" data-bs-toggle="modal">
                                <i class="bi bi-trash-fill"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DeleteModal
            :photoId="currentPhotoId"
            :fetchPhotos="fetchPhotos"
        />
        <EditPhoto
            :photoId="currentPhotoId" 
            :currentPhoto="currentPhoto"
            :fetchPhotos="fetchPhotos"
        />
        <ChangeShareStatus
            :photoId="currentPhotoId"
            :shareStatus="currentPhoto?.share_status"
            :fetchPhotos="fetchPhotos"
        />
        <Comment
            :currentPhoto="currentPhoto"
            :user="user"
        />
    </div>
</template>
<script setup>
import { ref, defineProps, watch, defineEmits, watchEffect } from 'vue'
import Header from '../../components/Header/index.vue'
import Comment from '../../components/Comment/index.vue';
// import Comment2 from '../../components/Comment2/index.vue';
import DeleteModal from '../../views/Library/DeleteModal.vue'
import EditPhoto from '../../views/Library/EditPhoto.vue';
import moment from 'moment';
import ChangeShareStatus from '../../views/Library/ChangeShareStatus.vue';
import { useRoute, RouterLink } from 'vue-router';
import { toast} from 'vue3-toastify';
import axios from '../../plugins/axios';
const baseUrl = import.meta.env.VITE_BASE_URL;
const isLove = ref(false);
const file = ref();
const userData = JSON.parse(localStorage.getItem('userData'));
const token = localStorage.getItem("token");
const loading = ref(false);
const route = useRoute();
const user_id = route.query.user_id;
const user = ref();
const total_image = ref(0);
const total_follower = ref(0);
const photos = ref([]);
const currentPhotoId = ref();
const currentPhoto = ref();

const formatTime = (time) => {
    return new Date(time).toLocaleDateString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour12: false, 
        });
};

const getUser = async() => {
    // loading.value = true;
    await axios.get(`/users/${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        user.value = res.data.data;
        total_follower.value = user.value.follow.length;
    })
    .catch((e) => {
        toast.error(e.response?.data?.message);
    }).finally(() => {
        // loading.value = false;
    });
};
watchEffect(getUser);

const fetchPhotos = async () => {
    loading.value = true;
    await axios.get(`/photos?userId=${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        photos.value = res.data.data;
        total_image.value = photos.value.length;
        if(user_id !== userData._id) {
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


const handleUpload = async (e) => {
    file.value = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file.value);
    await axios
    .post(`/upload`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },  
    })
    .then((res) => {
        toast.success(res.data.message);
        fetchPhotos();
    })
    .catch((e) => {
        toast.error("Upload failed. Please try again!");
    })
    .finally(() => {
    // setLoading(false);
    });
};

const handleDelete = async (id) => {
    setImgIdDelete(id);
    setOpen(true);
};

const changeCurrentPhoto = (photo) => {
    currentPhotoId.value = photo._id;
    currentPhoto.value = photo;
    // console.log(currentPhotoId.value);
};

const handleLove = async (id) => {
    await axios
      .patch(`${baseUrl}/photos/love/${id}`, { userId: userData._id }, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
      .then((res) => {
        //   toast.success(res.data.message);
          fetchPhotos();
      })
      .catch((e) => {
        //   toast.error(e.response?.data?.message);
      });
};

const isPhotoLoved = (photo) => {
  return photo.love && photo.love.includes(userData._id);
};

</script>
<style lang="css">
.img_container {
   height: calc(100vh - 100px);
   overflow: hidden;
   overflow-y:scroll
}

.list_image {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    /* justify-content: center; */
    /* width: 100%; */
}
.list_image_item {
    position: relative;
    width: calc(33% - 30px);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.list_image_item img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    object-fit: cover;
}

.list_image_item img:hover {
    cursor: pointer;
    opacity: 0.8;
}

.list_image_item .title {
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; 
    word-break: break-word; 
}

.list_image_item .desc {
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; 
    word-break: break-word; 
}

p {
    margin: 0;
}

.btn_item {
    padding: 2px 8px;
    border: none;
    border-radius: 5px;
    display: block;
    margin-left: auto;
}

.action_image p {
    cursor: pointer;
}

.img_setting {
    position: absolute;
    bottom: -20px;
    right: -50%;
    background: rgba(0, 0, 0, 0.5);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    display: none;
}

.img_setting p:hover {
    background: rgba(0, 0, 0, 0.8);
}
</style>