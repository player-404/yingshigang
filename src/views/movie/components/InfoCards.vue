<template>
  <div class="movie-infocards">
    <div class="title">{{ datas.title }}</div>
    <div class="info">
      <div class="year">
        <div class="icon">
          <el-image
            :src="require(`@/assets/images/date.png`)"
            style="width: 100%; height: 100%"
            fit="cover"
          >
            <template #error>
              <no-back-drop />
            </template>
          </el-image>
        </div>
        <div class="date">{{ datas.release_date }}</div>
      </div>
      <div class="rate">
        <div class="type">TMDB</div>
        <div class="num">{{ datas.vote_average }}</div>
      </div>
    </div>
    <div class="overview" ref="over" v-if="datas.overview">
      {{ ellipsis(150, datas.overview) }}
    </div>
    <button class="btn">详情</button>
  </div>
</template>
<script lang="ts">
import NoBackDrop from "@/components/NoBackDrop.vue";
import { defineComponent, ref, onMounted, toRef, computed, watch } from "vue";
interface Obj {
  [propName: string]: any;
}
export default defineComponent({
  props: {
    data: Object,

    NoBackDrop,
  },
  setup(props) {
    let over = ref<HTMLElement | null>(null);
    let loading = ref<boolean>(true);
    const datas = computed(() => {
      return props.data ? props.data : "";
    });
    //文本溢出省略号
    function ellipsis(textNum: number, overview: string) {
      if (overview.length > textNum) {
        const content = overview.slice(0, textNum).concat("...");
        return content;
      }
      return "暂无简介";
    }
    return {
      over,
      datas,
      ellipsis,
    };
  },
});
</script>
<style lang="less" scoped>
.movie-infocards {
  position: absolute;
  width: 50%;
  top: 200px;
  right: 40px;
  .title {
    width: 400px;
    font-size: 46px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .year {
      width: 120px;
      height: 20px;
      display: flex;
      align-items: center;
      font-weight: bold;
      .icon {
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }
      .date {
        font-size: 16px;
      }
    }
    .rate {
      display: flex;
      align-items: center;
      margin-left: 60px;
      .type {
        color: #ff0066;
        font-weight: bold;
      }
      .num {
        margin-left: 4px;
        font-weight: bold;
      }
    }
  }
  .overview {
    max-height: 110px;
    overflow: hidden;
    margin-top: 20px;
  }
  .btn {
    margin-top: 50px;
    width: 125px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    border: none;
    outline: none;
    border-radius: 8px;
    background: rgba(255, 0, 102, 0.7);
    color: #fff;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background: rgba(255, 0, 102, 1);
    }
  }
}
</style>