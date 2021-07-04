<template>
  <div class="container">
    <div class="tool-bar">
      <i class="back" @click="back"><img src="@/assets/images/back.png" /></i>
      <div class="login-out" @click="loginOut">退出登陆</div>
    </div>
    <item-head :fileUrl="fileURl" :username="name" :info="infoStr" />
    <infomation @avClick="avclick" @infoClicks="infoClicks" />
    <el-dialog v-model="show" width="500px" center title="个人信息">
      <div class="head-avatar" v-if="!type">
        <span class="text">上传头像</span
        ><input
          type="file"
          accept="image/png, image/jpeg"
          @change="change"
          ref="put"
          required
        />
      </div>
      <div class="infomation" v-else>
        <div class="username">
          <span class="text">用户名</span
          ><input
            type="text"
            placeholder="请输入您的用户名"
            maxlength="6"
            v-model="username"
          />
        </div>
        <div class="info">
          <span class="text">自我介绍</span
          ><textarea cols="30" rows="10" maxlength="40" v-model="info" />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import itemHead from "./components/Head.vue";
import infomation from "./components/Infomation.vue";
import { useRouter } from "vue-router";
import { docCookies } from "@/utils/tool";
import { Stroage } from "@/types/index";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {
    itemHead,
    infomation,
  },
  beforeRouteEnter(to, from, next) {
    if (!document.cookie) {
      next({ name: "login" });
    }
    next();
  },
  setup() {
    let show = ref<boolean>(false);
    let type = ref<boolean>(false);
    let imgUrl = ref<string>();
    let put = ref();
    let username = ref<string>();
    let info = ref<string>();
    let fileURl = ref<string>();
    let name = ref<string>();
    let infoStr = ref<string>();
    const router = useRouter();
    let encodeAccount: string = docCookies.getItem("account") || "";
    let account: string = decodeURIComponent(encodeAccount) || "";
    //头像表单
    function avclick(payload: boolean): void {
      show.value = true;
      type.value = payload;
    }
    //信息表单
    function infoClicks(payload: boolean): void {
      show.value = true;
      type.value = payload;
    }
    //提交表单
    function submit() {
      //处理头像上传
      if (!type.value) {
        uploadFile();
      }
      form();
    }
    //表单信息提交
    function form(): void {
      let data: Stroage = JSON.parse(localStorage.getItem(account) || "");
      if (username.value) {
        data.username = username.value;
        name.value = username.value;
      }
      if (info.value) {
        data.info = info.value;
        infoStr.value = info.value;
      }
      //设置本地缓存
      localStorage.setItem(account, JSON.stringify(data));
      show.value = false;
    }
    //上传头像,localstorage
    function uploadFile(): void {
      let file = put.value.files[0];
      let encodeAccount: string = docCookies.getItem("account") || "";
      let account: string = decodeURIComponent(encodeAccount) || "";
      let data: Stroage = JSON.parse(localStorage.getItem(account) || "");
      if (!file) {
        alert("请选择图片，支持JPEG/PNG格式");
      }
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        fileURl.value = JSON.stringify(reader.result);
        data.userAvatar = fileURl.value;
        localStorage.setItem(account, JSON.stringify(data));
        show.value = false;
      });
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    //返回上一级
    function back(): void {
      router.go(-1);
    }
    //退出登陆
    function loginOut(): void {
      ElMessageBox.confirm("确认登出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //清除cookie
          docCookies.setItem('account', '', -1);
          //跳转至登陆界面
          router.push({ name: "login" });
          ElMessage({
            type: "success",
            message: "已退出账号",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消",
          });
        });
    }
    return {
      type,
      show,
      imgUrl,
      fileURl,
      put,
      username,
      info,
      name,
      infoStr,
      avclick,
      infoClicks,
      submit,
      back,
      loginOut,
    };
  },
});
</script>
<style lang="less" scoped>
.container {
  max-width: 1920px;
  min-width: 1280px;
  margin: 0 auto;
  .tool-bar {
    width: 80%;
    margin: 0 auto;
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    .back {
      display: inline-block;
      width: 30px;
      height: 30px;
      cursor: pointer;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .login-out {
      cursor: pointer;
      font-size: 18px;
      &:hover {
        font-weight: bold;
      }
    }
  }
  .text {
    margin-right: 30px;
    font-size: 18px;
    font-weight: bold;
  }
  .head-avatar {
    display: flex;
    justify-content: center;
  }
  .username {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    input {
      border-radius: 6px;
      outline: none;
      border: 1px solid #5c5c5c;
      width: 240px;
      height: 30px;
    }
  }
  .info {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    textarea {
      outline: none;
      border: 1px solid #5c5c5c;
    }
  }
}
</style>
