<template>
  <div class="tv-container">
    <div class="banner">
      <banner />
    </div>
    <div class="container">
      <div class="arring-today">
        <arring-tody />
      </div>
      <div class="ontheair">
        <onthe-airs type="TV" />
      </div>
      <div class="popular">
        <popular />
      </div>
      <div class="recommend">
        <recommend type="TV" />
      </div>
      <div class="top-rate">
        <top-rate />
      </div>
      <div class="cn-popular">
        <cn-popular />
      </div>
      <div class="more-detail" @click="toClassify">
        <color-btn title="电视" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Popular from "./components/Popular.vue";
import ArringTody from "./components/ArringTody.vue";
import Banner from "./components/Banner.vue";
import OntheAirs from "./components/OntheAirs.vue";
import Recommend from "@/components/recommend.vue";
import TopRate from "./components/TopRate.vue";
import CnPopular from "./components/CnPopular.vue";
import ColorBtn from "@/components/ColorBtn.vue";
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    Banner,
    ArringTody,
    OntheAirs,
    Popular,
    Recommend,
    TopRate,
    CnPopular,
    ColorBtn,
  },
  setup() {
    const router = useRouter();
    function toClassify(): void {
      router.push({name: 'classify'});
    }
    return {
      toClassify
    }
  },
});
</script>
<style lang="less" scoped>
.tv-container {
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
      margin: 100px 0;
    }
  }
}
</style>