<template>
  <div class="default-layout">
    <div class="menu-box">
      <Menu :selected="0"></Menu>
    </div>
    <div class="content-box">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/menu'
  export default {
    name: "basicLayout",
    components: {
      Menu
    }
  };
</script>

<style lang="scss" scoped>
  .default-layout{
    width: 100vw;
    height: 100vh;
    display: flex;
    .menu-box{
      border-right: 1px solid #dadada;
      box-shadow: 0 0 10px #dadada;
      width: 256px;
      max-width: 256px;
      min-width: 256px;
      height: 100%;
    }
    .content-box{
      width: 100%;
      height: 100%;
    }
  }
</style>