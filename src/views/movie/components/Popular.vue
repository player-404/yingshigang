<template>
  <div class="popular-movie">
    <item-header title="流行" type="movie" name="popular"/>
    <swiper :data="datas" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ItemHeader from "@/components/ItemHeader.vue";
import { getMPopular } from "@/netWork/homeRequeat";
import Swiper from '@/components/Swiper.vue'
export default defineComponent({
  components: {
    ItemHeader,
    Swiper
  },
  setup() {
    let datas = ref<[]>();
    getMPopular().then((data) => {
      datas.value = data.data.results;
    });
    return {
      datas,
    };
  },
});
</script>
<style lang="less" scoped>
.popular-movie {
  margin-top: 100px;
}
</style>
