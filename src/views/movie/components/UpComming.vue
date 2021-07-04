<template>
  <div class="upcomming">
    <item-header title="正在热映" name="upcoming" type="movie"/>
    <swiper :data="datas"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Swiper from "@/components/Swiper.vue";
import ItemHeader from "@/components/ItemHeader.vue";
import { getNowPlayingData } from '../utils/tool'
export default defineComponent({
  components: {
    Swiper,
    ItemHeader,
  },
  setup() {
      let datas = ref<[]>();
      getNowPlayingData().then(data => {
          datas.value = data;
      })
      return {
          datas
      }
  },
});
</script>
<style lang="less" scoped>
.upcomming {
    margin-top: 16vh;
}
</style>
