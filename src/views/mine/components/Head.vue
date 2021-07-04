<template>
  <div class="header">
    <div class="avatar">
      <el-image style="width: 100%; height: 100%" fit="cover" :src="imgurl" />
    </div>
    <div class="right">
      <div class="name">{{ username || "用户1" }}</div>
      <div class="info">{{ info || "没有自我介绍哦~" }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, toRef, watch, watchEffect } from "vue";
import { docCookies } from '@/utils/tool'
import { Stroage } from '@/types/index'
export default defineComponent({
  props: {
    fileUrl: String,
    username: String,
    info: String,
  },
  setup(props) {
    let imgurl = ref<ArrayBuffer>();
    let url = toRef(props, "fileUrl");
    let name = toRef(props, "username");
    let infoStr = toRef(props, "info");
    let encodeAccount: string = docCookies.getItem("account") || "";
    let account: string = decodeURIComponent(encodeAccount) || "";
    let storage = localStorage.getItem(account);
    let data: Stroage =storage ? JSON.parse(storage) : '';
    let localImg = ref<string>(data.userAvatar);
    let username = ref<string>(data.username)
    let info = ref<string>(data.info);
    if (!imgurl.value && localImg.value) {
      imgurl.value = JSON.parse(localImg.value);
    }

    watch([url, name, infoStr], (newv, oldv) => {
      if (newv[0]) {
        imgurl.value = JSON.parse(newv[0]);
      }
      if (newv[1]) {
        username.value = newv[1];
      }
      if (newv[2]) {
        info.value = newv[2];
      }
    });
    return {
      imgurl,
      username,
      info,
    };
  },
});
</script>
<style lang="less" scoped>
.header {
  width: 80%;
  height: 150px;
  background-color: #1e1d21;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .avatar {
    width: 120px;
    height: 120px;
    background-color: rosybrown;
    border-radius: 50%;
    margin-left: 40px;
    overflow: hidden;
  }
  .right {
    margin-left: 30px;
    .name {
      align-self: flex-end;
      font-size: 20px;
      font-weight: bold;
      width: 200px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .info {
      font-size: 18px;
    }
  }
}
</style>
