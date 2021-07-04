<template>
  <div class="page-head">
    <search-btn width="500px" height="30px" class="search" />
    <i class="back" @click="back"
      ><img src="@/assets/images/back2.png" alt="back"
    /></i>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import searchBtn from "@/components/searchBtn.vue";
import { classify, movieGenres, language, year } from "../utils/data";
import { useRouter } from "vue-router";
export default defineComponent({
  components: { searchBtn },
  setup() {
    const router = useRouter();
    let drawer = ref<boolean>(false);
    let classifys = ref<any[]>(classify);
    let classifySelect = ref<string>("");
    let genres = ref<any[]>(movieGenres);
    let genreSelect = ref<string>("");
    let languages = ref<any[]>(language);
    let lanSelect = ref<string>("");
    let years = ref<any[]>(year);
    let yearSelect = ref<string>("");
    function back(): void {
      router.go(-1);
    }
    return {
      drawer,
      classifys,
      classifySelect,
      genres,
      genreSelect,
      languages,
      lanSelect,
      years,
      yearSelect,
      back,
    };
  },
});
</script>
<style lang="less" scoped>
.page-head {
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 7vw;
  .back {
    display: inline-block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .classify {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  :deep(.el-input__inner) {
    border: none;
  }
  .text {
    color: #000;
    font-size: 14px;
  }
}
</style>
