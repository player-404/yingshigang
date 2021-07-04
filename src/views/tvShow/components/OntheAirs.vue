<template>
  <!-- 即将播出 -->
  <div class="on-the-air">
    <item-header title="即将播出" type="TV" name="ontheair"/>
    <swiper :data="datas" type="TV" />
  </div>
</template>
<script lang="ts">
import ItemHeader from "@/components/ItemHeader.vue";
import Swiper from "@/components/Swiper.vue";
import { defineComponent, ref } from "vue";
import { ontheairData } from "../utils/tool";
export default defineComponent({
  components: { ItemHeader, Swiper },
  setup() {
    let datas = ref<[]>();
    ontheairData().then((data) => {
      datas.value = data;
    });
    return {
      datas,
    };
  },
});
</script>
<style lang="less" scoped>
.on-the-air {
  margin-top: 100px;
}
</style>