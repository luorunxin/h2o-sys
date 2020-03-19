<template>
  <div class="page-view">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "pageView"
  };
</script>

<style lang="scss" scoped>
  .page-view{
    padding: 20px;
    overflow-y: scroll;
    height: calc(100% - 64px);
  }
</style>