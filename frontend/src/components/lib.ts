import { getPokemon } from "./http";

export type PokemonInfo = {
    [gender: string]: {
        [form: string]: string[];
    };
};

export function infoToSprites(pokemon: string, info: PokemonInfo): string[] {
    const out = [];
    for (const gender in info) {
        for (const form in info[gender]) {
            for (const variation of info[gender][form]) {
                out.push(`assets/sprites/${pokemon}/${gender}/${form}/${variation}`);
            }
        }
    }
    return out;
}

export async function getDefaultSprite(pokemon: string): Promise<string> {
    const info = await getPokemon(pokemon);
    if (!info) return "";
    const gender = Object.keys(info)[0];
    const form = Object.keys(info[gender])[0];
    const variation = info[gender][form][0];
    console.log(`assets/sprites/${pokemon}/${gender}/${form}/${variation}`);
    return `assets/sprites/${pokemon}/${gender}/${form}/${variation}`;
}

export function toBallSprite(ball: string): string {
    return `assets/pokeballs/${ball}`;
}
