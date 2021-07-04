<template>
  <div class="login">
    <div class="back" @click="back">返回</div>
    <login-body />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LoginBody from "./components/LoginBody.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: { LoginBody },
  setup() {
    const router = useRouter();
    function back(): void {
      router.push({name: 'Home'})
    }
    return {
      back,
    };
  },
});
</script>
<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #c49cd0, #b8d1dc, #67c23a);
  background-blend-mode: screen;
  background-size: 200% 200%;
  animation: stripe 15s linear infinite alternate;
  @keyframes stripe {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 100%;
    }
  }
  .back {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    top: 70px;
    right: 100px;
    cursor: pointer;
  }
}
</style>
