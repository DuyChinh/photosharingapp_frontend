<template>
    <div class="comment">
      <p class="fw-bold">{{ comment.fullname }}</p>
      <p>{{ comment.description }}</p>
  
      <button class="btn btn-link text-primary" @click="toggleReplyForm">Reply</button>
      <button class="btn btn-link text-danger" @click="likeComment">❤️ {{ comment.likes?.length || 0 }}</button>
  
      <div v-if="showReplyForm">
        <input v-model="replyText" class="form-control" placeholder="Viết phản hồi..." />
        <button class="btn btn-primary" @click="submitReply">
          <i class="bi bi-send-fill"></i>
        </button>
      </div>
  
      <!-- Đệ quy hiển thị reply -->
      <div class="reply_list mt-2" v-if="comment.replies?.length">
        <CommentItem v-for="reply in comment.replies" 
                     :key="reply._id" 
                     :comment="reply"
                     @reply="$emit('reply', $event)"
                     @like="$emit('like', reply._id)" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    comment: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(["reply", "like"]);
  
  const showReplyForm = ref(false);
  const replyText = ref("");
  
  const toggleReplyForm = () => {
    showReplyForm.value = !showReplyForm.value;
  };
  
  const submitReply = () => {
    emit("reply", { commentId: props.comment._id, replyText: replyText.value });
    replyText.value = "";
    showReplyForm.value = false;
  };
  
  const likeComment = () => {
    emit("like", props.comment._id);
  };
  </script>
  