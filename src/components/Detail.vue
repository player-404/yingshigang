<template>
  <div class="details" :style="style" v-if="data">
    <div class="info">
      <over-lays>
        <info-cards type="TV" :data="data" />
        <div class="close" @click="close">
          <img src="@/assets/images/close.png" alt="close" />
        </div>
      </over-lays>
    </div>
    <i class="arrows" :style="arrowsStyle" v-if="up"></i>
    <i class="arrows-down" :style="arrowsStyle" v-else></i>
    <div class="cover">
      <img
        :src="`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`"
        alt="cover"
      />
    </div>
  </div>
</template>
<script lang="ts">
import InfoCards from "@/components/InfoCards.vue";
import TvIndexVue from "@/views/detail/components/TvIndex.vue";
import { defineComponent, ref, toRef, watch, watchEffect } from "vue";
import OverLays from "./OverLays.vue";
export default defineComponent({
  components: { InfoCards, OverLays },
  props: {
    pos: Object,
    datas: Array,
    activeIndex: Number,
  },
  emits: ["close"],
  setup(props, { attrs, slots, emit }) {
    let style = ref<string>("");
    let arrowsStyle = ref<string>();
    let activeIndex = toRef(props, "activeIndex");
    let up = ref<boolean>(true);
    //当前选中tab的数据
    let data = ref<unknown>();
    function close(): void {
      emit("close");
    }
    watch(
      () => props.pos,
      (newv: any, oldv) => {
        let index = String(activeIndex.value);
        if (index === '-1') return;
        if (Number(TvIndexVue) >= 15 && Number(index) <= 20) {
          up.value = false;
          style.value = `top: ${newv.y - 1160}px`;
          arrowsStyle.value = `transform: translateX(${newv.x - 10}px)`;
          return;
        }
        up.value = true;
        style.value = `top: ${newv.y + 60}px`;
        arrowsStyle.value = `transform: translateX(${newv.x - 10}px)`;
      }
    );
    watchEffect(() => {
      let index: string = String(activeIndex.value);
      if (activeIndex.value === -1) return;
      if (index && props.datas) {
        data.value = props.datas[Number(index)];
      }
    });
    return {
      style,
      arrowsStyle,
      close,
      data,
      up,
    };
  },
});
</script>

<style lang="less" scoped>
.details {
  width: 100%;
  height: 700px;
  position: absolute;
  background-color: #1e1d21;
  border-radius: 14px;
  .cover {
    width: 100%;
    height: 100%;
    border-radius: 14px;
    overflow: hidden;
    img {
      height: 100%;
    }
  }
  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 50px;
    top: 50px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .arrows {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #000000;
    position: absolute;
    top: -40px;
  }
  .arrows-down {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 20px solid #000000;
    border-right: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid transparent;
    position: absolute;
    bottom: -40px;
  }
}
</style>


