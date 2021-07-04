<template>
  <div class="overlays">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>


<style lang="less" scoped>
.overlays {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
}
</style>