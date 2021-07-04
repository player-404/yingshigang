<template>
  <div class="my-ipt">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div class="icon" v-show="show">
        <div class="icon-container">
          <slot name="iconImg">
            <img src="@/assets/images/user.png" />
          </slot>
        </div>
        <div class="icon-text">{{ title }}：</div>
      </div>
    </transition>
    <input
      :type="type"
      @focus="focus"
      @blur="blur"
      :placeholder="tips"
      :class="{ error: !status }"
      v-model="value"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "用户名",
    },
    tips: {
      type: String,
      default: "请输入用户名",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  emits: ['values'],
  setup(props,{ attrs, slots, emit}) {
    let { title, tips, type } = toRefs(props);
    let show = ref<boolean>(false);
    let status = ref<boolean>(true);
    let value = ref<string>('');
    function focus(): void {
      show.value = true;
      status.value = true;
    }
    function blur(): void {
      show.value = false;
      emit('values', value.value)
    }
    return {
      title,
      show,
      tips,
      type,
       status,
      value,
      blur,
      focus,
    };
  },
});
</script>

<style lang="less" scoped>
.my-ipt {
  width: 100%;
  border-bottom: 1px solid #000;
  position: relative;
  margin: 60px 0;
  > input {
    display: inline-block;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 16px;
    &.error {
      color: red;
      animation: shake 0.5s ease re;
    }
  }
  .icon {
    position: absolute;
    top: -30px;
    display: flex;
    align-items: center;
    .icon-container {
      width: 15px;
      height: 15px;
      overflow: hidden;
      margin-right: 6px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .icon-text {
      color: #000;
      font-size: 14px;
      padding-top: 2px;
    }
  }
}
</style>