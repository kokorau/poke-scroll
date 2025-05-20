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
import {useVirtualList} from "@vueuse/core";
import {getPokemonList} from "../Application/Usecase/GetPokemonList.ts";

const pokemons = ref<Pokemon[]>([
  {
    "name":"bulbasaur",
    "url":"https://pokeapi.co/api/v2/pokemon/1/",
    "id":1,
    "imageUrl":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  }
]);

const { wrapperProps, containerProps, list } = useVirtualList(
    pokemons,
    {
      itemHeight: () => 112,
      overscan: 3,
    },
)

onMounted(async () => {
  pokemons.value = (await getPokemonList(0, 100)).items
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
