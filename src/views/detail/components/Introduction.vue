<template>
  <div class="introduction">
    <el-image
      :src="`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${backImage.file_path}`"
      fit="cover"
      style="width: 100%; height: 100%"
      v-if="backImage"
    />
    <over-lays>
      <div class="story" v-if="data.overview">{{ ellipsis(450, data.overview) }}</div>
      <div class="no-data" v-else>暂无简介</div>
    </over-lays>
  </div>
</template>
<script lang="ts">
import OverLays from "@/components/OverLays.vue";
import { defineComponent, ref, toRef } from "vue";
import { ellipsis } from '@/utils/tool'
interface Obj {
  [propName: string]: any;
}
export default defineComponent({
  components: { OverLays },
  props: {
    background: Object,
    datas: Object,
  },
  setup(props) {
    const image = toRef(props, 'background');
    let data = ref<Obj>();
    let backImage = ref<Obj>();

    if (image.value) {
      console.log("images", image.value.backdrops);
      backImage.value = image.value.backdrops[1] || image.value.backdrops[0];
    }
    if (props.datas) {
      data.value = props.datas;
    }
    return {
      backImage,
      data,
      ellipsis
    };
  },
});
</script>
<style lang="less" scoped>
.introduction {
  width: 100%;
  height: 100%;
  position: relative;
  .no-data {
      position: absolute;
      top: 200px;
      left: 200px;
      font-size: 30px;
      font-weight: bold;
  }
  .story {
    position: absolute;
    left: 200px;
    top: 200px;
    width: 680px;
    font-size: 23px;
    font-weight: bold;
  }
}
</style>
