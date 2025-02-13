<template lang="">
    <div class="modal fade" id="deleteModal" aria-hidden="true" aria-labelledby="deleteModalLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="deleteModalLabel">
                        <i class="fas fa-exclamation-triangle text-danger"></i> Delete Photo
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete this photo?
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleDeletePhoto">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, defineProps, watchEffect } from 'vue';
import { toast } from 'vue3-toastify';
import axios from '../../plugins/axios';
const props = defineProps({
    photoId: {
        type: String,
    },
    fetchPhotos: {
        type: Function,
    }
});

const handleDeletePhoto = async () => {
    await axios.delete(`/photos/${props.photoId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then((res) => {
        toast.success(res.data.message);
        props.fetchPhotos();
    })
    .catch((e) => {
        toast.error(e.response?.data?.message);
    });
}

</script>
<style lang="css">

</style>