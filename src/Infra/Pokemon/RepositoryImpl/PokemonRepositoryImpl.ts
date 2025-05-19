import type {PokemonRepository} from "../../../domain/Pokemon/Repository/PokemonRepository.ts";
import {$Pokemon} from "../../../domain/Pokemon/Entity/Pokemon.ts";
import {$PokemonList} from "../../../domain/Pokemon/Aggregate/PokemonList.ts";

export const PokemonRepositoryImpl: PokemonRepository = {
    async fetch(offset: number, limit: number) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const json = await res.json();

        const pokemons = json.results.map((item: any) => $Pokemon.create(item));
        return $PokemonList.create(pokemons);
    },
};