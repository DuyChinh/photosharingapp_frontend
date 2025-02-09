<template lang="">
    <div class="avatar_block">
        {{props.word}}
    </div>
</template>
<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'
const props = defineProps(
    {
        word: {
            type: String,
        }
    }
)
</script>
<style lang="">
    
</style>