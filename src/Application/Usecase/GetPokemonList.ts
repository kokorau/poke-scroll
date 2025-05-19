import type {PokemonRepository} from "../../domain/Pokemon/Repository/PokemonRepository.ts";
import {PokemonRepositoryImpl} from "../../Infra/Pokemon/RepositoryImpl/PokemonRepositoryImpl.ts";

export const getPokemonList = (offset: number, limit: number, repo: PokemonRepository = PokemonRepositoryImpl) => {
    return repo.fetch(offset, limit)
};
