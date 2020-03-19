<template>
  <div>
    <div v-for="item in 50" :key="item">
      goods-list{{item}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "goods-list"
  };
</script>

<style lang="scss" scoped>

</style>