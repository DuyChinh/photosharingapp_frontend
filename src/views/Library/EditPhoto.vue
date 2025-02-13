<template lang="">
    <div class="modal fade" id="editPhotoModal" aria-hidden="true" aria-labelledby="editPhotoLable" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="editPhotoLable">
                        <i class="bi bi-pencil-fill"></i> Edit Photo
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="photo-name" class="col-form-label">Photo name:</label>
                            <input type="text" class="form-control" id="photo-name" v-model="photoName" placeholder="beautiful scene... "/>   
                        </div> 
                        <div class="mb-3">
                            <label for="photo-des" class="col-form-label">Photo description:</label>
                            <textarea class="form-control" id="photo-des" v-model="desc" placeholder="this is beatiful scene..."></textarea>   
                        </div>
                        <div class="mb-3">
                            <label for="share-status" class="col-form-label">Share photo:</label>
                            <select class="form-select" aria-label="Default select example" id="share-status" v-model="shareStatus">
                                <option value="public">public</option>
                                <option value="private">private</option>
                            </select>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleEditPhoto">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, watchEffect, defineProps } from 'vue';
const photoName = ref('');
const desc = ref('');
const shareStatus = ref('public');
import { toast } from 'vue3-toastify';
import axios from '../../plugins/axios';
const loading = ref(false);
const token = localStorage.getItem('token');
const props = defineProps({
    photoId: {
        type: String,
        // required: true,
    },
    currentPhoto: {
        type: Object,
    },
    fetchPhotos: {
        type: Function,
    }  
});

const setDefault = () => {
    photoName.value = props?.currentPhoto?.name;
    desc.value = props?.currentPhoto?.description;
    shareStatus.value = props?.currentPhoto?.share_status;
}
watchEffect(setDefault);

const handleEditPhoto = () => {
    // loading.value = true;
    const updateData = {
        name: photoName?.value,
        description: desc?.value,
        share_status: shareStatus?.value,
    };
    axios.patch(`/photos/${props.photoId}`, updateData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        toast.success(res.data.message);
        props.fetchPhotos();
    })
    .catch((e) => {
        toast.error(e.response?.data?.message);
    }).finally(() => {
        // loading.value = false;
    });
}

</script>
<style lang="css">
    
</style>