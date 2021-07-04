<template>
  <div class="cont">
    <p class="text">
      Hi，这里是你的主页，用来展示你的生活和发现，也是别人认识你的地方。
    </p>
    <div class="upload-av">
      <i class="number">1</i>
      <button @click.stop="av">上传头像</button>
    </div>
    <div class="upload-info">
      <i class="number">2</i>
      <button  @click.stop="infoClick">设置信息</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits:['avClick', 'infoClicks'],
  setup(props, {attrs, slots, emit }) {
    function av(): void {
      emit("avClick", false);
    }
    function infoClick(): void {
      emit('infoClicks', true);
    }
    return {
      av,
      infoClick
    }
  },
});
</script>
<style lang="less" scoped>
.cont {
  width: 80%;
  margin: 80px auto;
  height: 300px;
  background-color: #1e1d21;
  border-radius: 14px;
  .text {
    padding-top: 20px;
    font-size: 20px;
    text-align: center;
  }
  .number {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #b9b9b9;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  button {
    border: none;
    width: 100px;
    height: 40px;
    background-color: #b9b9b9;
    color: #fff;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #97c09a;
    }
  }
  .upload-av {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 40px;
  }
  .upload-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
