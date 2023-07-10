<template>
    <v-row justify="center" class="mx-10">
        <v-col cols="5" align="center">
            <v-autocomplete label="Select Pokemon" :items="pokemonList" v-model="selectedPokemon" color="blue-grey-lighten-2" item-title="name" item-value="name">
                <template v-slot:selection="{ item }">
                    {{ item.raw ? formatName(item.raw) : "" }}
                </template>
                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :title="formatName(item.raw)"></v-list-item>
                </template>
            </v-autocomplete>
        </v-col>
        <v-col>
            <v-row>
                <v-col v-if="genderList.length > 1" align="center">
                    <v-card flat max-width="150">
                        <v-select label="Gender" :items="genderList" v-model="selectedGender"></v-select>
                    </v-card>
                </v-col>
                <v-col v-if="formList.length > 1" align="center">
                    <v-card flat max-width="150">
                        <v-select label="Form" :items="formList" v-model="selectedForm"></v-select>
                    </v-card>
                </v-col>
                <v-col v-if="variationList.length > 1" align="center">
                    <v-card flat max-width="150">
                        <v-select label="Variation" :items="variationList" v-model="selectedVariation"></v-select>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="6"> </v-col>
    </v-row>
    <v-row justify="end">
        <v-btn :style="`visibility: ${hiddenBalls.length > 0 ? 'visible' : 'hidden'}`" class="mx-15 mb-4 mt-0" @click="hiddenBalls = []">Reset</v-btn>
    </v-row>
    <v-row justify="center">
        <div v-for="ball in ballList" :key="ball">
            <v-col v-if="!hiddenBalls.includes(ball)">
                <Ballmatch_Card :ballSource="toBallSprite(ball)" :spriteSource="selectedSprite" @clicked="hide(ball)"></Ballmatch_Card>
            </v-col>
        </div>
    </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Ballmatch_Card from "./Ballmatch_Card.vue";
import ky from "ky";
import { getPokeballs, getPokemon, getPokemonList } from "./http";
import { PokemonInfo, infoToSprites, getDefaultSprite, toBallSprite } from "./lib";

export default defineComponent({
    components: {
        Ballmatch_Card,
    },
    data() {
        return {
            selectedInfo: {} as PokemonInfo,

            selectedPokemon: "",
            pokemonList: [] as string[],

            selectedGender: "",
            genderList: [] as string[],

            selectedForm: "",
            // formList: [] as string[],

            selectedVariation: "",
            // variationList: [] as string[],

            ballList: [] as string[],
            toBallSprite,

            hiddenBalls: [] as string[],
        };
    },
    computed: {
        selectedSpecies(): string {
            return this.selectedPokemon;
        },
        selectedSprite(): string {
            if (this.selectedSpecies && this.selectedGender && this.selectedForm && this.selectedVariation) {
                return `assets/sprites/${this.selectedSpecies}/${this.selectedGender}/${this.selectedForm}/${this.selectedVariation}`;
            } else {
                return "";
            }
        },
        formList(): string[] {
            return this.selectedGender ? Object.keys(this.selectedInfo[this.selectedGender]) : [];
        },
        variationList(): string[] {
            return this.selectedForm ? this.selectedInfo[this.selectedGender][this.selectedForm] : [];
        },
    },
    watch: {
        async selectedPokemon(n) {
            this.reset();
            if (!n) {
                return;
            }

            const info = await getPokemon(this.selectedPokemon);
            if (!info) return;
            this.selectedInfo = info;
            this.genderList = Object.keys(this.selectedInfo);
            if (this.genderList.length >= 1) this.selectedGender = this.genderList[0];

            this.formList = this.selectedGender ? Object.keys(this.selectedInfo[this.selectedGender]) : [];
            if (this.formList.length >= 1) this.selectedForm = this.formList[0];

            this.variationList = this.selectedForm ? this.selectedInfo[this.selectedGender][this.selectedForm] : [];
            if (this.variationList.length >= 1) this.selectedVariation = this.variationList[0];
        },
    },
    methods: {
        hide(ball: string) {
            if (this.selectedSprite) this.hiddenBalls.push(ball);
        },
        formatName(str: string): string {
            return this.capitalize(str.split("_")[1]);
        },
        capitalize(str: string): string {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        reset() {
            this.selectedSpecies = "";
            this.selectedGender = "";
            this.genderList = [];
            this.selectedForm = "";
            this.formList = [];
            this.selectedVariation = "";
            this.variationList = [];
        },
    },
    async mounted() {
        this.pokemonList = await getPokemonList();
        this.ballList = await getPokeballs();
    },
});
</script>
