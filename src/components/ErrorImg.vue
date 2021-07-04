<template>
    <div class="img-container">
        <img :src="img"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const img = require('@/assets/images/noPerson.svg');
        return {
            img
        }
    },
})
</script>
<style lang="less" scoped>
.img-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #DBDBDB;
    >img {
        width: 60%;
    }
}
</style>
