<template>
    <div class="no-backdrop">
        <img :src="imgUrl"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const imgUrl = require('@/assets/images/backDrop.svg');
        return {
            imgUrl
        }
    },
})
</script>
<style lang="less" scoped>
.no-backdrop {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #DBDBDB;
    > img {
        width: 60%;
    }
}
</style>