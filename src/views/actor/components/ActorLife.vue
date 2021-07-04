<template>
  <div class="actor-life">
    <h2 class="actor-title">演绎生涯</h2>
    <el-timeline v-if="Object.keys(data).length > 0">
      <el-timeline-item
        v-for="(item, index) in data"
        :key="index"
        :timestamp="index"
        placement="top"
        size="normal"
      >
        <el-card>
          <ul>
            <li class="item" v-for="(value, i) in item" :key="i">
              <span class="pieces-name" @click="itemClick(value)">{{
                value.name || value.title
              }}</span>
              <span class="pieces-text"
                >&nbsp;{{ value.character ? "饰演" : "参演" }}&nbsp;</span
              >
              <span class="character" v-if="value.character">{{
                value.character
              }}</span>
            </li>
          </ul>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div class="no-data" v-else>暂无数据</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRef, ref, watch, computed } from "vue";
import { combinedCredits } from "@/netWork/actorRequest";
import { Obj } from "@/types/index";
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    personId: String,
  },
  setup(props) {
    const ROUTER = useRouter();
    let id = toRef(props, "personId");
    let cast = ref<any[]>();
    let data = ref<Obj>({});
    let select = ref<number>();
    let divs = ref<any[]>([]);

    combinedCredits(Number(id.value)).then((data) => {
      cast.value = data.data.cast;
    });
    //item点击
   function itemClick(item: Obj): void {
     const ID = item.id;
     const MEDIA_TYPE = item['media_type'] === 'tv'? item['media_type'].toUpperCase() : item['media_type'];
     ROUTER.push({name: 'detail', query: {id: ID, type: MEDIA_TYPE}})
   }
    watch(cast, (newv, oldv) => {
      if (newv) {
        newv.forEach((item) => {
          let dates: string = "";
          if (item["media_type"] === "movie") {
            dates = item["release_date"];
          } else {
            dates = item["first_air_date"];
          }
          const year = dates ? dates.split("-")[0] : "others";
          if (!data.value[year]) {
            data.value[year] = [];
          }
          data.value[year].push(item);
        });
      }
    });
    return {
      data,
      select,
      divs,
      itemClick
    };
  },
});
</script>
<style lang="less" scoped>
.actor-life {
  box-sizing: border-box;
  padding: 0 10px;
  .no-data {
    font-size: 18px;
  }
  .actor-title {
    margin: 60px 0 20px;
  }
  .item {
    display: flex;
    align-items: center;
    margin: 20px 0;
    .pieces-name {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
      &:hover {
        color: #1eb7da;
      }
    }
    .pieces-text {
      color: #898989;
      font-size: 16px;
    }
    .character {
      color: #fff;
      font-size: 16px;
    }
    .radio {
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 1px solid #000;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 10px;
      &:hover .redio-select {
        background-color: #000;
      }
      .redio-select {
        display: block;
        width: 75%;
        height: 75%;
        border-radius: 50%;
      }
    }
  }
}
:deep(.el-timeline-item__timestamp) {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
:deep(.el-card) {
  background-color: #1e1d21;
  border: none;
  box-shadow: 2px 2px 9px rgba(255, 255, 255, 0.2);
}
</style>