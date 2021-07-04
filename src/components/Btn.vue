<template>
  <button class="btn">
      <slot></slot>
  </button>
</template>

<style lang="less" scoped>
    .btn {
        width: 110px;
        height: 40px;
        border-radius: 40px;
        border: none;
        background-color: #DA1622;
        color: #fff;
        font-size: 16px;
        box-shadow: 0 2px 25px rgb(218, 22, 34);
        cursor: pointer;
    }
</style>