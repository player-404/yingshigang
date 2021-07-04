<template>
  <div class="detail">
    <detail-head v-show="!status" />
    <swiper
      :direction="'vertical'"
      :slidesPerView="1"
      class="swiper"
      :mousewheel="true"
      :pagination="{
        clickable: true,
      }"
      :activeIndex="index"
      @slideChange="onSlideChange"
      v-if="image && data"
      @swiper="setSwiper"
    >
      <swiper-slide>
        <tv-index :indexData="data" v-if="data" />
      </swiper-slide>
      <swiper-slide>
        <introduction :background="image" :datas="data" />
      </swiper-slide>
      <swiper-slide>
        <stage-photo
          :background="image"
          :datas="data"
          @fullScreen="fullScreen"
        />
      </swiper-slide>
      <swiper-slide>
        <actor :background="image" :datas="data" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.less";
import "swiper/components/pagination/pagination.less";
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
SwiperCore.use([Mousewheel, Pagination]);
import { defineComponent, ref, provide, readonly, watch, computed } from "vue";
import { useRoute } from "vue-router";
import TvIndex from "./components/TvIndex.vue";
import DetailHead from "./components/DetailHead.vue";
import Introduction from "./components/Introduction.vue";
import StagePhoto from "./components/StagePhoto.vue";
import Actor from "./components/Actor.vue";
import { getData, getImage } from "./utils/tool";
import { useStore } from '@/store'
interface Obj {
  activeIndex: number;
}
interface Image {
  backdrops: [];
  id: number;
  posters: [];
}
export default defineComponent({
  components: {
    TvIndex,
    Swiper,
    SwiperSlide,
    DetailHead,
    Introduction,
    StagePhoto,
    Actor,
  },
  setup() {
    const route = useRoute();
    const { type, id } = route.query;
    let swiperActiveIndex = ref<number>   (0);
    let data = ref<any>();
    let image = ref<Image>();
    let status = ref<boolean>(false);
    let index = ref<number>();
    const store: any = useStore();
    let swiper = ref();
    let swiperIndex = computed(() => {
      return store.state.detail.index
    })
    //获取数据
    getData(type, id as string).then((datas) => {
      data.value = datas.data;
    });
    //获取图片
    getImage(type, id).then((data) => {
      image.value = data.data;
    });
    //swiper 滚动
    function onSlideChange(swiper: Obj) {
      swiperActiveIndex.value = swiper.activeIndex;
      console.log(swiperActiveIndex.value);
    }
    //获取swiper
    function setSwiper(swipers: any): void {
      swiper.value = swipers;
    }
    provide("activeIndex", readonly(swiperActiveIndex));
    function fullScreen(sta: boolean): void {
      status.value = sta;
    }
    //导航栏点击跳转页面
   watch(swiperIndex, (newv, oldv) => {
    swiper.value.slideTo(newv, 300)

   })
    return {
      data,
      onSlideChange,
      swiperActiveIndex,
      image,
      fullScreen,
      setSwiper,
      status,
      index,
    };
  },
});
</script>
<style lang="less" scoped>
.detail {
  min-width: 1280px;
  max-width: 1920px;
  height: 100vh;
  margin: auto;
  position: relative;
  overflow: hidden;
  .swiper {
    min-width: 1280px;
    max-width: 1920px;
    height: 100vh;
    min-height: 720px;
    box-sizing: border-box;
    padding: 0;
  }
}
</style>