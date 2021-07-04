<template>
  <div class="more-detail">
    <div class="detail-content">
      <div class="header">
        <i class="back" @click="back"><img src="@/assets/images/back.png" /></i>
      </div>
      <h1 class="title">
        {{ `${type === "movie" ? "电影" : "电视"} · ${title}` }}
      </h1>
      <ul
        class="item-container"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <li
          v-for="(item, index) in datas"
          :key="index"
          @click="toDetail(item.id)"
        >
          <div class="item-left">
            <el-image
              :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
              class="image"
            />
          </div>
          <div class="item-right">
            <div class="item-name">
              <div class="name-left">{{ item[itemName] }}</div>
              <div class="name-rate">{{ item.vote_average || "暂无评分" }}</div>
            </div>
            <div class="data">{{ item[itemData] }}</div>
            <div class="item-overview">
              {{ ellipsis(100, item.overview) }}
            </div>
          </div>
        </li>
      </ul>
      <div class="pages">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ellipsis } from "@/utils/tool";
import { useRoute, useRouter } from "vue-router";
import { getData, movieText, tvText } from "./utils/tool";
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    let { type, name } = route.query;
    let page = ref<number>(1);
    let datas = ref<any[]>();
    let totalPage = ref<number>();
    let loading = ref<boolean>(true);
    let itemName = computed(() => (type === "movie" ? "title" : "name"));
    let itemData = computed(() =>
      type === "movie" ? "release_date" : "first_air_date"
    );
    let title = computed(() => {
      if (type === "movie") {
        return name === "upcoming"
          ? movieText.upcomming
          : name === "top"
          ? movieText.top
          : name === "cn"
          ? movieText.cn
          : movieText.popular;
      }
      return name === "arringTody"
        ? tvText.arringTody
        : name === "ontheair"
        ? tvText.ontheair
        : name === "top"
        ? tvText.top
        : tvText.cn;
    });
    getData(type as string, name as string, page.value).then((data) => {
      loading.value = false;
      datas.value = data.data;
      totalPage.value = data.totalPages * 10;
    });
    //页数改变
    function pageChange(currentPage: number): void {
      loading.value = true;
      getData(type as string, name as string, currentPage).then((data) => {
        loading.value = false;
        datas.value = data.data;
      });
      window.scrollTo(0, 0);
    }
    //返回
    function back(): void {
      router.go(-1);
    }
    //跳转详情页
    function toDetail(id: number): void {
      router.push({ name: "detail", query: { id, type } });
    }
    return {
      ellipsis,
      pageChange,
      back,
      toDetail,
      datas,
      totalPage,
      itemName,
      itemData,
      loading,
      title,
      type,
    };
  },
});
</script>
<style lang="less" scoped>
.more-detail {
  max-width: 1920px;
  min-width: 1280px;
  margin: 0 auto;

  .detail-content {
    width: 80%;
    margin: 0 auto;
    padding: 0 30px;
    box-sizing: border-box;
    .header {
      margin-top: 10px;
      .back {
        display: inline-block;
        width: 30px;
        height: 30px;
        padding: 0 30px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .title {
      text-align: center;
      margin-top: 10px;
    }
    .item-container {
      min-height: 400px;
      li {
        height: 200px;
        display: flex;
        margin-top: 40px;
        border-radius: 14px;
        overflow: hidden;
        background-color: #1e1d21;
        cursor: pointer;
        transition: box-shadow 0.3s;
        .image {
          transition: transform 0.3s;
        }
        &:hover {
          box-shadow: 2px 2px 20px rgba(255, 255, 255, 0.4);
          .image {
            transform: scale(1.1);
          }
        }
        .item-left {
          height: 100%;
          width: 150px;
          flex-shrink: 0;
        }
        .item-right {
          margin: 0 40px;
          flex-grow: 1;
          .item-name {
            display: flex;
            align-items: center;
            margin-top: 20px;
            .name-left {
              max-width: 200px;
              font-size: 20px;
              font-weight: bold;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .name-rate {
              align-self: flex-end;
              font-size: 14px;
              font-weight: bold;
              color: sandybrown;
              margin-left: 10px;
            }
          }
          .data {
            font-size: 14px;
            margin: 10px 0 20px;
          }
        }
      }
    }
    .pages {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 80px 0;
    }
  }
}
</style>
