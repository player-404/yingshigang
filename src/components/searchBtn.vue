<template>
  <div class="search" :style="`width: ${width}; height: ${height}`">
    <span class="search-icon" @click="search">
      <img src="@/assets/images/search.png" />
    </span>
    <input
      type="text"
      @focus="focus"
      @blur="blur"
      :class="{ active: active }"
      v-model.trim="keywords"
    />
    <span class="del-icon" :class="{ 'del-active': active }" @click="clear">
      <img src="@/assets/images/del.png" />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";
export default defineComponent({
  props: {
    width: String,
    height: String,
    defaultWord: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { width = "100%", height = "100%", defaultWord } = toRefs(props);
    const active = ref<boolean>(false);
    const keywords = ref<string>("");
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    keywords.value = defaultWord.value;
    function focus(): void {
      active.value = true;
    }
    function blur(): void {
      active.value = false;
    }
    function clear(): void {
      keywords.value = "";
      active.value = false;
    }
    function search(): void {
      store.commit("search/setKeyword", keywords.value);
      if (route.path != "/search") {
        router.push({ name: "search" });
      }
    }
    return {
      width,
      height,
      focus,
      blur,
      active,
      keywords,
      clear,
      search,
    };
  },
});
</script>
<style lang="less" scoped>
.search {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 10px;
  border-radius: 20px;
  position: relative;
  .search-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .del-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    opacity: 0;
    transition: opacity 0.4s;
    cursor: pointer;
    &.del-active {
      opacity: 1;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  input {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: none;
    outline: none;
    transition: border 0.3s;
    background-color: transparent;
    font-size: 18px;
    text-indent: 1em;
  }
  .tips {
    width: 100%;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 20px;
    border-radius: 14px;
    overflow-x: hidden;
    .tips-item {
      width: 100%;
      height: 100%;
      color: #000;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;
      > li {
        font-size: 18px;
        padding: 10px 20px;
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
}
</style>