<template>
  <div class="stage-photo"  v-if="backImage">
    <el-image
      :src="`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${backImage.file_path}`"
      fit="cover"
      style="width: 100%; height: 100%"
    />
    <over-lays>
      <div class="content">
      <div
        class="view"
        v-loading="loading"
        @mouseenter="over"
        @mouseleave="out"
        :class="{ 'full-screen': screenStatus }"
      >
        <el-image
          :src="`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${activeItem.file_path}`"
          @load="load"
          fit="cover"
          style="width: 100%; height: 100%"
        />
        <el-tooltip content="全屏" v-if="!screenStatus">
          <transition name="fade">
            <i
              class="el-icon-full-screen"
              v-show="active"
              :class="{ active: active }"
              @click="fullScreen"
            ></i>
          </transition>
        </el-tooltip>
        <el-tooltip content="恢复" v-else>
          <div class="downsize" @click="downsize">
            <img src="@/assets/images/downsize.png" alt="icon" />
          </div>
        </el-tooltip>
      </div>
      <div class="slide">
        <swiper
          :slidesPerView="4"
          :spaceBetween="30"
          :navigation="true"
          class="swiper"
          :lazy="true"
          :activeIndex="index"
        >
          <swiper-slide
            v-for="(item, index) in backdrops"
            :key="index"
            class="swiper-slide"
            @click="slideClick(item)"
          >
            <img
              :data-src="`https://image.tmdb.org/t/p/w500/${item.file_path}`"
              class="swiper-lazy"
            />
            <div
              class="swiper-lazy-preloader swiper-lazy-preloader-white"
            ></div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    </over-lays>
  </div>
  <div class="no-data" v-else>
    <span class="text">暂无数据</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRef, watch } from "vue";
import { Obj } from "../utils/tool";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Lazy } from "swiper/core";
SwiperCore.use([Navigation, Lazy]);
import "swiper/swiper.less";
import "swiper/components/lazy/lazy.less";
import OverLays from "@/components/OverLays.vue";
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    OverLays,
  },
  props: {
    background: Object,
    datas: Object,
  },
  emits: ["fullScreen"],
  setup(props, { attrs, slots, emit }) {
    let backImage = ref<Obj>();
    let backdrops = ref<[]>();
    let loading = ref<boolean>(true);
    let activeItem = ref<Obj>();
    let index = ref<any>();
    let active = ref<boolean>(false);
    let screenStatus = ref<boolean>(false);
    let image = toRef(props, 'background')
    if (image.value) {
      console.log("backImage", props.background);
      backdrops.value = image.value.backdrops;
      backImage.value = image.value.backdrops[3] || image.value.backdrops[0];
      activeItem.value = image.value.backdrops[0];
    }
    //图片加载完成
    function load(): void {
      loading.value = false;
    }
    //预览swiper点击
    function slideClick(item: Obj): void {
      loading.value = true;
      activeItem.value = item;
    }
    //鼠标over
    function over(): void {
      active.value = true;
    }
    //鼠标out
    function out(): void {
      active.value = false;
    }
    //全屏
    function fullScreen(): void {
      screenStatus.value = true;
      emit("fullScreen", true);
    }
    //缩小
    function downsize(): void {
      screenStatus.value = false;
      emit("fullScreen", false);
    }
    return {
      backImage,
      backdrops,
      loading,
      load,
      slideClick,
      activeItem,
      index,
      active,
      over,
      out,
      fullScreen,
      screenStatus,
      downsize,
    };
  },
});
</script>
<style lang="less" scoped>
.stage-photo {
  width: 100%;
  height: 100%;
  position: relative;
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .view {
      position: absolute;
      width: 1050px;
      height: 60%;
      left: 0;
      right: 0;
      margin: auto;
      background-color: rosybrown;
      bottom: 250px;
      overflow: hidden;
      transition: all 0.5s;
      &.full-screen {
        width: 100vw;
        height: 100vh;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;
      }
      .el-icon-full-screen {
        font-size: 40px;
        position: absolute;
        right: 30px;
        bottom: 10px;
        cursor: pointer;
        transform: translateY(60px);
        &.active {
          opacity: 1;
          transform: translateY(0px);
        }
      }
      .downsize {
        position: absolute;
        right: 30px;
        bottom: 10px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        transition: all 0.3s;
        &:hover {
          transform: scale(1.2);
        }
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .fade-enter-active {
        animation: over 0.5s ease;
      }
      .fade-leave-active {
        animation: over 0.5s ease reverse;
      }
      @keyframes over {
        from {
          transform: translateY(60px);
          opacity: 0;
        }
        to {
          transform: translateY(0px);
          opacity: 1;
        }
      }
    }
    .slide {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 74%;
      max-width: 1050px;
      height: 150px;
      bottom: 50px;
      .swiper-container {
        --swiper-navigation-color: #ffffff;
        --swiper-navigation-size: 30px;
      }
      .swiper {
        width: 100%;
        height: 100%;
        .swiper-slide {
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.no-data {
  width: 100%;
  height: 100%;
  position: relative;
  .text {
    position: absolute;
    font-size: 30px;
    font-weight: bold;
    top: 200px;
    left: 200px;
  }
}
</style>
