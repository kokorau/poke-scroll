<template>
  <div class="container" v-bind="containerProps">
    <div v-bind="wrapperProps">
      <div v-for="pokemon in list" :key="pokemon.id" class="item">
        <img :src="pokemon.data.imageUrl" :alt="pokemon.data.name" />
        <p>{{ pokemon.data.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import type {Pokemon} from "../domain/Pokemon/Entity/Pokemon.ts";
import {useInfiniteScroll, useVirtualList} from "@vueuse/core";
import {getPokemonList} from "../Application/Usecase/GetPokemonList.ts";

const pokemons = ref<Pokemon[]>([]);

const { wrapperProps, containerProps, list } = useVirtualList(
    pokemons,
    {
      itemHeight: () => 112,
      overscan: 3,
    },
)

const loadMorePokemons = async () => {
  const offset = pokemons.value.length;
  const { items } = await getPokemonList(offset, 30);
  pokemons.value = [...pokemons.value, ...items];
}

const onLoadMore = () => {
  if (pokemons.value.length >= 100) return
  loadMorePokemons();
}

useInfiniteScroll(containerProps.ref, onLoadMore, {
  offset: 50,
  throttle: 500,
  canLoadMore: () => pokemons.value.length < 100,
})

onMounted(async () => {
  pokemons.value = (await getPokemonList(0, 30)).items
});
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
  height: 112px;
  width: 208px;
}
</style>
