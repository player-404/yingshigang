<template>
  <div
    class="loading"
    v-loading="load"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-empty description="空空如也" v-if="!data"></el-empty>
    <swiper
      :slidesPerView="6"
      :spaceBetween="40"
      :navigation="true"
      :slidesPerGroup="1"
      :centeredSlides="true"
      class="swiper-container"
      :width="1450"
      v-else
    >
      <swiper-slide v-for="(item, index) in data" :key="index" class="slide">
        <item
          :width="'100%'"
          :data="item"
          type="movie"
          @click="toDetail(item.id)"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useStore } from "@/store";
import { useRouter } from 'vue-router'  
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, } from "swiper";
import "swiper/swiper.less";
import "swiper/components/navigation/navigation.less";

import { getMPopular } from "@/netWork/homeRequeat";
import { getDiscover } from "../utils/tools";
import item from "@/components/Item.vue";
SwiperCore.use([Navigation]);
export default {
  components: {
    Swiper,
    SwiperSlide,
    item,
  },
  setup() {
    let data = ref<any>("");
    const store: any = useStore();
    let load = ref<boolean>(false);
    let defaultValue = ref<any>();
    const router = useRouter();
    const movieData: any = computed(() => {
      if (store.state.home.movieGenres.length > 0) {
        return store.state.home.movieGenres;
      }
      return null;
    });
    console.log("movieData", movieData);
    // 获取数据
    async function getData() {
      load.value = false;
      const result = await getMPopular();
      data.value = result.data.results;
    }
    function toDetail(id: number): void {
      router.push({
        name: 'detail',
        query: {
          type: 'movie',
          id
        }
      })
    }
    watch(
      movieData,
      (newv, oldv) => {
        load.value = true;
        data.value = [];
        if (newv) {
          //筛选后数据
          const genres = newv.join();
          getDiscover(genres).then((datas) => {
            load.value = false;
            data.value = datas.length === 0 ? "" : datas;
          });
        } else {
          //初始数据
          getData();
        }
      },
      { deep: true }
    );
    onMounted(() => {
      getData();
    });
    return {
      data,
      load,
      toDetail
    };
  },
};
</script>

<style lang="less" scoped>
.loading {
  position: relative;
  z-index: 9999;
  height: 400px;
}
.swiper-container {
  --swiper-navigation-size: 30px;
  --swiper-navigation-color: #fff;
  .slide {
    height: 400px;
    color: #000;
  }
}
</style>