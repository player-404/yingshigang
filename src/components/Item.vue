<template>
  <div class="item" :style="style" @click="click" ref="item" v-if="data">
    <div class="cover">
      <el-image :src="`https://image.tmdb.org/t/p/w500${data.poster_path}`" style="width: 100%; height: 100%" fit="cover">
        <template #error>
          <no-back-drop />
        </template>
      </el-image>
    </div>
    <div class="info">
      <div class="name">{{ data[info.name] }}</div>
      <div class="bot">
        <div class="left">{{ data[info.date] }}</div>
        <div class="right">
          <i class="el-icon-star-on"></i>
          <span class="num">{{ data.vote_average }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import NoBackDrop from "./NoBackDrop.vue";
interface Data {
  name: string;
  date: string;
}
export default defineComponent({
  components: { NoBackDrop },
  props: {
    width: String,
    height: String,
    data: Object,
    type: String,
  },
  setup(props) {
    const item = ref<any>(null);
    let data = props.data;
    const style = computed((): string => {
      let style: string = "";
      props.width ? (style += `width: ${props.width}`) : "";
      props.height ? (style += `height: ${props.height}`) : "";
      return style;
    });
    const info = computed<Data>(
      (): Data => {
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
      }
    );
    return {
      style,
      item,
      data,
      info,
    };
  },
});
</script>

<style lang="less" scoped>
.item {
  width: 208px;
  height: 400px;
  border-radius: 14px;
  cursor: pointer;
  .cover {
    width: 100%;
    height: 300px;
    border-radius: 14px;
    background-color: plum;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .info {
    margin-top: 20px;
    color: #fff;
    padding: 0 10px;
    .name {
      font-size: 20px;
      font-weight: bold;
    }
    .bot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      .el-icon-star-on {
        color: #fcb200;
        margin-left: 8px;
        font-size: 18px;
      }
    }
  }
}
</style>