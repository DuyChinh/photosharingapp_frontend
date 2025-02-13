<template>
    <div class="comment">
      <!-- <p class="fw-bold d-flex align-items-center gap-2"><Avatar :word="convertWord(comment.fullname)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;"/> {{ comment.fullname }}</p>
      <p>{{ comment.description }}</p> -->
        <div class="list_comment_item d-flex gap-1 mt-2">
            <div>
                <Avatar :word="convertWord(comment.fullname)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;" />
            </div>
            <div class="w-100">
                <div class="w-100 d-flex justify-content-between align-items-center">
                    <p class="fw-bold">{{ comment.fullname }}</p>
                    <p class="text-success">{{ convertTime(comment.time) }}</p>
                </div>
                <p>{{ comment.description }}</p>
            </div>
        </div>
  
        <button class="btn btn-link text-primary" @click="toggleReplyForm">Reply</button>
        <button class="btn btn-link text-danger" @click="likeComment">❤️ {{ comment.likes?.length || 0 }}</button>
    
        <div v-if="showReplyForm" class="d-flex align-items-center gap-2">
            <input v-model="replyText" class="form-control" placeholder="Viết phản hồi..." />
            <button class="btn btn-primary" @click="submitReply">
                <i class="bi bi-send-fill"></i>
            </button>
        </div>
  
        <div class="reply_list mt-2 ms-4" v-if="comment.replies?.length">
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
import Avatar from "../../components/Avatar/index.vue";
import moment from "moment";  
const props = defineProps({
    comment: {
        type: Object,
        required: true
    }
});
  
const emit = defineEmits(["reply", "like"]);

const convertWord = (word) => {
    const arr = word?.split(" ");
    if(arr.length > 0) {
        return arr[arr.length - 1][0];
    }
    return "";
};

const convertTime = (time) => moment(time).fromNow();
  
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
  