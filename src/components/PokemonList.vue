<template>
  <div ref="container">
    <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon">
      <img :src="pokemon.imageUrl" :alt="pokemon.name" />
      <p>{{ pokemon.name }}</p>
    </div>
    <p v-if="loading">Loading...</p>
    <p v-else-if="!hasMore">No more data</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {useInfinitePokemon} from "../Composables/Pokemon/useInfinitePokemon.ts";

const container = ref<HTMLElement | null>(null);
const { pokemons, loading, hasMore } = useInfinitePokemon(container);
</script>

<style scoped>
.pokemon {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
}
</style>
