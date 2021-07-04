<template>
    <div class="head">
        <div class="cont">
            <div class="back" @click="back">
                <img src="@/assets/images/back.png" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup() {
        const router = useRouter();
        function back(): void {
            router.go(-1);
        }
        return {
            back
        }
    },
})
</script>
<style lang="less" scoped>
.head {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .cont {
        width: 80%;
        .back {
            width: 30px;
            height: 30px;
            cursor: pointer;
            img {
                width: 100%;
            }
        }
    }
}
</style>
