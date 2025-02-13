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
                            <input type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" v-model="username" readonly>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-person-fill-lock text-primary"></i></span>
                            <input type="text" class="form-control" placeholder="Full name" aria-label="Full name" aria-describedby="basic-addon1" v-model="fullname">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-calendar2-week-fill text-info"></i></span>
                            <input type="text" class="form-control" placeholder="Birthday 01/01/2025" aria-label="Birthday" aria-describedby="basic-addon1" v-model="birthday">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-telephone-fill text-danger"></i></span>
                            <input type="number" class="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon1" v-model="phone">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-geo-alt-fill text-success"></i></span>
                            <input type="text" class="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" v-model="address">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleChangeInfo">Save changes</button>
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
import { defineProps, ref, watch, defineEmits, watchEffect } from 'vue'
import axios from '../../plugins/axios';
import { toast } from 'vue3-toastify'
const userData = JSON.parse(localStorage.getItem('userData'));
import moment from 'moment';
const token = localStorage.getItem('token');
const username = ref();
const fullname = ref();
const birthday = ref();
const phone = ref();
const address = ref();
const loading = ref(false);


const props = defineProps(
    {
        isChangeInfo: {
            type: Boolean,
        },
        user: {
            type: Object,
        },
        getUser: {
            type: Function,
        }
    }
)
const emit = defineEmits(['changeInfo'])

const setDefault = () => {
    // console.log(props.user);
    username.value = props.user?.username;
    fullname.value = props.user?.fullname;
    birthday.value = moment(props.user?.dob).format("DD/MM/YYYY");
    phone.value = props.user?.phone;
    address.value = props.user?.address;
}
watchEffect(setDefault);

const handleChangeInfo = async () => {
//   loading.value = true;
    const updateData = {
        username: username.value,
        fullname: fullname.value,
        dob: birthday.value,
        phone: phone.value,
        address: address.value,
    };
  
    await axios.patch(`/users/${props.user?._id}`, updateData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        // emit('changeInfo', res.data.data);
        toast.success(res.data.message);
        props.getUser();
    })
    .catch((e) => {
        toast.error(e.response?.data?.message || 'update failed!Please try again!');
    }).finally(() => {
        // loading.value = false;
    });
    
};

</script>

<style lang="css">
    
</style>