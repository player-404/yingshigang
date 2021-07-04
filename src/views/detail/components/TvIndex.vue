<template>
  <div class="index">
    <el-image
      style="width: 100%; height: 100%"
      fit="cover"
      :src="`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${data.backdrop_path}`"
      v-if="data.backdrop_path"
    />
    <over-lays>
      <div class="info">
        <div class="title">{{ type === "movie" ? data.title : data.name }}</div>
        <div class="genres-con">
          <el-tag
            v-for="(item, index) in data.genres"
            :key="index"
            class="genres"
            :type="'info'"
            >{{ item.name }}</el-tag
          >
        </div>
      </div>
    </over-lays>
  </div>
</template>

<script lang="ts">
import SeasonsSelect from "@/components/SeasonsSelect.vue";
import { useRoute } from "vue-router";
import { defineComponent, ref, toRef } from "vue";
import Genres from "./Genres.vue";
import OverLays from "@/components/OverLays.vue";
export default defineComponent({
  components: {
    Genres,
    SeasonsSelect,
    OverLays,
  },
  props: {
    indexData: Object,
  },
  name: "index",
  setup(props) {
    const { type } = useRoute().query;
    let data = toRef(props, "indexData");

    return {
      data,
      type,
    };
  },
});
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  .info {
    position: absolute;
    top: 200px;
    left: 200px;
    .title {
      font-size: 80px;
      font-weight: bold;
      letter-spacing: 10px;
      word-spacing: 10px;
      width: 400px;
    }
    .genres-con {
      width: 500px;
      margin-top: 10px;
      .genres {
        border-radius: 20px;
        margin-right: 8px;
      }
    }
  }
}
</style>