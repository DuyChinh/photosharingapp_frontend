<template>
    <div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-success" id="exampleModalLabel">Post by {{ props?.user?.fullname }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="overflow: hidden; overflow-y:scroll;">
              <p class="d-flex align-items-center gap-1">
                <Avatar :word="props?.user?.fullname.split(' ')[props?.user.fullname.split(' ').length - 1][0]" style="width: 35px; height: 35px; line-height: 35px; color: #fff;" />
                {{ props?.user?.fullname }}
              </p>
              <p class="fw-bold fs-3">{{ photo_name }}</p>
              <p class="mb-2">{{ desc }}</p>
              <img :src="`${baseUrl}/images/${photo_url}`" class="image w-100 mb-3 rounded-1" />
  
              <!-- Danh sách bình luận -->
              <div class="list_comment">
                <div class="list_comment_item d-flex gap-3 mt-2" v-for="comment in comments" :key="comment._id">
                  <div>
                    <Avatar :word="convertWord(comment.fullname)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;" />
                  </div>
                  <div class="w-100">
                    <div class="w-100 d-flex justify-content-between align-items-center">
                      <p class="fw-bold">{{ comment.fullname }}</p>
                      <p class="text-success">{{ convertTime(comment.time) }}</p>
                    </div>
                    <p>{{ comment.description }}</p>
  
                    <div class="reply_section">
                      <button class="btn btn-link text-primary" @click="toggleReplyForm(comment._id)">Reply</button>
                      <button class="btn btn-link text-danger" @click="likeComment(comment._id)">❤️ {{ comment.likes.length }}</button>
  
                      <div v-if="activeReply === comment._id" class="reply_form d-flex gap-2">
                        <input v-model="replyText" class="form-control" placeholder="Write a reply..." />
                        <button class="btn btn-primary" @click="submitReply(comment._id)">
                          <i class="bi bi-send-fill"></i>
                        </button>
                      </div>
  
                      <!-- Danh sách phản hồi -->
                      <div class="reply_list mt-2" v-if="comment.replies && comment.replies.length">
                        <div class="reply_item d-flex gap-3 mt-2" v-for="reply in comment.replies" :key="reply._id">
                          <div>
                            <Avatar :word="convertWord(reply.fullname)" style="width: 30px; height: 30px; line-height: 30px; color: #fff;" />
                          </div>
                          <div class="w-100">
                            <div class="d-flex justify-content-between align-items-center">
                              <p class="fw-bold">{{ reply.fullname }}</p>
                              <p class="">{{ convertTime(reply.time) }}</p>
                            </div>
                            <p>{{ reply.description }}</p>
                          </div>
                        </div>
                      </div>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="modal-footer">
              <div class="card_comment d-flex flex-row align-items-center gap-2 py-2 px-3">
                <div>
                  <Avatar :word="convertWord(userData.fullname)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;" />
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
  import axios from '../../plugins/axios';
  import moment from 'moment';
  import { toast } from 'vue3-toastify';
  
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  const photo_name = ref();
  const photo_url = ref();
  const photoId = ref();
  const desc = ref();
  const comments = ref([]);
  const newComment = ref("");
  const activeReply = ref(null);
  const replyText = ref("");
  
  const props = defineProps({
    currentPhoto: {
      type: Object,
    },
    user: {
      type: Object,
    } 
  });

  const convertTime = (time) => moment(time).fromNow();
  
  const setDefault = () => {
    photo_name.value = props?.currentPhoto?.name;
    photo_url.value = props?.currentPhoto?.img;
    desc.value = props?.currentPhoto?.description;
    photoId.value = props?.currentPhoto?._id;
  };
  watchEffect(setDefault);
  
  // 📌 Lấy danh sách bình luận
  const getComments = async () => {
    await axios
      .get(`/comments/${photoId.value}`)
      .then((res) => {
        comments.value = res.data.data;
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      });
  };
  watchEffect(getComments);
  
  // 📌 Thêm bình luận
  const addComment = async () => {
    const body = {
      user_id: userData._id,
      username: userData.username,
      fullname: userData.fullname,
      photo_id: photoId.value,
      description: newComment.value,
      time: new Date(),
    };
  
    await axios
      .post(`/comments`, body)
      .then(() => {
        newComment.value = "";
        getComments();
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      });
  };
  
  // 📌 Hiển thị hộp trả lời
  const toggleReplyForm = (commentId) => {
    activeReply.value = activeReply.value === commentId ? null : commentId;
  };
  
  // 📌 Gửi phản hồi
  const submitReply = async (commentId) => {
    const body = {
      user_id: userData._id,
      username: userData.username,
      fullname: userData.fullname,
      photo_id: photoId.value,
      description: replyText.value,
      time: new Date(),
      parent_id: commentId
    };
  
    await axios
      .post(`/comments`, body)
      .then(() => {
        replyText.value = "";
        activeReply.value = null;
        getComments();
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      });
  };
  
  // 📌 Like bình luận
  const likeComment = async (commentId) => {
    await axios
      .post(`/comments/like/${commentId}`, { user_id: userData._id })
      .then(() => {
        getComments();
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      });
  };
  
  const convertTime = (time) => moment(time).fromNow();
  const convertWord = (word) => word.split(' ')[word.split(' ').length - 1][0];
  
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
  