<template>
  <div class="actor-list">
    <ul class="content-data">
      <li v-for="(item, index) in datas" :key="index" @click="itemClick(item)">
        <div class="head">
          <el-image
            style="width: 100%; height: 100%"
            fit="cover"
            :src="`https://image.tmdb.org/t/p/w500${item.profile_path}`"
          >
          <template #error>
            <error-img />
          </template>
          </el-image>
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="overview">
            代表作:
            {{ `${item["known_for"] ? getOverView(item["known_for"]) : "无"}` }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRef } from "vue";
import { ellipsis } from "@/utils/tool";
import { Obj } from "@/types/index";
import { routerKey, useRouter } from "vue-router";
import ErrorImg from "@/components/ErrorImg.vue";
export default defineComponent({
  components: { ErrorImg },
  props: {
    data: Array,
  },
  setup(props) {
    let datas = toRef(props, "data");
    const router = useRouter();
    function getOverView(data: []): string {
      let str = "";
      data.forEach((ele: any) => {
        str += `《${ele.name || ele.title}》`;
      });
      const newStr = ellipsis(50, str);
      return newStr;
    }
    //跳转演员详情页面
    function itemClick(item: Obj): void {
      router.push({
        name: "actor",
        query: {
          id: item.id,
        },
      });
    }
    return {
      datas,
      getOverView,
      itemClick,
    };
  },
});
</script>
<style lang="less" scoped>
.content-data {
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
</style>