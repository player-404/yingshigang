<template>
  <div class="search-container">
    <div class="head">
      <search-btn
        width="30vw"
        height="30px"
        class="search-btn"
        :defaultWord="keyword"
      />
      <i class="back" @click="back"><img src="@/assets/images/back2.png" alt="back" /></i>
    </div>
    <div class="content">
      <!-- 分类索引 -->
      <ul class="content-type">
        <li class="type-title">搜索结果</li>
        <li
          v-for="(item, index) in type"
          :key="index"
          class="item"
          @click="itemClick(index)"
          :class="{ active: active === index }"
        >
          <span class="item-title">{{ item }}</span>
          <span class="item-num">{{
            index === 0
              ? movieData.totleReslut
              : index === 1
              ? tvData.totleReslut
              : peopleData.totleReslut
          }}</span>
        </li>
      </ul>
      <!-- 数据列表 -->
      <ul
        class="content-data"
        v-if="datas.length > 0 && (active === 0 || active === 1)"
      >
        <li
          v-for="(item, index) in datas"
          :key="index"
          @click="toDetail(active, item.id)"
        >
          <div class="cover">
            <el-image
              style="width: 100%; height: 100%"
              fit="cover"
              :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
            />
          </div>
          <div class="cont">
            <div class="top">
              <div class="name">
                {{ active === 0 ? item.title : item.name }}
              </div>
              <div class="time">
                {{ active === 0 ? item.release_date : item.first_air_date }}
              </div>
            </div>
            <div class="bot" ref="bot">
              {{ ellipsis(50, item.overview) }}
            </div>
          </div>
        </li>
      </ul>
      <!-- 人物列表 -->
      <actor-list
        class="content-data"
        :data="datas"
        v-if="datas.length > 0 && active === 2"
      />
      <!-- 空白状态 -->
      <ul class="content-data" v-if="datas.length === 0">
        <el-empty description="无数据"></el-empty>
      </ul>
    </div>
    <!-- 分页 -->
    <div class="page" v-if="datas.length > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPage"
        @current-change="currentChange"
        v-model:currentPage="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import searchBtn from "@/components/searchBtn.vue";
