import {PokemonRepositoryImpl} from "../../Infra/Pokemon/RepositoryImpl/PokemonRepositoryImpl.ts";
import {FetchPokemonListUsecase} from "../../Application/Usecase/FetchPokemonListUsecase.ts";
import type {Pokemon} from "../../domain/Pokemon/Entity/Pokemon.ts";
import {useInfiniteScroll} from "@vueuse/core";
import {ref} from "vue";

const repo = PokemonRepositoryImpl;
const usecase = FetchPokemonListUsecase(repo);

export function useInfinitePokemon(containerEl: Ref<HTMLElement | null>) {
    const offset = ref(0);
    const limit = 20;
    const pokemons = ref<Pokemon[]>([]);
    const loading = ref(false);
    const hasMore = ref(true);

    const loadMore = async () => {
        if (loading.value || !hasMore.value) return;
        loading.value = true;

        const list = await usecase.execute(offset.value, limit);
        pokemons.value.push(...list.items);
        offset.value += limit;

        if (list.items.length < limit) hasMore.value = false;

        loading.value = false;
    };

    useInfiniteScroll(containerEl, loadMore, { distance: 300 });

    return {
        pokemons,
        loading,
        hasMore,
        loadMore,
    };
}