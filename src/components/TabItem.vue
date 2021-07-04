<template>
  <div class="container">
    <ul class="tabItem">
      <li
        v-for="(item, index) in item"
        :key="index"
        class="item"
        @click="itemClick(index, item.name)"
      >
        <div class="item-container">
          <span
            class="item-text"
            :class="{ active: $route.name === item.value }"
            >{{ item.name }}</span
          >
          <i
            class="doit"
            v-show="$route.name === item.value"
            :class="{ show: $route.name === item.value }"
          ></i>
        </div>
      </li>
      <li class="item" @click="search"><i class="el-icon-search"></i></li>
    </ul>
  </div>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__zoomIn animate__faster "
    leave-active-class="animate__animated animate__zoomOut animate__faster"
  >
    <div class="search-box" :class="{ active: display }" v-if="display">
      <div class="search-text">搜索</div>
      <div class="ipt">
        <search-btn width="100%" height="100%" />
      </div>
      <i class="close" @click="close">
        <img src="@/assets/images/close.png" />
      </i>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, inject, watchEffect, watch } from "vue";
import { useRouter } from "vue-router";
import OverLays from "./OverLays.vue";
import SearchBtn from "./searchBtn.vue";
export default defineComponent({
  components: { OverLays, SearchBtn },
  setup() {
    const item = ref<any[]>([
      { name: "首页", index: 0, value: "Home" },
      { name: "电影", index: 1, value: "movie" },
      { name: "电视", index: 2, value: "tvShow" },
      { name: "我的", index: 3, value: "mine" },
    ]);
    let activeIndex = ref<number>(0);
    let display = ref<boolean>(false);
    const router = useRouter();
    function itemClick(index: number, item: string): void {
      activeIndex.value = index;
      switch (item) {
        case "电影":
          router.push({ name: "movie" });
          break;
        case "电视":
          router.push({ name: "tvShow" });
          break;
        case "首页":
          router.push({ name: "Home" });
          break;
        case "我的":
          router.push({ name: "mine" });
      }
    }
    function search(): void {
      display.value = true;
    }
    function close(): void {
      display.value = false;
    }
    return {
      activeIndex,
      item,
      display,
      top,
      close,
      itemClick,
      search,
    };
  },
});
</script>
<style lang="less" scoped>
.search-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 800px;
  height: 400px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  transition: all 1s;
  border-radius: 14px;
  flex-direction: column;
  .search-text {
    font-size: 30px;
    font-weight: bold;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .ipt {
    margin-top: 60px;
    width: 600px;
    height: 40px;
  }
}
.container {
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  .tabItem {
    display: flex;
    flex-direction: row;
    .item {
      cursor: pointer;
      padding: 0 20px;
      .el-icon-search {
        color: #fff;
        font-size: 16px;
      }
      .item-container {
        width: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .doit {
          margin-top: 6px;
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: red;
          animation: show 1s;
          @keyframes show {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 100%;
            }
          }
        }
        .item-text {
          font-size: 16px;
          font-weight: bold;
          color: #979797;
          transition: 1s all;
          &.active {
            color: #fff;
          }
          @keyframes size {
            0% {
              transform: 16px;
            }
            100% {
              transform: 20px;
            }
          }
        }
      }
    }
  }
}
</style>