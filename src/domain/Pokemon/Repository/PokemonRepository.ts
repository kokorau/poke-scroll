import type { PokemonList } from "../Aggregate/PokemonList";

export interface PokemonRepository {
    fetch(offset: number, limit: number): Promise<PokemonList>;
}
