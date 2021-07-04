<template>
  <div class="actor">
    <el-image
      v-loading="loading"
      fit="cover"
      :src="`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${backImage.file_path}`"
      @load="load"
      class="imag-container"
      style="width: 100%; height: 100%"
      v-if="backImage"
    />
    <over-lays>
      <div class="content">
        <actor-slide />
      </div>
    </over-lays>
  </div>
</template>
<script lang="ts">
import OverLays from "@/components/OverLays.vue";
import { defineComponent, ref, toRef } from "vue";
import ActorSlide from "./ActorSlide.vue";
export default defineComponent({
  components: { ActorSlide, OverLays },
  props: {
    background: Object,
    datas: Object,
  },
  setup(props) {
    let backImage = ref<[]>();
    let loading = ref<boolean>(true);
    let image = toRef(props, 'background')
    if (image.value) {
      backImage.value =image.value.length > 0 ? image.value.backdrops[4] : image.value.backdrops[0];
    }
    function load(): void {
      loading.value = false;
    }
    return {
      backImage,
      loading,
      load,
    };
  },
});
</script>
<style lang="less" scoped>
.actor {
  width: 100%;
  height: 100%;
  position: relative;
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }
}
</style>