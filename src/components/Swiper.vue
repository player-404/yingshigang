<template>
  <div
    class="swiper"
    :style="`height: ${heightValue}`"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <swiper
      :slidesPerView="perView"
      :spaceBetween="40"
      :navigation="true"
      :slidesPerGroup="1"
      class="swiper-container"
      v-if="datas"
      :width="slideWidth"
    >
      <swiper-slide v-for="(item, index) in datas" :key="index" class="slide">
        <div class="cont" @click="toDetail(item.id)">
          <div class="top">
            <el-image
              class="image"
              style="width: 100%; height: 100%"
              fit="cover"
              :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
            >
            <template #error>
              <no-back-drop />
            </template>
            </el-image>
          </div>
          <div class="bot">
            <div class="name" :style="{fontSize: font}">{{ item[type.name]}}</div>
            <div class="bot-cont">
              <div class="genres">
                <span class="text">{{ item[type.date] }}</span>
              </div>
              <div class="rate">
                {{ item.vote_average === 0 ? "暂无评分" : item.vote_average }}
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, toRefs, ref, reactive, watch, toRef } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);
import "swiper/swiper.less";
import "swiper/components/navigation/navigation.less";
import { Obj } from "@/types/index";
import { useRouter } from 'vue-router'
import NoBackDrop from "./NoBackDrop.vue";
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    NoBackDrop,
  },
  props: {
    height:{
      type: String,
      default: '48vh'
    },
    slidesPerView: {
      type: Number,
      default: 6
    },
    data: Array,
    type: {
      type: String,
      default: "movie",
    },
    font: String,
    slidewidth:{
      type: Number,
      default: 1518
    }
  },
  setup(props) {
    const data  =  toRef(props, 'data')
    const heightValue =toRef(props, 'height')
    const perView = toRef(props, 'slidesPerView');
    let loading = ref<boolean>(true);
    let datas = ref<[] | null>(null);
    let router = useRouter();
    let result = computed<[] | null>(() => {
      return data ? (data.value as []) : null;
    });
    const type = computed<Obj>(() => {
      if (props.type === "movie") {
        return {
          name: "title",
          date: "release_date",
        };
      }
      return {
        name: "name",
        date: "first_air_date",
      };
    });
    const font = toRef(props, 'font');
    const slideWidth = toRef(props, 'slidewidth')
    function toDetail(id: number): void {
      router.push({name: 'detail', query: {id: id, type: props.type}})
    }
    watch(result, (newv, oladv) => {
      if (newv) {
        datas.value = newv;
        loading.value = false;
      }
    });
    return {
      heightValue,
      perView,
      loading,
      datas,
      type,
      font,
      slideWidth,
      toDetail
    };
  },
});
</script>
<style lang="less" scoped>
.swiper {
  height: 40vh;
  .swiper-container {
    height: 100%;
    --swiper-navigation-size: 30px;
    --swiper-navigation-color: #fff;
    .slide {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      .cont {
        width: 95%;
        height: 90%;
        border-radius: 14px;
        transition: transform 0.6s;
        overflow: hidden;
        &:hover {
          box-shadow: 2px 2px 14px rgba(255, 255, 255, 0.3);
          transform: translateY(-12px);
          .image {
            transform: scale(1.1);
          }
        }
        .top {
          width: 100%;
          height: 80%;
          border-radius: 14px;
          overflow: hidden;
          .image {
            transition: transform 0.5s;
          }
        }
        .bot {
          margin-top: 20px;
          padding: 0px 4px;
          .name {
            font-weight: bold;
            font-size: 18px;
            width: 90%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .bot-cont {
            margin-top: 6px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>