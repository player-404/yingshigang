<template>
  <div class="classify">
    <div class="header">
      <page-head />
    </div>
    <div class="container">
      <div class="filter">
        <item-filter />
      </div>
      <div class="sort">
          <sort />
      </div>
      <div class="item-slide">
        <item-slide />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ItemFilter from "./components/Filter.vue";
import PageHead from "./components/PageHead.vue";
import ItemSlide from "./components/Itemslide.vue";
import Sort from './components/Sort.vue'
export default defineComponent({
  components: { PageHead, ItemFilter, ItemSlide, Sort },
  setup() {},
});
</script>
<style lang="less" scoped>
.classify {
  max-width: 1920px;
  min-width: 1280px;
  margin: 0 auto;
  .container {
    width: 100%;
    box-sizing: border-box;
    padding: 0 7vw;
  }
}
</style>