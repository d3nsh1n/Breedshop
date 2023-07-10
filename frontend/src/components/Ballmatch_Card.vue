<template>
    <v-card max-width="180" elevation="5" @click="close">
        <v-card-text>
            <v-row justify="center">
                <div class="image-container">
                    <img :src="ballSource" class="background-pokeball" />
                    <img :src="'assets/pokeballs/black.png'" class="overlay-black" />
                    <img v-if="spriteSource != ''" :src="spriteSource" alt="Pokemon Sprite" class="overlay-sprite" />
                </div>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        spriteSource: {
            type: String as PropType<string>,
            required: true,
        },
        ballSource: {
            type: String as PropType<string>,
            required: true,
        },
    },
    methods: {
        close() {
            this.$emit("clicked");
        },
    },
});
</script>

<style>
:root {
    --ball-size: 10rem;

    --black-factor: 1.1;
    --black-offset: 0.067;

    --sprite-factor: 0.755;
    --sprite-offset-Y: 0.02;
    --sprite-offset-X: 0.13;
}
.image-container {
    position: relative;
}

.background-pokeball {
    position: relative;
    z-index: 1;
    object-fit: cover;
    width: var(--ball-size);
}

.overlay-black {
    position: absolute;
    top: calc(var(--ball-size) * var(--black-offset) * -1);
    left: calc(var(--ball-size) * var(--black-offset) * -1);
    z-index: 2;
    object-fit: cover;
    width: calc(var(--ball-size) * var(--black-factor));
}
.overlay-sprite {
    position: absolute;
    top: calc(var(--ball-size) * var(--sprite-offset-Y));
    left: calc(var(--ball-size) * var(--sprite-offset-X));
    z-index: 3;
    object-fit: cover;
    width: calc(var(--ball-size) * var(--sprite-factor));
}
</style>
