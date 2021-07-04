<template>
  <div class="movie-page">
    <div class="banner">
      <banner />
    </div>
    <div class="container">
      <div class="upcomming">
        <up-comming />
      </div>
      <div class="popular">
        <popular />
      </div>
      <div class="recommend">
        <recommend />
      </div>
      <div class="top">
        <top />
      </div>
      <div class="cn-rate">
        <cn-rate />
      </div>
      <div class="more-detail" @click="toClassify">
        <color-btn title="电影" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Banner from "./components/Banner.vue";
import UpComming from "./components/UpComming.vue";
import popular from "./components/Popular.vue";
import Recommend from "../../components/recommend.vue";
import Top from "./components/Top.vue";
import CnRate from "./components/CnRate.vue";
import ColorBtn from "@/components/ColorBtn.vue";
import { useRouter } from 'vue-router' 
export default defineComponent({
  components: { Banner, UpComming, popular, Recommend, Top, CnRate, ColorBtn },
  setup() {
    const router = useRouter();
    function toClassify(): void {
      router.push({name: 'classify'})
    }
    return {
      toClassify
    }
  },
});
</script>
<style lang="less" scoped>
.movie-page {
  max-width: 1920px;
  min-width: 1280px;
  margin: 0 auto;
  .container {
    width: 100%;
    box-sizing: border-box;
    padding: 0 8vw;
    .more-detail {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 100px 0px 100px;
    }
  }
}
</style>