import { type } from "./utils/data";
import { ellipsis } from "@/utils/tool";
import { movieSearchData, tvSearchData, peopleSearchData } from "./utils/tool";
import { useStore } from "@/store";
import { SearchDatas } from "@/types/index";
import { Obj } from "@/types/index";
import { useRouter } from "vue-router";
import ActorList from "./components/ActorList.vue";
export default defineComponent({
  components: {
    searchBtn,
    ActorList,
  },
  setup() {
    let bot = ref<any>(null);
    const store: any = useStore();
    const keyword = computed(() => store.state.search.keyword);
    let active = ref<number>(0);
    let datas = ref<any[]>([]);
    let totalPage = ref<number>(0);
    let currentPage = ref<number>(1);
    const router = useRouter();
    const movieData = reactive<SearchDatas>({
      totleReslut: 0,
      page: 1,
      results: [],
      totalPage: 0,
    });
    const tvData = reactive<SearchDatas>({
      totleReslut: 0,
      page: 1,
      results: [],
      totalPage: 0,
    });
    const peopleData = reactive<SearchDatas>({
      totleReslut: 0,
      page: 1,
      results: [],
      totalPage: 0,
      personId: 0,
    });
    //左侧索引栏切换
    function itemClick(index: number): void {
      if (index === 0) {
        datas.value = movieData.results;
        totalPage.value = movieData.totalPage;
        currentPage.value = movieData.page;
      }
      if (index === 1) {
        datas.value = tvData.results;
        totalPage.value = tvData.totalPage;
        currentPage.value = tvData.page;
      }
      if (index === 2) {
        datas.value = peopleData.results;
        totalPage.value = peopleData.totalPage;
        currentPage.value = peopleData.page;
      }
      active.value = index;
    }
    //分页
    function currentChange(page: number): void {
      if (active.value === 0) {
        movieSearchData(keyword.value, page).then((data) => {
          setMovieData(data);
          datas.value = movieData.results;
        });
      }
      if (active.value === 1) {
        tvSearchData(keyword.value, page).then((data) => {
          setTvData(data);
          datas.value = tvData.results;
        });
      }
      if (active.value === 2) {
        peopleSearchData(keyword.value, page).then((data) => {
          setPeopleData(data);
          datas.value = peopleData.results;
        });
      }
      window.scrollTo(0, 0);
    }
    //设置搜索的电影数据
    function setMovieData(data: Obj): void {
      movieData.totleReslut = data.totleReslut;
      movieData.page = data.page;
      movieData.results = data.results;
      movieData.totalPage = data.totalPage;
    }
    //设置搜索的电视数据
    function setTvData(data: Obj): void {
      tvData.totleReslut = data.totleReslut;
      tvData.page = data.page;
      tvData.results = data.results;
      tvData.totalPage = data.totalPage;
    }
    //设置搜索的人物相关数据
    function setPeopleData(data: Obj): void {
      peopleData.totleReslut = data.totleReslut;
      peopleData.page = data.page;
      peopleData.results = data.results;
      peopleData.totalPage = data.totalPage;
      peopleData.personId = data.personId;
    }
    //跳转至详情页面
    function toDetail(active: number, id: string): void {
      if (active === 0 || active === 1) {
        const type_value = active === 0 ? "movie" : "TV";
        router.push({ name: "detail", query: { type: type_value, id: id } });
      }
    }
    //返回
    function back(): void {
      router.go(-1);
    }
    watchEffect(() => {
      if (keyword.value) {
        active.value = 0;
        movieSearchData(keyword.value).then((data) => {
          setMovieData(data);
          datas.value = data.results;
          totalPage.value = data.totalPage;
        });
        tvSearchData(keyword.value).then((data) => {
          setTvData(data);
        });
        peopleSearchData(keyword.value).then((data) => {
          setPeopleData(data);
        });
      }
    });
    return {
      type,
      bot,
      ellipsis,
      keyword,
      movieData,
      tvData,
      peopleData,
      itemClick,
      active,
      datas,
      currentChange,
      toDetail,
      back,
      totalPage,
      currentPage,
    };
  },
});
</script>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  .back {
    display: inline-block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform .3s;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
}
.search-container {
  box-sizing: border-box;
  max-width: 1920px;
  min-width: 1280px;
  margin: 0 auto;
  padding: 30px 7vw;
  .search-btn {
    min-width: 400px;
  }
  .content {
    margin-top: 80px;
    display: flex;
    .content-type {
      flex-basis: 240px;
      height: 300px;
      background-color: #1e1d21;
      box-shadow: 2px 2px 20px rgba(255, 255, 255, 0.2);
      border-radius: 14px;
      overflow: hidden;
      flex-grow: 0;
      flex-shrink: 0;
      .type-title {
        width: 100%;
        height: 70px;
        background-color: #5340be;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        line-height: 70px;
        margin-bottom: 20px;
      }
      .item {
        box-sizing: border-box;
        padding: 14px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        &:hover {
          background-color: rgba(84, 64, 190, 0.2);
        }
        &.active {
          background-color: rgba(84, 64, 190, 0.2);
        }
        .item-title {
          font-size: 18px;
        }
        .item-num {
          padding: 3px 6px;
          background-color: #000;
          font-size: 14px;
          border-radius: 4px;
        }
      }
    }
    .contens {
      flex-grow: 1;
    }
    .content-data {
      flex-basis: auto;
      min-width: 500px;
      flex-grow: 1;
      margin-left: 80px;
      li {
        display: flex;
        margin-bottom: 80px;
        border-radius: 14px;
        overflow: hidden;
        background-color: #1e1d21;
        box-shadow: 2px 2px 20px rgba(255, 255, 255, 0.2);
        cursor: pointer;
        .head {
          width: 120px;
          height: 120px;
          background-color: royalblue;
        }
        .info {
          margin-left: 20px;
          margin-top: 20px;
          .name {
            font-size: 18px;
            font-weight: bold;
            width: 200px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 20px;
          }
        }
        .cover {
          flex-basis: 146px;
          height: 180px;
        }
        .cont {
          flex-basis: 100%;
          padding-top: 20px;
          padding-left: 20px;
          .top {
            .name {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .time {
              font-size: 14px;
              margin-bottom: 10px;
            }
          }
          .bot {
            width: 100%;
            overflow: hidden;
            margin-top: 20px;
            font-size: 17px;
          }
        }
      }
    }
  }
  .page {
    width: 100vw;
    display: flex;
    justify-content: center;
  }
}
</style>