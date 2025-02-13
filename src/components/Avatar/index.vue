<template lang="">
    <div class="avatar_block text-center" :style="{ backgroundColor: assignedColor }">
        {{props.word}}
    </div>
</template>
<script setup>
import { defineProps, ref, watch, defineEmits, computed } from 'vue'
const props = defineProps(
{
    word: {
        // type: String,
        // required: true,
    }
}
)

const colorMap = {
    A: "#ff5733",
    B: "#ff33a8",
    C: "#3357ff",
    D: "#F9CB43",
    E: "#33ccff",
    F: "#a833ff",
    G: "#ff338f",
    H: "#ff5733",
    I: "#33ff57",
    J: "#3399ff",
    K: "#ff9933",
    L: "#66ff33",
    M: "#9933ff",
    N: "#ff3366",
    O: "#33ffff",
    P: "#ff6633",
    Q: "#9933cc",
    R: "#ffcc00",
    S: "#66ccff",
    T: "#cc33ff",
    U: "#ff3300",
    V: "#00ff99",
    W: "#9966ff",
    X: "#ff0099",
    Y: "#ff6600",
    Z: "#0099ff"
};

const assignedColor = computed(() => colorMap[props.word] || "#888888");

// watch(props, ()=> {
//     console.log(props);
// })


</script>
<style lang="css">
.avatar_block {
    width: 45px;
    height: 45px;
    /* background-color: aqua; */
    line-height: 45px;
    border-radius: 50%;
}
</style>