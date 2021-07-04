<template>
  <div class="header">
    <h2 class="title">{{ title }}</h2>
    <div class="more" @click="toMoreDetail">更多</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRef, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
export default defineComponent({
  props: {
    title: String,
    type: String,
    name: String
  },
  setup(props) {
    const title = toRef(props, "title");
    const {type, name} = toRefs(props);
    const router = useRouter();
    const store = useStore();
    function toMoreDetail(): void {
      router.push({name: 'moreDetail', query: {name: name.value, type: type.value }})
    }
    return {
      title,
      toMoreDetail,
    };
  },
});
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    color: #ffffff;
    margin: 4vh 0;
  }
  .more {
    cursor: pointer;
    color: #65666e;
    font-weight: bold;
    &:hover {
      color: #ffffff;
    }
  }
}
</style>