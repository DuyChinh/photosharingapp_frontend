<template lang="">
    <div class="avatar_block text-center bg-warning">
        {{props.word}}
    </div>
</template>
<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'
const props = defineProps(
{
    word: {
        type: String,
        required: true,
    }
}
)

watch(props, ()=> {
    console.log(props);
})


</script>
<style lang="css">
.avatar_block {
    width: 45px;
    height: 45px;
    background-color: aqua;
    line-height: 45px;
    border-radius: 50%;
}
</style>