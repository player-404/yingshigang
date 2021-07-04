<template>
  <el-row
    :gutter="60"
    class="item-slide"
    ref="itemSlide"
    v-loading="load"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <el-col
      :xs="4"
      :sm="4"
      :md="4"
      :lg="4"
      :xl="4"
      class="item"
      v-for="(item, index) in datas"
      :key="item.id"
    >
      <div
        class="container"
        @mouseenter="enter(index)"
        @mouseleave="leave(index)"
      >
        <div
          class="cont"
          :ref="
            (el) => {
              if (el) cont[index] = el;
            }
          "
        >
          <div class="cover" :style="`width: ${width}px`">
            <el-image
              :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
              fit="cover"
              style="width: 100%; height: 100%"
            >
              <template #error>
                <no-back-drop />
              </template>
            </el-image>
          </div>
          <div class="title">
            {{ classify === "movie" ? item.title : item.name }}
          </div>
          <div class="info">
            <div class="year mb-10 pt-4">
              {{
                classify === "movie"
                  ? item["release_date"]
                  : item["first_air_date"]
              }}
            </div>
            <div class="titles mb-10">
              {{ classify === "tv" ? item.name : item.title }}
            </div>
            <div class="overView mb-10">
              {{ ellipsis(40, item.overview) }}
            </div>
            <div class="btn">
              <el-button size="small" round @click="toDetail(item.id)"
                ><span class="text-blue">详情</span></el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  <div class="pages">
    <el-pagination
      background
      :current-page="page"
      layout="prev, pager, next"
      :total="pages * 10"
      @current-change="pageChange"
    ></el-pagination>
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
import { ellipsis } from "@/utils/tool";
import { discoverData } from "../utils/tool";
import { useStore } from "@/store";
import router from "@/router";
import NoBackDrop from "@/components/NoBackDrop.vue";
export default defineComponent({
  components: { NoBackDrop },
  setup() {
    let cont = ref<any[]>([]);
    let itemSlide = ref<any>();
    let width = ref<number>();
    const store: any = useStore();
    let datas = ref<any>();
    let pages = ref<number>();
    let page = ref<number>(1);
    let load = ref<boolean>(true);
    //筛选数据
    const genres = computed<string>(() =>
      store.state.classify.genres === "all" ? "" : store.state.classify.genres
    );
    const classify = computed<string>(() => store.state.classify.classify);
    const language = computed<string>(() =>
      store.state.classify.language === "all"
        ? ""
        : store.state.classify.language
    );
    const year = computed<string>(() =>
      store.state.classify.year === "all" ? "" : store.state.classify.year
    );
    const sort = computed<string>(() => store.state.classify.sort);
    onMounted(() => {
      resize();
    });
    //跳转详情页面
    function toDetail(id: number): void {
      let type = classify.value === 'movie' ? classify.value : classify.value.toUpperCase();
      router.push({name: 'detail', query: {id: id,type: type}})
    }
    //鼠标hover
    function enter(index: number): void {
      if ((index + 1) % 6 === 0) {
        cont.value[index].classList.add("pos");
      }
      if (width.value) {
        cont.value[index].style.width = width.value * 2 + 50 + "px";
      }
    }
    //鼠标离开
    function leave(index: number): void {
      cont.value[index].style = "";
    }
    //获取item宽度
    function getSize(index: number = 0): void {
      if (cont.value.length > 0) {
        width.value = cont.value[index].offsetWidth - 4;
      }
    }
    //窗口缩放时重新获取item宽度  
    function resize(): void {
      window.onresize = () => {
        getSize();
      };
    }
    //分页: 获取当前页数
    async function pageChange(currentPage: number): Promise<void> {
      load.value = true;
      page.value = currentPage;
      const data = await discoverData({
        classify: classify.value,
        genres: genres.value,
        language: language.value,
        pages: currentPage,
        year: year.value,
        sort: sort.value,
      });
      load.value = false;
      datas.value = data.data;
      window.scrollTo(0, 0);
    }
    //选择分类时 请求数据
    watchEffect(async () => {
      load.value = true;
      const data = await discoverData({
        classify: classify.value,
        genres: genres.value,
        language: language.value,
        year: year.value,
        sort: sort.value,
      });
      load.value = false;
      datas.value = data.data;
      pages.value = data.pages;
      page.value = data.currentPage;
    });
    watch(cont.value, (newv, oldv) => {
      if (newv.length > 0) {
        getSize();
      }
    });
    return {
      enter,
      leave,
      width,
      cont,
      itemSlide,
      ellipsis,
      datas,
      pages,
      pageChange,
      toDetail,
      page,
      load,
      classify,
    };
  },
});
</script>
<style lang="less" scoped>
.item-slide {
  position: relative;
  .item {
    width: 100%;
    height: 100%;
    margin-bottom: 80px;
    .container {
      width: 100%;
      padding-top: 170%;
      height: 0;
      position: relative;
      .cont {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all 0.5s;
        border-radius: 14px;
        cursor: pointer;
        .info {
          position: absolute;
          right: 20px;
          top: 0;
          width: 40%;
          height: 100%;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.5s 0.3s;
          .titles {
            font-weight: bold;
            font-size: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .year {
            font-size: 20px;
            font-weight: bold;
            text-align: right;
            opacity: 0.6;
          }
          .overView {
            width: 100%;
            height: 7vw;
            font-size: 16px;
            overflow: hidden;
          }
          .btn {
            position: absolute;
            bottom: 20px;
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
          }
        }
        &:hover {
          z-index: 9;
          background-color: #573af0;
          .cover {
            left: 10px;
            top: -10px;
          }
          .title {
            opacity: 0;
          }
          .info {
            opacity: 1;
          }
        }
        &.pos {
          right: 0;
        }
        .cover {
          height: 80%;
          background-color: thistle;
          transition: top 0.5s, left 0.5s;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 3;
          border-radius: 14px;
          overflow: hidden;
        }
        .title {
          position: absolute;
          bottom: 0px;
          text-align: center;
          width: 100%;
          font-size: 18px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
.pages {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 50px 0;
}
</style>
