<template>
  <div class="recommend" v-loading="load">
    <over-lays class="lays">
      <div class="for-you">为你推荐</div>
      <info-cards :data="datas" :type="type" />
    </over-lays>
    <div class="cont" v-if="datas">
      <el-image
        :src="`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${datas.backdrop_path}`"
        style="width: 100%; height: 100%"
        fit="cover"
        class="image"
      />
    </div>
  </div>
</template>
<script lang="ts">
import InfoCards from "./InfoCards.vue";
import OverLays from "./OverLays.vue";
import { defineComponent, ref, toRef } from "vue";
import { getDayRecommend } from "@/utils/tool";
interface Obj {
  [propName: string]: any;
}
export default defineComponent({
  components: { OverLays, InfoCards },
  props: {
    type: {
      type: String,
      default: "movie",
    },
  },
  setup(props) {
    const datas = ref<Obj | null>(null);
    const type = toRef(props, 'type')
    let load = ref<boolean>(true);
    getDayRecommend(props.type || "").then((data) => {
      load.value = false;
      datas.value = data;
    });
    return {
      datas,
      load,
      type
    };
  },
});
</script>
<style lang="less" scoped>
.recommend {
  width: 85%;
  height: 600px;
  background-color: red;
  margin: 100px auto 0;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  -webkit-appearance: none;
  &:hover {
    .cont > .image {
      transform: scale(1.1);
    }
  }
  .for-you {
    position: absolute;
    right: 40px;
    top: 40px;
    font-size: 14px;
    border: 1px solid #ff0066;
    padding: 5px 25px;
    border-radius: 4px;
    overflow: hidden;
  }
  .cont {
    width: 100%;
    height: 100%;
    .image {
      transition: transform 1s;
    }
  }
  .lays {
    cursor: pointer;
  }
}
</style>
