<template>
  <div class="top">
    <item-header title="TMDB高分" name="top" type="movie"/>
    <swiper :data="datas" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Swiper from "@/components/Swiper.vue";
import ItemHeader from '@/components/ItemHeader.vue'
import { topData } from "../utils/tool";
export default defineComponent({
  components: {
    Swiper,
    ItemHeader
  },
  setup() {
    let datas = ref<[]>();
    topData().then((data) => {
      datas.value = data;
    });
    return {
      datas,
    };
  },
});
</script>
<style lang="less" scoped>
.top {
  margin-top: 100px;
}
</style>

