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
              <p class="d-flex align-items-center gap-1"><Avatar :word="props?.user?.fullname.split(' ')[props?.user.fullname.split(' ').length - 1][0]" style="width: 35px; height: 35px; line-height: 35px; color: #fff;"/>
                {{ props?.user?.fullname }}
              </p>
              <p class="fw-bold fs-3">{{ photo_name }}</p>
              <p class="mb-2">{{ desc }}</p>
                <img :src="`${baseUrl}/images/${photo_url}`" class="image w-100 mb-3 rounded-1"/>
              <div class="list_comment">
                <div class="list_comment_item d-flex gap-3 mt-2" v-for="comment in comments" :key="comment.id">
                  <div>
                    <Avatar :word="convertWord(comment.fullname)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;"/>
                  </div>
                  <div class="w-100">
                    <div class="w-100 d-flex justify-content-between align-items-center">
                      <p class="fw-bold">{{ comment.fullname }}</p>
                      <p class="text-success">{{ convertTime(comment.time) }}</p>
                    </div>
                    <p>{{ comment.description }}</p>
  
                    <div class="reply_section">
                      <button class="btn btn-link text-primary" @click="toggleReplyForm(comment._id)">Reply</button>
                      <div v-if="activeReply === comment.id" class="reply_form d-flex gap-2">
                        <input v-model="replyText" class="form-control" placeholder="Write a reply..."></input>
                        <button class="btn btn-primary" @click="submitReply(comment._id)"><i class="bi bi-send-fill"></i></button>
                      </div>
                 
                      <!-- <div class="reply_list mt-2" v-if="comment.replies.length">
                        <div class="reply_item d-flex gap-3" v-for="reply in comment.replies" :key="reply.id">
                          <div>
                            <Avatar :word="reply.initial" style="width: 30px; height: 30px; line-height: 30px; color: #fff;"/>
                          </div>
                          <div class="w-100">
                            <div class="d-flex justify-content-between align-items-center">
                              <p class="fw-bold">{{ reply.user }}</p>
                              <p class="">{{ reply.time }}</p>
                            </div>
                            <p>{{ reply.text }}</p>
                          </div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="card_comment d-flex flex-row align-items-center gap-2 py-2 px-3">
                <div>
                  <Avatar :word="convertWord(userData.fullname)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;"/>
                </div>
                <div class="w-100">
                  <input v-model="newComment" type="text" class="input_comment" placeholder="Comment of your..." @keyup.enter="addComment" />
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
const photo_name = ref();
const photo_url = ref();
const photoId = ref();
const desc = ref();
const baseUrl = import.meta.env.VITE_BASE_URL;
const userData = JSON.parse(localStorage.getItem('userData'));
const comments = ref();
const newComment = ref();
const convertTime = (time) => {
    moment.locale("vi");
    const commentTime = moment(time);
    const timeDiff = moment().diff(commentTime, "seconds");
    let timeDiffDisplay;
    if (timeDiff < 60) {
      timeDiffDisplay = `Vừa xong`;
    } else if (timeDiff < 3600) {
      timeDiffDisplay = `${Math.floor(timeDiff / 60)} phút trước`;
    } else if (timeDiff < 86400) {
      timeDiffDisplay = `${Math.floor(timeDiff / 3600)} giờ trước`;
    } else {
      timeDiffDisplay = commentTime.format("HH:mm:ss DD/MM/YYYY");
    }
    return timeDiffDisplay;
};

const convertWord = (word) => {
  return word.split(' ')[word.split(' ').length - 1][0];
};

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

const props = defineProps({
  currentPhoto: {
    type: Object,
  },
  user: {
    type: Object,
  } 
});

const setDefault = () => {
  photo_name.value = props?.currentPhoto?.name;
  photo_url.value = props?.currentPhoto?.img;
  desc.value = props?.currentPhoto?.description;
  photoId.value = props?.currentPhoto?._id;
};
watchEffect(setDefault);

const getComments = async () => {
    // setLoading(true);
    await axios
      .get(`/comment/${photoId.value}`)
      .then((res) => {
        comments.value = res.data.data;
        console.log(comments.value);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      })
      .finally(() => {
        // setLoading(false);
      });
};
watchEffect(getComments);


const addComment = async () => {
    const body = {
      user_id: userData._id,
      username: userData.username,
      fullname: userData.fullname,
      photo_id: photoId.value,
      description: newComment.value,
      time: new Date(),
    };
    console.log(body);
    await axios
      .post(`/comment`, body)
      .then((res) => {
        getComments();
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      })
      .finally(() => {
      });
  };


// const comments = ref([
//   {
//     id: 1,
//     user: "Name User",
//     initial: "C",
//     time: "1 day ago",
//     text: "Comment of user",
//     replies: []
//   }
// ]);

const activeReply = ref(null);
const replyText = ref("");
// const newComment = ref("");

const toggleReplyForm = (commentId) => {
  activeReply.value = activeReply.value === commentId ? null : commentId;
};

const submitReply = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId);
  console.log(comment);
  // if (comment && replyText.value.trim()) {
  //   comment.replies.push({
  //     id: Date.now(),
  //     user: "Reply User",
  //     initial: "R",
  //     time: "Just now",
  //     text: replyText.value
  //   });
  //   replyText.value = "";
  //   activeReply.value = null;
  // }
};

const handleAddReplyComment = async () => {
  // e.preventDefault();
  // setIsReply(false);
  const body = {
    user_id: userData._id,
    username: userData.username,
    fullname: userData.fullname,
    description: description,
    time: new Date(),
    reply_to: replyId,
  };
  await axios
    .post(`/reply`, body)
    .then((res) => {
      getReplyCommnent();
    })
    .catch((e) => {});
};

const getReplyCommnent = async () => {
    await axios
      .get(`/reply`)
      .then((res) => {
        
      })
      .catch((e) => {})
      .finally(() => {
        
      });
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
  