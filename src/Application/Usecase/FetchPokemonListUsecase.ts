import type {PokemonRepository} from "../../domain/Pokemon/Repository/PokemonRepository.ts";
import PokemonList from "../../components/PokemonList.vue";

export const FetchPokemonListUsecase = (repo: PokemonRepository) => ({
    execute(offset: number, limit: number): Promise<PokemonList> {
        return repo.fetch(offset, limit);
    },
});
