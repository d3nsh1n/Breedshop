<template>
    <core />
    <!-- <placeholder></placeholder> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Core from "./components/Core.vue";
import Placeholder from "./components/Placeholder.vue";

export default defineComponent({
    name: "App",
    components: {
        Core,
        // Placeholder,
    },
    mounted() {
        document.title = "Void Breedshop";
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
