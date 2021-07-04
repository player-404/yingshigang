<template>
  <div class="popular">
    <div class="top">
      <div class="left">
        <div class="left-icon">
          <img src="@/assets/images/trending.png" />
        </div>
        <div class="left-text">最近流行的</div>
      </div>
    </div>
    <i class="line"></i>
    <div class="slide">
        <item-slide :data="geners" type="popular"/>
        <pop-swiper />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ItemSlide from "./ItemSlide.vue";
import PopSwiper from './PopSwiper.vue'
import { movieGenres } from '@/utils/configuration'
export default defineComponent({
  components: { ItemSlide, PopSwiper },
  setup() {
    let geners= ref<any[]>(movieGenres);
    return {
      geners
    }
  },
});
</script>
<style lang="less" scoped>
.popular {
  .top {
    display: flex;
    justify-content: space-between;
    height: 100px;
    padding: 0 100px;
    .left {
      display: flex;
      align-items: center;
      .left-icon {
        width: 30px;
        height: 30px;
        img {
          width: 100%;
        }
      }
      .left-text {
        font-size: 20px;
        margin: 0 10px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      color: #65666e;
      .right-popular {
        display: flex;
        align-items: center;
        .popular-icon {
          width: 20px;
          height: 20px;
          img {
            width: 100%;
          }
        }
      }
      .right-new {
        display: flex;
        align-items: center;
        margin-left: 40px;
        .el-icon-star-on {
          font-size: 20px;
        }
      }
    }
  }
  .line {
      display: block;
      width: calc(100% - 200px);
      height: 2px;
      background-color: #65666E;
      margin: auto;
  }
}
</style>
