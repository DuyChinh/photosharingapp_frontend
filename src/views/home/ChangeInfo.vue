<template lang="">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-success" id="exampleModalLabel"> <i class="bi bi-pencil-square text-warning"></i> Change Info</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="input-group mb-3">
                            <span class="input-group-text text-warning" id="basic-addon1">@</span>
                            <input type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-person-fill-lock text-primary"></i></span>
                            <input type="text" class="form-control" placeholder="Full name" aria-label="Full name" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-calendar2-week-fill text-info"></i></span>
                            <input type="text" class="form-control" placeholder="Birthday" aria-label="Birthday" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-telephone-fill text-danger"></i></span>
                            <input type="text" class="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-geo-alt-fill text-success"></i></span>
                            <input type="text" class="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
        <!-- <div class="d-flex justify-content-center">
            <div
                class="border rounded"
                data-coreui-locale="en-US"
                data-coreui-start-date="2024/02/13"
                data-coreui-toggle="calendar"
            ></div>
        </div> -->
</template>

<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'
const props = defineProps(
    {
        isChangeInfo: {
            type: Boolean,
        }
    }
)
const emit = defineEmits(['changeInfo'])

watch(props,() => {
    console.log(props.isChangeInfo);
})
// console.log(props.isChangeInfo);


</script>

<style lang="css">
    
</style>