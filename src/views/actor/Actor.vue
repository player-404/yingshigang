<template>
  <div class="actor">
    <actor-header />
    <div class="content" v-if="personInfo">
      <div class="left">
        <div class="top">
          <el-image
            style="width: 100%; height: 100%"
            fit="cover"
            :src="`https://image.tmdb.org/t/p/w500${personInfo['profile_path']}`"
          >
            <template #error>
              <error-img />
            </template>
          </el-image>
        </div>
        <div class="bot">
          <ul>
            <li class="title">个人信息</li>
            <li>
              <div class="item-title">职位</div>
              <div class="item-cont">
                {{ department }}
              </div>
            </li>
            <li>
              <div class="item-title">性别</div>
              <div class="item-cont">{{ sex }}</div>
            </li>
            <li>
              <div class="item-title">生日</div>
              <div class="item-cont">{{ birthday }}</div>
            </li>
            <li>
              <div class="item-title">出生地</div>
              <div class="item-cont">{{ placeofBirth }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="name">{{ personInfo.name }}</div>
        <h3 class="instruction">个人简介</h3>
        <div class="overview">
          {{ ellipsis(textNum, personInfo.biography) }}
          <span class="more-detail" @click="more" v-if="personInfo.biography"
            >{{textNum === 'all' ? '还原简介<<' : '展开简介>>'}}</span
          >
        </div>
        <div class="count">
          <h3>知名作品</h3>
          <count :personId="personId" />
        </div>
        <actor-life :personId="personId" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ellipsis } from "@/utils/tool";
import { useRoute } from "vue-router";
import { getInfoData } from "./utils/tool";
import { Obj } from "@/types/index";
import count from "./components/Count.vue";
import ActorHeader from "./components/Head.vue";
import ActorLife from "./components/ActorLife.vue";
import ErrorImg from '@/components/ErrorImg.vue'
export default defineComponent({
  components: {
    count,
    ActorHeader,
    ActorLife,
    ErrorImg
  },
  setup() {
    let datas = ref<any[]>();
    let personInfo = ref<Obj>();
    const route = useRoute();
    let personId: unknown = route.query && route.query.id;
    let textNum = ref<string | number>(200);
    //演员信息
    getInfoData(personId as number).then((data) => {
      personInfo.value = data;
    });
    //搜索人物职位
    const department = computed<string>(() =>
      personInfo.value
        ? personInfo.value["known_for_department"] === "Acting"
          ? "演员"
          : personInfo.value["known_for_department"] === "Writing"
          ? "编剧"
          : personInfo.value["known_for_department"] === "Directing"
          ? "导演"
          : personInfo.value["known_for_department"] === "Crew"
          ? "群演"
          : personInfo.value["known_for_department"] === "Production"
          ? "制片人"
          : personInfo.value["known_for_department"] === "Camera"
          ? "摄影师"
          : personInfo.value["known_for_department"]
        : "暂无数据"
    );
    //搜索人物性别
    const sex = computed<string>(() =>
      personInfo.value
        ? personInfo.value.gender === 1
          ? "女"
          : personInfo.value.gender === 2
          ? "男"
          : "暂无数据"
        : "暂无数据"
    );
    //搜索人物生日
    const birthday = computed<string>(
      () => (personInfo.value && personInfo.value.birthday) || "暂无数据"
    );
    //出生地
    const placeofBirth = computed<string>(
      () =>
        (personInfo.value && personInfo.value["place_of_birth"]) || "暂无数据"
    );
    //全部简介
    function more(): void {
      if (textNum.value === "all") {
        textNum.value = 200;
        return;
      }
      if (textNum.value === 200) {
        textNum.value = "all";
        return;
      }
    }

    return {
      personInfo,
      department,
      sex,
      birthday,
      placeofBirth,
      textNum,
      personId,
      more,
      ellipsis,
    };
  },
});
</script>
<style lang="less" scoped>
.actor {
  max-width: 1920px;
  min-width: 1080px;
  margin: 0 auto;
  .content {
    margin: 0 auto;
    width: 80%;
    display: flex;
    .left {
      flex-basis: 240px;
      flex-shrink: 0;
      .top {
        width: 100%;
        height: 300px;
        background-color: sandybrown;
        border-radius: 14px;
        overflow: hidden;
      }
      .bot {
        li {
          margin-bottom: 40px;
          .item-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 4px;
          }
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          margin-top: 60px;
        }
      }
    }
    .right {
      flex-grow: 1;
      margin-left: 80px;
      overflow: hidden;
      .name {
        font-size: 30px;
        font-weight: bold;
      }
      .instruction {
        margin-top: 40px;
        font-size: 20px;
        font-weight: bold;
      }
      .overview {
        margin-top: 20px;
        width: 100%;
        flex-wrap: wrap;
        text-align: justify;
        position: relative;
        .more-detail {
          font-weight: bold;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 120%);
          cursor: pointer;
        }
      }
      .count {
        width: 100%;
        margin-top: 80px;
      }
    }
  }
}
</style>
