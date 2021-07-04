<template>
  <div class="banner">
    <el-carousel height="100vh" v-if="datas">
      <el-carousel-item
        v-for="(item, index) in datas"
        :key="index"
        v-loading="loading"
      >
        <over-lays>
          <info-cards :data="item" type="TV" />
        </over-lays>
        <el-image
          :src="`https://image.tmdb.org/t/p/original${item.backdrop_path}`"
          style="height: 100%; width: 100%"
          fit="cover"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts">
import InfoCards from "@/components/InfoCards.vue";
import OverLays from "@/components/OverLays.vue";
import { computed, defineComponent, ref, watch } from "vue";
import { getSlide } from "../utils/tool";
export default defineComponent({
  components: { OverLays, InfoCards },
  setup() {
    let datas = ref<[] | null>(null);
    let loading = ref<boolean>(true);
    getSlide().then((data) => {
      datas.value = data;
    });
    watch(datas, (newv, oldv) => {
      if (newv && newv.length > 0) {
        loading.value = false;
      }
    });
    return {
      datas,
      loading,
    };
  },
});
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  height: 100%;
}
</style>