<template>
  <div class="cn-popular">
    <item-header title="国内热门" name="cn" type="TV"/>
    <swiper :data="datas" type="TV"/>
  </div>
</template>
<script lang="ts">
import ItemHeader from "@/components/ItemHeader.vue";
import Swiper from "@/components/Swiper.vue";
import { defineComponent, ref } from "vue";
import { cnPopular } from '../utils/tool'
export default defineComponent({
  components: {
    ItemHeader,
    Swiper,
  },
  setup() {
      let datas = ref<[] | null>(null);
      cnPopular().then(data => {
          datas.value = data;
      })
      return {
          datas
      }
  },
});
</script>
<style lang="less" scoped>
.cn-popular {
    margin-top: 100px;
}
</style>