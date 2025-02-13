<template>
    <div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-success" id="exampleModalLabel">Post by {{ props?.user?.fullname }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="overflow: hidden; overflow-y: scroll;">
              <p class="d-flex align-items-center gap-1">
                <Avatar :word="convertWord(props?.user?.fullname)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;" />
                {{ props?.user?.fullname }}
              </p>
              <p class="fw-bold fs-3">{{ photo_name }}</p>
              <p class="mb-2">{{ desc }}</p>
              <img :src="`${baseUrl}/images/${photo_url}`" class="image w-100 mb-3 rounded-1" />
  
              <!-- Danh sách bình luận -->
              <div class="list_comment">
                <CommentItem v-for="comment in comments"
                             :key="comment._id"
                             :comment="comment"
                             @reply="handleReply"
                             @like="handleLike" />
              </div>
            </div>
  
            <div class="modal-footer">
              <div class="card_comment d-flex flex-row align-items-center gap-2 py-2 px-3">
                <div>
                  <Avatar :word="convertWord(userData?.fullname)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;" />
                </div>
                <div class="w-100">
                  <input v-model="newComment" type="text" class="input_comment" placeholder="Comment here..." @keyup.enter="addComment" />
                </div>
                <i class="bi bi-send-fill text-primary ms-auto" style="cursor: pointer; font-size: 18px;" @click="addComment"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, defineProps, watchEffect } from 'vue';
import Avatar from '../../components/Avatar/index.vue';
import CommentItem from './commentItem.vue';
import axios from '../../plugins/axios';
import moment from 'moment';
import { toast } from 'vue3-toastify';
  
const baseUrl = import.meta.env.VITE_BASE_URL;
const userData = JSON.parse(localStorage.getItem('userData'));
  
const photo_name = ref("");
const photo_url = ref("");
const photoId = ref("");
const desc = ref("");
const comments = ref([]);
const newComment = ref("");

const props = defineProps({
    currentPhoto: {
        type: Object,
    },
    user: {
        type: Object,
    }
});
  
watchEffect(() => {
    if (props?.currentPhoto) {
        photo_name.value = props.currentPhoto.name || "";
        photo_url.value = props.currentPhoto.img || "";
        desc.value = props.currentPhoto.description || "";
        photoId.value = props.currentPhoto._id || "";
    }
});
  
const getComments = async () => {
if (!photoId.value) return;
    try {
        const res = await axios.get(`/comments/${photoId.value}`);
        comments.value = res.data.data || [];
    } catch (e) {
        console.error("Lỗi khi lấy bình luận:", e);
        toast.error("Lỗi khi tải bình luận!");
    }
};
watchEffect(() => {
    getComments();
});
  
const addComment = async () => {
    if (!newComment.value.trim()) {
        toast.warning("Bình luận không được để trống!");
        return;
    }

    const body = {
        user_id: userData._id,
        username: userData.username,
        fullname: userData.fullname,
        photo_id: photoId.value,
        description: newComment.value.trim(),
        time: new Date(),
    };

    try {
        await axios.post(`/comments`, body);
        newComment.value = "";
        getComments();
    } catch (e) {
        console.error("Lỗi khi gửi bình luận:", e);
        toast.error("Không thể gửi bình luận!");
    } 
};

const handleReply = async ({ commentId, replyText }) => {
    if (!replyText.trim()) {
        toast.warning("Phản hồi không được để trống!");
        return;
    }

    const body = {
        user_id: userData._id,
        username: userData.username,
        fullname: userData.fullname,
        photo_id: photoId.value,
        description: replyText.trim(),
        time: new Date(),
        parent_id: commentId
    };

    try {
        await axios.post(`/comments`, body);
        getComments();
    } catch (e) {
        console.error("Lỗi khi gửi phản hồi:", e);
        toast.error("Không thể gửi phản hồi!");
    }
};
  
const handleLike = async (commentId) => {
    try {
        await axios.post(`/comments/like/${commentId}`, { user_id: userData._id });
        getComments();
    } catch (e) {
        console.error("Lỗi khi like bình luận:", e);
        toast.error("Không thể like bình luận!");
    }
};

const convertWord = (word) => {
    if(word?.length > 0) {
        const arr = word?.split(" ");
        if(arr.length > 0) {
            return arr[arr.length - 1][0];
        }
    }
    return "";
};
  
</script>
  
<style scoped>
.card_comment {
    background-color: #f1f1f1;
    border-radius: 20px;
    width: 100%;                    
}
  
.input_comment {
    width: 100%;
    border: none;
    outline: none;
    background-color: #f1f1f1;
    border-radius: 20px;
    padding: 0px 20px;
}
  </style>
  