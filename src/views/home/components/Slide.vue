<template>
  <div class="block">
    <el-carousel height="800px" v-if="datas.length > 0">
      <!-- v-if="datas.length > 0" -->
      <el-carousel-item
        v-for="(item, index) in datas"
        :key="index"
        @click="itemClick()"
      >
        <el-image
          :fit="'cover'"
          style="width: 100%; height: 100%"
          :src="`${bgUrl}${item.backdrop_path}`"
        >
        <template #error>
          <no-back-drop />
        </template>
        </el-image>
        <over-lays>
          <info-cards :data="item" type="movie" />
        </over-lays>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getMPopular } from "@/netWork/homeRequeat";
import { picPath, bgPath, heighPath } from "@/utils/configuration";
import OverLays from "@/components/OverLays.vue";
import InfoCards from "@/components/InfoCards.vue";
import NoBackDrop from "@/components/NoBackDrop.vue";
export default defineComponent({
  components: { OverLays, InfoCards, NoBackDrop },
  setup() {
    let datas = ref<Array<any>>([]);
    let baseUrl = ref(picPath);
    let bgUrl = ref(bgPath);
    let HUrl = ref(heighPath);
    async function getData() {
      const data = await getMPopular();
      datas.value.push(...data.data.results.slice(0, 6));
    }
    function itemClick(): void {}
    onMounted(() => {
      getData();
    });
    return {
      datas,
      baseUrl,
      bgUrl,
      HUrl,
      itemClick,
    };
  },
});
</script>


<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>