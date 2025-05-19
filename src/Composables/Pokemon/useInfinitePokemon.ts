import {getPokemonList} from "../../Application/Usecase/GetPokemonList.ts";
import type {Pokemon} from "../../domain/Pokemon/Entity/Pokemon.ts";
import {useInfiniteScroll} from "@vueuse/core";
import {ref, type Ref} from "vue";

export function useInfinitePokemon(containerEl: Ref<HTMLElement | null>) {
    const offset = ref(0);
    const limit = 20;
    const pokemons = ref<Pokemon[]>([]);
    const loading = ref(false);
    const hasMore = ref(true);

    const loadMore = async () => {
        if (loading.value || !hasMore.value) return;
        loading.value = true;

        try {
            const list = await getPokemonList(offset.value, limit);
            pokemons.value.push(...list.items);
            offset.value += limit;

            if (list.items.length < limit) hasMore.value = false;
        } catch (error) {
            console.error('Error loading pokemon:', error);
        } finally {
            loading.value = false;
        }
    };

    useInfiniteScroll(containerEl, loadMore, { 
        distance: 200,
        throttle: 500 
    });

    return {
        pokemons,
        loading,
        hasMore,
        loadMore,
    };
}
