import type {Pokemon} from "../Entity/Pokemon.ts";

export interface PokemonList {
    readonly items: Pokemon[];
}

export const $PokemonList = {
    create: (items: Pokemon[]): PokemonList => ({
        items,
    }),
    append: (prev: PokemonList, next: Pokemon[]): PokemonList => ({
        items: [...prev.items, ...next],
    }),
};
