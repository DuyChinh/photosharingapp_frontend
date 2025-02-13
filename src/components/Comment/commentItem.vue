<template>
    <div class="comment">
        <div class="list_comment_item d-flex gap-2 mt-2">
            <div>
                <Avatar :word="convertWord(comment.fullname)" style="width: 35px; height: 35px; line-height: 35px; color: #fff;" />
            </div>
            <div class="w-100">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="fw-bold">{{ comment.fullname }}</p>
                    <p class="text-success">{{ convertTime(comment.time) }}</p>
                </div>
                <p>{{ comment.description }}</p>
                
                <div class="d-flex align-items-center gap-3">
                    <button class="btn btn-link text-primary p-0" @click="toggleReplyForm">Reply</button>
                    <button class="btn btn-link text-danger p-0" @click="likeComment">
                        ❤️ {{ comment.likes?.length || 0 }}
                    </button>
                    <button class="btn btn-link text-danger p-0" @click="deleteComment">🗑 Xóa</button>
                </div>
                
                <div v-if="showReplyForm" class="d-flex align-items-center gap-2 mt-2">
                    <input v-model="replyText" class="form-control" placeholder="Write reply..." />
                    <button class="btn btn-primary" @click="submitReply">
                        <i class="bi bi-send-fill"></i>
                    </button>
                </div>

                <!-- Hiển thị danh sách phản hồi -->
                <div class="reply_list mt-2 ms-4" v-if="comment.replies?.length">
                    <button class="btn btn-link p-0" @click="toggleShowReplies">
                        {{ showReplies ? 'Collapse' : `View more (${comment.replies.length})` }}
                    </button>
                    
                    <div v-if="showReplies">
                        <CommentItem v-for="reply in comment.replies" 
                                    :key="reply._id" 
                                    :comment="reply"
                                    @reply="$emit('reply', $event)"
                                    @like="$emit('like', reply._id)"
                                    @delete="$emit('delete', reply._id)" />
                    </div>
                </div>
            </div>
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

const emit = defineEmits(["reply", "like", "delete"]);

const showReplyForm = ref(false);
const replyText = ref("");
const showReplies = ref(false);

const toggleReplyForm = () => {
    showReplyForm.value = !showReplyForm.value;
};

const submitReply = () => {
    if (!replyText.value.trim()) return;
    emit("reply", { commentId: props.comment._id, replyText: replyText.value.trim() });
    replyText.value = "";
    showReplyForm.value = false;
};

const likeComment = () => {
    emit("like", props.comment._id);
};

const deleteComment = () => {
    emit("delete", props.comment._id);
};

const toggleShowReplies = () => {
    showReplies.value = !showReplies.value;
};

const convertTime = (time) => moment(time).fromNow();

const convertWord = (word) => {
    if (word?.length > 0) {
        const arr = word.split(" ");
        return arr.length > 0 ? arr[arr.length - 1][0] : "";
    }
    return "";
};
</script>

<style scoped>
.comment {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}
.btn-link {
    text-decoration: none;
    font-size: 14px;
}
</style>
