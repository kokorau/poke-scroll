<script setup lang="ts">
import PokemonListInfiniteScroll from "./components/PokemonListInfiniteScroll.vue";
import PokemonListVirtualList from "./components/PokemonListVirtualList.vue";
</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 16px;">
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>Infinite Scroll</div>
      <PokemonListInfiniteScroll/>
    </div>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>Virtual List</div>
      <PokemonListVirtualList/>
    </div>
  </div>
</template>
