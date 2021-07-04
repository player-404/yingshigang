<template>
 <div class="headTab" :class="{active: scroll}">
    <tab-item />
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TabItem from './TabItem.vue'
export default defineComponent({
  components: { TabItem },
  setup() {
    let scroll = ref<boolean>(false);

    return {
      scroll
    }
  },
})
</script>

<style lang="less" scoped>
.headTab {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 60px;
  max-width: 1920px;
  min-width: 1280px;
  margin: 0 auto;
  border-bottom: 1px solid #fff;
  
  &.active {
    background-color: #171519;
  }
}
</style>