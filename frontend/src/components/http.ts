import ky from "ky";
import { PokemonInfo } from "./lib";

export const development = process.env.NODE_ENV === "development";
const host = development ? "localhost" : location.hostname;
const port = development ? 3000 : location.port;
const url = `http://${host}:${port}`;

export async function getPokeballs() {
    const res = await ky.get(`${url}/pokeballs`).json();
    return res as string[];
}
export async function getPokemonList() {
    const res = await ky.get(`${url}/pokemon_list`).json();
    return res as string[];
}
export async function getPokemon(pokemon: string) {
    const res = await ky.get(`${url}/pokemon?species=${pokemon}`).json();
    return res as PokemonInfo;
}
