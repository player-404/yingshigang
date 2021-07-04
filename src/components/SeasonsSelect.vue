<template>
  <el-select v-model="value" :size="'small'" class="select">
    <el-option v-for="(item, index) in data" :key="index" :value="item.id" :label="item.name"></el-option>
  </el-select>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
interface Data {
  name: string,
  id: number
}
export default defineComponent({
  props: {
    datas: Array,
  },
  setup(props) {
    let data = props.datas;
    let value = ref<number>();
    return {
      value,
      data
    }
  },
});
</script>
<style lang="less" scoped>
.select {
  width: 100px;
  border: none;
  outline: none;
  background-color: salmon !important;
}
</style>