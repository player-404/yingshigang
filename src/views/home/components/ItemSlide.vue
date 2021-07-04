<template>
  <div class="item-slide" :style="style">
    <div
      class="btn"
      @mouseover="over('left')"
      @mouseout="out('left')"
      @click="left"
    >
      <img src="@/assets/images/left_active.png" v-if="leftBtnActive" />
      <img src="@/assets/images/left.png" v-else />
    </div>
    <div class="container">
      <ul class="item-tabs" ref="itemTabs">
        <li
          v-for="(item, index) in genres"
          :key="index"
          class="item-btn"
          ref="itemBtn"
          @click="itemClick(item.id, index)"
          :class="{ active: item.select }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div
      class="btn right-btn"
      @mouseover="over('right')"
      @mouseout="out('right')"
      @click="right"
    >
      <img src="@/assets/images/right_active.png" v-if="rightBtnActive" />
      <img src="@/assets/images/right.png" v-else />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  toRef,
  watch,
} from "vue";
import { useStore } from '@/store'
import { getMPopular } from '@/netWork/homeRequeat'
import { mapMutations } from "vuex";
export default defineComponent({
  props: {
    data: Array,
    width: String,
    type: String
  },
  setup(props: any) {
    let leftBtnActive = ref<boolean>(false);
    let rightBtnActive = ref<boolean>(false);
    const genres = toRef(props, 'data');
    let itemTabs = ref<any>(null);
    let itemBtn = ref<any>(null);
    let style = ref<string>('');
    const store: any = useStore();
    props.width ? style.value += `width: ${props.width}`: '';
    //电影类型选择左右按钮 hover 效果
    function over(type: string): void {
      if (type === "left") {
        leftBtnActive.value = true;
        return;
      }
      rightBtnActive.value = true;
    }
    function out(type: string): void {
      if (type === "left") {
        leftBtnActive.value = false;
        return;
      }
      rightBtnActive.value = false;
    }

    //电影类型选择
    let distance: number = 0;
    let width: number = 0;
    let limit: number;

    //左按钮触发
    function left(): void {
      if (distance === 0) return;
      distance -= width;
      itemTabs.value.style["transform"] = `translateX(-${distance}px)`;
    }

    //右按钮触发
    function right(): void {
      if (distance === limit) return;
      distance += width;
      itemTabs.value.style["transform"] = `translateX(-${distance}px)`;
    }

    //类型按钮点击
    let type = ref<number[]>([]);
    function itemClick(id: number, index: number): void {
      genres.value[index].select = !genres.value[index].select;
      if (genres.value[index].select) {
        type.value.push(id);
        return;
      }
      let inx: number;
      inx = type.value.findIndex((item): boolean => {
        return id === item;
      });
      type.value.splice(inx, 1);
    }

    onMounted(() => {
      width = itemBtn.value.offsetWidth + 20;
      limit = width * genres.value.length;
    });
    
    watch(type, (newV, oldV) => {
      if (props.type === 'popular') {
        store.commit('home/setMovieGenres', newV);
      }
      if (props.type === 'TVShow') {
        store.commit('home/setTvGenres', newV)
      }
    }, {deep: true});
    return {
      genres,
      rightBtnActive,
      leftBtnActive,
      over,
      out,
      left,
      right,
      itemTabs,
      itemBtn,
      itemClick,
      type,
      style
    };
  },
});
</script>
<style lang="less" scoped>
.item-slide {
  width: calc(100% - 140px);
  margin: auto;
  display: flex;
  align-items: center;
  .btn {
    width: 25px;
    height: 20px;
    cursor: pointer;
    img {
      height: 100%;
    }
  }
  .right-btn {
    margin-left: 10px;
  }
  .container {
    margin: 40px 0;
    width: 100%;
    height: 55px;
    line-height: 55px;
    overflow: hidden;
    .item-tabs {
      left: 0;
      white-space: nowrap;
      transition: all 0.5s;
      .item-btn {
        display: inline-block;
        width: 120px;
        height: 40px;
        border-radius: 40px;
        margin: 0 10px;
        background-color: #1e1d21;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        transition: all 0.3s;
        &.active {
          background-color: #d91722;
          font-weight: bold;
        }
      }
      .item-btn:hover {
        box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
        font-weight: bold;
      }
    }
  }
}
</style>
