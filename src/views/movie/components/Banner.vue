<template>
  <div class="banner" v-loading="loading">
    <el-carousel height="900px" v-if="data">
      <el-carousel-item v-for="(item, index) in data" :key="index">
        <el-image
          :src="`https://image.tmdb.org/t/p/original${item.backdrop_path}`"
          style="width: 100%; height: 100%"
          fit="cover"
        />
        <over-lays>
          <info-cards :data="item" type="movie" />
        </over-lays>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { getTopData } from "../utils/tool";
import InfoCards from "@/components/InfoCards.vue";
import OverLays from "@/components/OverLays.vue";
export default defineComponent({
  components: {
    InfoCards,
    OverLays,
  },
  setup() {
    let data = ref<any[] | null>(null);
    let loading = ref<boolean>(true);
    getTopData().then((datas) => {
      data.value = datas.splice(0, 6);
    });
    watch(data, (newv, oldv) => {
      if (newv) {
        loading.value = false;
      }
    });
    return {
      data,
      loading,
    };
  },
});
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  max-height: 900px;
}
</style>
