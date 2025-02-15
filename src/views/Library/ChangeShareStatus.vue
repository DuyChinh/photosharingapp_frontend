<template lang="">
    <div class="modal fade" id="changeShareStatus" aria-hidden="true" aria-labelledby="shareStatusLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="shareStatusLabel">
                        <i class="fas fa-exclamation-triangle text-danger"></i>Change Share Status Photo
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to change the share status of this photo?
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleChangeShareStatus">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, defineProps, watchEffect, defineEmits } from 'vue';
import { toast } from 'vue3-toastify';
import axios from '../../plugins/axios';
const token = localStorage.getItem('token');
const props = defineProps({
    photos: {
        type: Array,
    },
    photoId: {
        type: String,
    },
    shareStatus: {
        type: String,
    },
    fetchPhotos: {
        type: Function,
    }
});

const emit = defineEmits(['photos']);

const handleChangeShareStatus = async() => {
    const changePhotos =  await props.photos.map((photo) => {
        if (photo._id === props.photoId) {
            photo.share_status = photo.share_status === 'private' ? 'public' : 'private';
        }
        return photo;
    }); 
    emit('photos', changePhotos);
    await axios.patch(`/photos/share_status/${props.photoId}`, {
        share_status: props.shareStatus,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then((res) => {
        // toast.success(res.data.message);
        // props.fetchPhotos();
    })
    .catch((e) => {
        // toast.error(e.response?.data?.message);
    });
}

</script>
<style lang="css">

</style>