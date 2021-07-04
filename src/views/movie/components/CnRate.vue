<template>
<!-- 国内电影 -->
    <div class="Cn-Rate">
        <item-header title="国内电影" type="movie" name="cn"/>    
        <swiper :data="datas"/>
    </div>    
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getOriginData } from '../utils/tool'
import ItemHeader from '@/components/ItemHeader.vue'
import Swiper from '@/components/Swiper.vue'
export default defineComponent({
    components: {
        ItemHeader,
        Swiper
    },
   setup() {
       let datas = ref<[]>();
        getOriginData().then(data => {
            datas.value = data;
        })
        return {
            datas
        }
    },
})
</script>
<style lang="less" scoped>
.Cn-Rate {
    margin-top: 100px;
}
</style>

