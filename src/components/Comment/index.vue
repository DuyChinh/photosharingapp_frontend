<template>
    <div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-success" id="exampleModalLabel">Name Img</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="overflow: hidden; overflow-y:scroll;">
                <img src="../../../public/images/family01.jpg" class="image w-100 mb-3 rounded-1"/>
              <div class="list_comment">
                <div class="list_comment_item d-flex gap-3" v-for="comment in comments" :key="comment.id">
                  <div>
                    <Avatar :word="comment.initial" style="width: 35px; height: 35px; line-height: 35px; color: #fff;"/>
                  </div>
                  <div class="w-100">
                    <div class="w-100 d-flex justify-content-between align-items-center">
                      <p class="fw-bold">{{ comment.user }}</p>
                      <p class="">{{ comment.time }}</p>
                    </div>
                    <p>{{ comment.text }}</p>
  
                    <div class="reply_section">
                      <button class="btn btn-link text-primary" @click="toggleReplyForm(comment.id)">Reply</button>
                      <div v-if="activeReply === comment.id" class="reply_form d-flex gap-2">
                        <input v-model="replyText" class="form-control" placeholder="Write a reply..."></input>
                        <button class="btn btn-primary" @click="submitReply(comment.id)"><i class="bi bi-send-fill"></i></button>
                      </div>
                      
                      <!-- List of replies -->
                      <div class="reply_list mt-2" v-if="comment.replies.length">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="card_comment d-flex flex-row align-items-center gap-2 py-2 px-3">
                <div>
                  <Avatar word="C" style="width: 35px; height: 35px; line-height: 35px; color: #fff;"/>
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
  import { ref } from 'vue';
  import Avatar from '../../components/Avatar/index.vue';
  
  const comments = ref([
    {
      id: 1,
      user: "Name User",
      initial: "C",
      time: "1 day ago",
      text: "Comment of user",
      replies: []
    }
  ]);
  
  const activeReply = ref(null);
  const replyText = ref("");
  const newComment = ref("");
  
  const toggleReplyForm = (commentId) => {
    activeReply.value = activeReply.value === commentId ? null : commentId;
  };
  
  const submitReply = (commentId) => {
    const comment = comments.value.find(c => c.id === commentId);
    if (comment && replyText.value.trim()) {
      comment.replies.push({
        id: Date.now(),
        user: "Reply User",
        initial: "R",
        time: "Just now",
        text: replyText.value
      });
      replyText.value = "";
      activeReply.value = null;
    }
  };
  
  const addComment = () => {
    if (newComment.value.trim()) {
      comments.value.push({
        id: Date.now(),
        user: "New User",
        initial: "N",
        time: "Just now",
        text: newComment.value,
        replies: []
      });
      newComment.value = "";
    }
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
  