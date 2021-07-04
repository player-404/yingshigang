<template>
    <div class="arring-today">
       <item-header title="今日播出" type="TV" name="arringTody"/>
       <swiper :data="datas" type="TV"/>
    </div>
</template>
<script lang="ts">
import ItemHeader from '@/components/ItemHeader.vue';
import Swiper from '@/components/Swiper.vue';
import { defineComponent, ref } from 'vue'
import { todayData } from '../utils/tool'
export default defineComponent({
  components: { ItemHeader, Swiper },
    setup() {
        let datas = ref<[]>();
        todayData().then(data => {
            datas.value = data
        })
        return {
            datas
        }
    },
})
</script>
<style lang="less" scoped>
.arring-today {
    margin-top: 150px;
}
</style>