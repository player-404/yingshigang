<template>
    <div class="top-rate">
        <item-header title="TMDB口碑榜" type="TV" name="top"/>
        <swiper :data="datas" type="TV"/>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ItemHeader from '@/components/ItemHeader.vue'
import Swiper from '@/components/Swiper.vue'
import { topRate } from '../utils/tool'
export default defineComponent({
    components: {
        ItemHeader,
        Swiper
    },
    setup() {
        let datas = ref<[] | null>(null);
        topRate().then(data => {
            datas.value = data;
        })
        return {
            datas
        }
    },
})
</script>
<style lang="less" scoped>
.top-rate {
    margin-top: 100px;
}
</style>