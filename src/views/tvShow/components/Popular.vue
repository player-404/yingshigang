<template>
    <div class="popular">
        <item-header title="热门电视"/>
        <swiper :data="datas" type="TV"/>
    </div>
</template>
<script lang="ts">
import ItemHeader from '@/components/ItemHeader.vue'
import Swiper from '@/components/Swiper.vue'
import { defineComponent, ref } from 'vue'
import { popularTv } from '../utils/tool'
export default defineComponent({
  components: { ItemHeader, Swiper },
    setup() {
        let datas = ref<[]>();
        popularTv().then(data => {
            datas.value = data;
        })
        return {
            datas
        }
    },
})
</script>
<style lang="less" scoped>
.popular {
    margin-top: 100px;
}
</style>