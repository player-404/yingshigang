<template>
  <div class="infocards" v-if="data">
    <div class="name">{{ data[type.name] }}</div>
    <div class="time">
      <span class="time-text">发行日期:</span>
      <span class="text-data">{{ data[type.date] }}</span>
    </div>
    <div class="rating">
      <el-rate
        allow-half
        disabled
        :model-value="data.vote_average / 2"
        show-score
        :score-template="`${data.vote_average}`"
        text-color="#fdb301"
        class="rate"
      />
      <!-- <span class="rating-num">{{ data.vote_average }}</span> -->
    </div>
    <p class="introduction">
      {{ data.overview || "暂无简介" }}
    </p>
    <div class="btn" @click="toDetail">
      <btn>详情</btn>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRef, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Obj } from "@/types/index";
import Btn from "./Btn.vue";
interface Type {
  name: string;
  date: string;
}
export default defineComponent({
  name: "infoCards",
  components: { Btn },
  props: {
    data: Object,
    type: {
      type: String,
      default: "movie",
    },
  },
  setup(props) {
    const data: Obj = toRef(props, "data");
    const router = useRouter();
    function toDetail(): void {
      router.push({
        name: "detail",
        query: {
          id: data.value.id,
          type: props.type,
        },
      });
    }
    const type = computed<Type>(() => {
      if (props.type === "TV") {
        return {
          name: "name",
          date: "first_air_date",
        };
      }
      return {
        name: "title",
        date: "release_date",
      };
    });
    return {
      type,
      toDetail,
      data,
    };
  },
});
</script>
<style lang="less" scoped>
.infocards {
  position: absolute;
  top: 30%;
  left: 20%;
  color: #fff;
  .time {
    padding-bottom: 10px;
    .time-text {
      font-size: 14px;
      padding-right: 4px;
    }
    .time-data {
      font-size: 14px;
    }
  }
  .name {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  .introduction {
    margin: 30px 0;
    width: 500px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>