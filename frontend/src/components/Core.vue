<template>
    <div class="fullscreen-image">
        <img :src="imageSrc" alt="Void - LimitlessMC" />
    </div>
</template>

<script>
import VoidKnot from "@/assets/images/void_dknot.webp";
const Core = {
    data() {
        return {
            imageSrc: VoidKnot, // Replace with your image source
        };
    },
};

export default Core;
</script>

<style scoped>
.fullscreen-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(#e66465, #9198e5);
}
.fullscreen-image img {
    width: 100%;
    height: 100%;
    object-fit: cover !important;
}
</style>
