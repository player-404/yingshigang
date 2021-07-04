<template>
  <div class="head">
    <ul class="container">
      <li v-for="(item, index) in data" :key="index" @click="click(index)">
        <span>{{item.name}}</span>
        <i class="line" :class="{active: activeIndex === item.index}"></i>
      </li>
    </ul>
  </div>
  <i class="back" @click="back"><img src="@/assets/images/back2.png" alt="back"></i>
</template>
<script lang="ts">
import { defineComponent, ref, inject } from "vue";
import { datas } from '../utils/data'
import { useStore} from '@/store'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    let data = ref<any[]>(datas);
    let activeIndex = inject('activeIndex', 0);
    const store = useStore();
    const router = useRouter();
    function click(index: number): void {
      store.commit('detail/changeIndex', index);
    }
    //返回
    function back(): void {
      router.go(-1)
    }
    return {
        data,
        activeIndex,
        click,
        back
    }
  },
});
</script>

<style lang="less" scoped>
.back {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 2;
  right: 200px;
  top: 10px;
  cursor: pointer;
  transition: transform .3s;
  &:hover {
    transform: scale(1.1);
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.head {
  position: absolute;
  left: 200px;
  top: 0;
  width: 40vw;
  height: 60px;
  z-index: 2;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >li {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      .line {
        display: block;
        height: 4px;
        background-color: #fff;
        width: 0; 
        margin: 8px auto 0;
        border-radius: 14px;
        &.active {
          animation: line .5s;
          width: 70%;
        }
      }
    }
  }
}
@keyframes line {
  0% {
    width: 0%;
  }
  100% {
    width: 70%;
  }
}
</style>