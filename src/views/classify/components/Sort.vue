<template>
  <div class="content">
    <div
      :class="{ active: index === active }"
      v-for="(item, index) in sort"
      :key="index"
      @click="itemClick(item, index)"
    >
      {{ item.label }}
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { defineComponent, ref } from "vue";
import { sort } from "../utils/data";
import { Item } from '@/types/index'
export default defineComponent({
  setup() {
    let active = ref<number>(0);
    const store = useStore();
    function itemClick(item: Item, index: number) {
      active.value = index;
      store.commit('classify/setSort', item.value);
    }
    return {
      sort,
      active,
      itemClick,
    };
  },
});
</script>
<style lang="less" scoped>
.content {
  display: inline-block;
  position: relative;
  margin: 50px 0;
  background-color: #1e1d21;
  border-radius: 4px;
  div {
    width: 90px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    display: inline-block;
    border-radius: 4px;
    transition: border 0.5s, color 0.5s;
    border: 1px solid transparent;
    cursor: pointer;
    user-select: none;
    &.active {
      border: 1px solid #63a8d9;
      color: #63a8d9;
    }
  }
}
</style>