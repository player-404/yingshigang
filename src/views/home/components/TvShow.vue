<template>
  <div class="tv-show">
    <div class="top">
      <div class="left">
        <div class="icon">
          <img src="@/assets/images/TV.png" title="icon" />
        </div>
        <div class="text">电视节目</div>
      </div>
      <div class="right"></div>
    </div>
    <i class="line"></i>
    <!-- 类型选项卡 -->
    <item-slide :data="genres" :width="'100%'" type="TVShow" />
    <!-- 选项 -->
    <tvshow-item />
    <div class="more">
      <el-button round size="medium" class="btn" @click="toClassify">更多</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemSlide from "./ItemSlide.vue";
import { tvGenres } from "@/utils/configuration";
import { ref } from "vue";
import TvshowItem from "./TvshowItem.vue";
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { ItemSlide, TvshowItem },
  setup() {
    let genres = ref<any[]>(tvGenres);
    const router = useRouter();
    function toClassify(): void {
      router.push({name: 'classify'})
    }
    return {
      genres,
      toClassify
    };
  },
});
</script>
<style lang="less" scoped>
.tv-show {
  padding: 0 100px;
  overflow: auto;
  .top {
    display: flex;
    justify-content: space-between;
    height: 100px;
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
        }
      }
      .text {
        font-size: 20px;
        margin-left: 8px;
      }
    }
  }
  .line {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #65666e;
    margin: auto;
  }
  .more {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    .btn {
      background-color: #1e1d21;
      border: none;
      color: #fff;
      font-weight: bold;
      margin: auto;
    }
  }
}
</style>