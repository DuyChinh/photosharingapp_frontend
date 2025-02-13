<template>
    <svg
        class="pl"
        viewBox="0 0 64 64"
        width="64px"
        height="64px"
        role="img"
        aria-label="5-point star slowly rotating clockwise"
    >
        <g class="pl__star" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round" stroke-dasharray="0.1 190.88" stroke-dashoffset="0">
            <path class="pl__worm" stroke="hsl(0, 10%, 90%)"
                d="M 31.94 3.191 L 40.388 20.309 L 59.279 23.054 L 45.61 36.379 L 48.836 55.193 L 31.94 46.31 L 15.044 55.193 L 18.27 36.379 L 4.601 23.054 L 23.492 20.309 Z"
                transform="rotate(0,32,32)" />
            <path class="pl__worm" stroke="hsl(133, 90%, 40%)"
                d="M 31.94 3.191 L 40.388 20.309 L 59.279 23.054 L 45.61 36.379 L 48.836 55.193 L 31.94 46.31 L 15.044 55.193 L 18.27 36.379 L 4.601 23.054 L 23.492 20.309 Z"
                transform="rotate(72,32,32)" />
            <path class="pl__worm" stroke="hsl(133, 90%, 60%)"
                d="M 31.94 3.191 L 40.388 20.309 L 59.279 23.054 L 45.61 36.379 L 48.836 55.193 L 31.94 46.31 L 15.044 55.193 L 18.27 36.379 L 4.601 23.054 L 23.492 20.309 Z"
                transform="rotate(144,32,32)" />
            <path class="pl__worm" stroke="hsl(3, 90%, 60%)"
                d="M 31.94 3.191 L 40.388 20.309 L 59.279 23.054 L 45.61 36.379 L 48.836 55.193 L 31.94 46.31 L 15.044 55.193 L 18.27 36.379 L 4.601 23.054 L 23.492 20.309 Z"
                transform="rotate(216,32,32)" />
            <path class="pl__worm" stroke="hsl(3, 90%, 40%)"
                d="M 31.94 3.191 L 40.388 20.309 L 59.279 23.054 L 45.61 36.379 L 48.836 55.193 L 31.94 46.31 L 15.044 55.193 L 18.27 36.379 L 4.601 23.054 L 23.492 20.309 Z"
                transform="rotate(288,32,32)" />
        </g>
    </svg>
</template>

<style scoped>

@keyframes spin {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(1turn);
    }
}

@keyframes worm-length {
    0% {
        stroke-dasharray: 0.1 190.88;
    }
    50% {
        stroke-dasharray: 28.632 162.248;
    }
    100% {
        stroke-dasharray: 0.1 190.88;
    }
}

@keyframes worm-move {
    0% {
        stroke-dashoffset: 0;
    }
    100% {
        stroke-dashoffset: -190.88;
    }
}

/* Loader Styles */
.pl {
    display: block;
    margin: auto;
    width: 64px;
    height: 64px;
}

.pl__star {
    animation: spin 10s linear infinite;
    transform-origin: 32px 32px;
}

.pl__worm {
    animation: worm-length 2s infinite alternate, worm-move 5s linear infinite;
}
</style>
