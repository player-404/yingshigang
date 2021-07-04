<template>
  <el-container class="container">
    <el-header>
        <head-tab
          v-if="
            $route.path != '/detail' &&
            $route.path != '/classify' &&
            $route.path != '/search' &&
            $route.path != '/actor' &&
            $route.path != '/moreDetail' &&
            $route.path != '/mine' &&
            $route.path != '/login'
          "
        />
    </el-header>
    <el-main class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref} from "vue";
import HeadTab from "./components/HeadTab.vue";
export default defineComponent({
  components: { HeadTab },
  setup() {
  },
});
</script>

<style>
@import "./assets/less/init.less";
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  color: #fff;
  background-color: #171519;
}
.main {
  padding-top: 0 !important;
  width: 100%;
  position: absolute;
  top: 0px;
  z-index: 1;
  background-color: #171519;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
}
</style>
