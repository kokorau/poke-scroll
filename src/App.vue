<script setup lang="ts">
import PokemonListInfiniteScroll from "./components/PokemonListInfiniteScroll.vue";
import PokemonListVirtualList from "./components/PokemonListVirtualList.vue";
</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 16px;">
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>Infinite Scroll</p>
      <p>下までスクロールしたら追加読み込み</p>
      <PokemonListInfiniteScroll/>
    </div>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>Virtual List</p>
      <p>表示領域のみ描画</p>
      <PokemonListVirtualList/>
    </div>
  </div>
</template>
