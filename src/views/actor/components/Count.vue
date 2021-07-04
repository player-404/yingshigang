<template>
  <swiper :data="datas" height="340px" :slidesPerView="4" font="14px" :slidewidth="768"/>
</template>
<script lang="ts">
import Swiper from "@/components/Swiper.vue";
import { defineComponent, toRef, ref } from "vue";
import { countMovieData } from "../utils/tool";
export default defineComponent({
  components: { Swiper },
  props: {
    personId: String,
  },
  setup(props) {
    const id = toRef(props, "personId");
    const datas = ref<any[] | null>(null);
    const count = ref<any>(null);

    countMovieData(Number(id.value)).then((data) => {
      datas.value = data;
    });
    return {
      datas,
      count,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
