<template>
  <div class="actor-slide">
    <div class="wrapper" ref="wrapper">
      <div
        class="content"
        v-for="(item, index) in pages"
        :key="index"
        :ref="
          (el) => {
            if (el) items[index] = el;
          }
        "
      >
        <div class="container" v-if="itemDatas.length > 0">
          <div
            class="item"
            v-for="(current, i) in itemDatas[index]"
            :key="i"
            @click="toActor(current.id)"
          >
            <div class="top">
              <el-image
                style="width: 100%; height: 100%"
                fit="cover"
                :src="`https://www.themoviedb.org/t/p/w276_and_h350_face/${current.profile_path}`"
              >
              <template #error>
                <error-img />
              </template>
              </el-image>
            </div>
            <div class="bottom">{{ current.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="contronal" v-if="pages">
      <el-tooltip content="没有啦" :disabled="current != 0">
        <div class="pre" @click.stop="pre">
          <img src="@/assets/images/pre.png" alt="pre" />
        </div>
      </el-tooltip>
      <div class="pages">
        {{ current + 1 >= 10 ? current + 1 : `0${current + 1}` }} /
        {{ pages >= 10 ? pages : `0${pages}` }}
      </div>
      <el-tooltip content="没有啦" :disabled="current != pages - 1">
        <div class="next" @click.stop="next">
          <img src="@/assets/images/next.png" alt="next" />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script lang="ts">
import ErrorImg from "@/components/ErrorImg.vue";
import {
  defineComponent,
  onBeforeUpdate,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTvSeasonData, Obj, getCreditsData } from "../utils/tool";
interface Data {
  [propName: string]: any;
}

export default defineComponent({
  components: { ErrorImg },
  setup() {
    let percentage = ref<number>();
    let route = useRoute();
    let { type } = route.query;
    let id: unknown = route.query.id;
    let current = ref<number>(0);
    let pages = ref<number>(0);
    let items = ref<any[]>([]);
    let elWidth = ref<number>(0);
    let wrapper = ref<any>();
    let datas = ref<any[]>([]);
    let itemDatas = ref<any[]>([]);
    let router = useRouter();
    // 获取数据

    getCreditsData(type, id as number).then((data: any[]) => {
      datas.value.push(...data);
      pages.value =
        data.length % 8 === 0
          ? data.length / 8
          : Math.trunc(data.length / 8) + 1;
      for (let i = 0; i <= pages.value; i++) {
        let arr: any[] = [];
        arr.push(...datas.value.splice(0, 8));
        itemDatas.value.push(arr);
      }
    });
    //上一页
    function pre(): void {
      if (current.value <= 0) return;
      current.value--;
      const distance = current.value * (elWidth.value + 80);
      if (wrapper.value) {
        wrapper.value.style.transform = `translateX(-${distance}px)`;
      }
    }
    //下一页
    function next(): void {
      if (current.value >= pages.value - 1) return;
      current.value++;
      const distance = current.value * (elWidth.value + 80);
      if (wrapper.value) {
        wrapper.value.style.transform = `translateX(-${distance}px)`;
      }
    }
    //跳转演员详情页面
    function toActor(id: number) {
       router.push({name: 'actor', query: {id: id}})
    }
    onBeforeUpdate(() => {
      items.value = [];
      wrapper.value = null;
    });
    watch(items, (newv, oldv) => {
      if (newv) {
        elWidth.value = newv[0].offsetWidth;
      }
    });
    return {
      percentage,
      pages,
      current,
      pre,
      next,
      toActor,
      items,
      wrapper,
      datas,
      itemDatas,
    };
  },
});
</script>
<style lang="less" scoped>
.actor-slide {
  width: 1000px;
  height: 600px;
  margin-top: 200px;
  margin-left: 60px;
  position: relative;
  overflow: hidden;
  .wrapper {
    position: absolute;
    white-space: nowrap;
    transition: transform 1s;
    .content {
      display: inline-block;
      width: 900px;
      height: 500px;
      margin: 0 40px;
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .item {
          margin: 10px 10px;
          width: 200px;
          height: 200px;
          overflow: hidden;
          cursor: pointer;
          &:hover .top {
            transform: scale(1.1);
          }
          &:hover .bottom {
            transform: translateY(0px);
            opacity: 1;
          }
          .top {
            margin: 0 auto;
            width: 150px;
            height: 150px;
            background-color: aquamarine;
            border-radius: 50%;
            transition: transform 0.6s;
            margin-top: 10px;
            border-radius: 50%;
            overflow: hidden;
          }
          .bottom {
            width: 100%;
            text-align: center;
            transform: translateY(50px);
            opacity: 0;
            transition: all 0.6s;
            margin-top: 15px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .contronal {
    position: absolute;
    bottom: 10px;
    width: 150px;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    justify-content: space-between;
    align-items: center;
    .pre {
      width: 30px;
      height: 30px;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    .next {
      width: 30px;
      height: 30px;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    .pages {
      height: 30px;
      line-height: 30px;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
