<template>
  <button class="btn">更多{{ title }}</button>
</template>
<script lang="ts">
import { defineComponent, toRef } from "vue";

export default defineComponent({
  props: {
    title: String,
  },
  setup(props) {
    const title = toRef(props, "title");
    return {
      title,
    };
  },
});
</script>
<style lang="less" scoped>
.btn {
  padding: 10px 20px;
  font-size: 16px;
  margin: auto;
  border: 1px solid #ffffff;
  outline: none;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0);
  color: #fff;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    animation: color 10s infinite;
    border: 1px solid transparent;
  }
}
@keyframes color {
  0% {
    background-color: rgb(18, 161, 130, 1);
    box-shadow: 2px 2px 14px rgba(18, 161, 130, 0.6);
  }
  50% {
    background-color: rgba(102, 193, 140, 1);
    box-shadow: 2px 2px 14px rgba(102, 193, 140, 0.6);
  }
  100% {
    background-color: rgba(67, 178, 68, 1);
    box-shadow: 2px 2px 14px rgba(67, 178, 68, 0.6);
  }
}
</style>