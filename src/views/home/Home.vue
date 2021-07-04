<template>
  <div class="home">
    <!-- 走马灯 -->
    <slide />
    <!-- 流行 -->
    <popular />
    <!-- 电视 -->
    <tv-show />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Popular from "./components/Popular.vue";
import Slide from "./components/Slide.vue";
import TvShow from './components/TvShow.vue'
// @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Slide,
    Popular,
    TvShow
  },
});
</script>
<style lang="less" scoped>
.home {
  max-width: 1920px;
  margin: 0 auto;
  min-width: 1280px
}
</style>
