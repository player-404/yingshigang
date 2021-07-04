<template>
  <div class="filter">
    <ul class="classify">
      <li
        v-for="(item, index) in classifys"
        :key="index"
        @click="classifyClick(item)"
        :class="{ active: item.value == classifySelect }"
      >
        {{ item.label }}
      </li>
    </ul>
    <ul class="classify">
      <li
        v-for="(item, index) in grnresArr"
        :key="index"
        :class="{ active: item.value === genres }"
        @click="genresClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <ul class="classify">
      <li
        v-for="(item, index) in languages"
        :key="index"
        @click="lanClick(item)"
        :class="{ active: item.value === lan }"
      >
        {{ item.label }}
      </li>
    </ul>
    <ul class="classify">
      <li
        v-for="(item, index) in years"
        :key="index"
        @click="yearClick(item)"
        :class="{ active: item.value === y }"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, toRef, watch } from "vue";
import { classify, movieGenres, tvGenres, language, year } from "../utils/data";
import { Item } from "@/types/index";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store: any = useStore();

    const classifySelect = computed(() => store.state.classify.classify);
    const classifys = ref<any[]>(classify);

    let genres = computed(() => store.state.classify.genres);

    let languages = ref<any[]>(language);
    let lan = computed(() => store.state.classify.language);

    let years = ref<any[]>(year);
    let y = computed(() => store.state.classify.year);

    const grnresArr = computed<any[]>(() => {
      return classifySelect.value === "movie" ? movieGenres : tvGenres;
    });
    //类型选择
    function classifyClick(items: Item): void {
      store.commit("classify/setClassify", items.value);
    }
    //类别选择
    function genresClick(items: Item): void {
      store.commit("classify/setGenres", items.value);
    }
    //语言选择
    function lanClick(items: Item): void {
      store.commit("classify/setLanguage", items.value);
    }
    //年份选择
    function yearClick(items: Item): void {
      store.commit("classify/setYear", items.value);
    }
    watch(classifySelect, () => {
      store.commit("classify/setGenres", "all");
    });
    return {
      classifys,
      grnresArr,
      languages,
      years,
      classifySelect,
      genres,
      lan,
      y,
      lanClick,
      genresClick,
      classifyClick,
      yearClick,
    };
  },
});
</script>
<style lang="less" scoped>
.filter {
  width: 100%;
  margin-top: 50px;
  .classify {
    min-width: 1100px;
    margin-bottom: 20px;
    li {
      display: inline-block;
      margin: 0px 10px 10px;
      padding: 6px 20px;
      cursor: pointer;
      background-color: #1e1d21;
      border-radius: 20px;
      font-size: 14px;
      transition: all 0.4s;
      &:hover {
        box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.6);
      }
      &.active {
        background-color: #d81922;
        color: #fff;
      }
    }
  }
}
.filter-mobile {
  width: 100%;
  :deep(.el-select) {
    border: none;
  }
}
</style>