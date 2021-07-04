<template>
  <div
    class="tv-show-item"
    v-loading="loadStatus"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-empty description="空空如也" v-if="!data"></el-empty>
    <ul class="container">
      <li v-for="(item, index) in data" :key="index" class="item-container">
        <item
          :ref="
            (el) => {
              if (el) items[index] = el;
            }
          "
          class="item"
          @click.stop="click(index)"
          :class="{ active: activeIndex === index }"
          :data="item"
          type="TV"
        />
      </li>
    </ul>
    <transition name="fade">
      <detail
        :pos="pos"
        v-show="activeIndex != -1"
        @close="close"
        :datas="data"
        :activeIndex="activeIndex"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "@/store";
import Item from "@/components/Item.vue";
import { getPos } from "../event";
import Detail from "@/components/Detail.vue";
import { Pos } from "../utils/interface";
import { getTVPopular } from "@/netWork/homeRequeat";
import { getTvDiscover } from "../utils/tools";
export default defineComponent({
  components: { Item, Detail },
  setup() {
    let activeIndex = ref<number>(-1);
    let items = ref<any[]>([]);
    let pos = ref<Pos>({ x: 0, y: 0 });
    let data = ref<any>();
    const store: any = useStore();
    let loadStatus = ref<boolean>(true);
    // 点击item
    function click(index: number): void {
      activeIndex.value = index;
      const ele = items.value[activeIndex.value].item;
      pos.value = getPos(ele);
    }
    // 关闭详情显示
    function close(): void {
      activeIndex.value = -1;
    }
    //获取最近流行的电视节目
    async function getTVData() {
      const result = await getTVPopular();
      data.value = result.data.results;
      loadStatus.value = false;
    }
    //关闭
    function closeDetail(): void {
      window.onresize = () => {
        if (activeIndex.value === -1) return;
        activeIndex.value = -1;
      };
    }
    const tvGrnres = computed(() => {
      if (store.state.home.tvGenres.length > 0) {
        return store.state.home.tvGenres;
      }
      return null;
    });

    onMounted(() => {
      getTVData();
      closeDetail();
    });
    watch(
      tvGrnres,
      (newv, oldv) => {
        data.value = [];
        loadStatus.value = true;
        if (newv) {
          const genres: string = newv.join();
          getTvDiscover(genres).then((datas) => {
            loadStatus.value = false;
            data.value = datas.length > 0 ? datas : "";
          });
        } else {
          getTVData();
        }
      },
      { deep: true }
    );
    return {
      click,
      activeIndex,
      items,
      pos,
      close,
      data,
      loadStatus,
    };
  },
});
</script>
<style lang="less" scoped>
.tv-show-item {
  position: relative;
  min-height: 700px;
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .item {
      margin: 0px 50px 50px 50px;
      transition: all 0.3s;
      &.active {
        position: relative;
        z-index: 2;
        transform: scale(1.05);
        box-shadow: 2px 2px 25px rgba(255, 255, 255, 0.3);
      }
    }
  }

  .fade-enter-active {
    animation: enter 0.3s;
  }
  .fade-leave-active {
    animation: leave 0.3s;
  }
  @keyframes enter {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes leave {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
