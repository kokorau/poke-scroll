<template>
  <div class="container" v-bind="containerProps">
    <div v-bind="wrapperProps">
      <div v-for="pokemon in list" :key="pokemon.data.id" class="item" :style="{ height: `${ITEM_HEIGHT}px` }">
        <img :src="pokemon.data.imageUrl" :alt="pokemon.data.name" />
        <p>{{ pokemon.data.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import type {Pokemon} from "../domain/Pokemon/Entity/Pokemon.ts";
import {useInfiniteScroll, useVirtualList} from "@vueuse/core";
import {getPokemonList} from "../Application/Usecase/GetPokemonList.ts";

const GET_LIMIT = 30;
const TOTAL_POKEMON_COUNT = 300;
const ITEM_HEIGHT = 112;

const pokemons = ref<Pokemon[]>([]);

const { wrapperProps, containerProps, list } = useVirtualList(
    pokemons,
    {
      itemHeight: () => 112,
      overscan: 3,
    },
)

const cachePokemons: Pokemon[] = []
const loadMorePokemons = async (): Promise<void> => {
  const offset = pokemons.value.length;
  const { items } = await getPokemonList(offset, GET_LIMIT);
  cachePokemons.push(...items);
  pokemons.value = cachePokemons.slice(); // 参照切りして更新
}

const isLoading = ref<boolean>(false)
const onLoadMore = async () => {
  if (isLoading.value) return;
  try {
    isLoading.value = true;
    await loadMorePokemons();
  } finally {
    isLoading.value = false;
  }
}

useInfiniteScroll(containerProps.ref, onLoadMore, {
  offset: { bottom: 400 },
  canLoadMore: () => pokemons.value.length !== 0 && pokemons.value.length < TOTAL_POKEMON_COUNT
})

onMounted(loadMorePokemons)
</script>

<style scoped>
.container {
  height: 80vh;
  overflow-y: auto;
  padding: 16px;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  width: 208px;
}
</style>
