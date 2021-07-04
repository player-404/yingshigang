<template>
  <div class="genres">{{ genres.name }}</div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    genresData: Object,
  },
  setup(props) {
    const genres = props.genresData;
    return {
      genres,
    };
  },
});
</script>

<style lang="less" scoped>
.genres {
    display: inline-block;
  border: 2px solid #fff;
  border-radius: 40px;
  padding: 5px 15px;
  margin-right: 10px;
}
</style>