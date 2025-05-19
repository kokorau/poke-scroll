import type { PokemonList } from "../aggregate/PokemonList";

export interface PokemonRepository {
    fetch(offset: number, limit: number): Promise<PokemonList>;
}
