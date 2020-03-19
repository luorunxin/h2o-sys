<template>
  <div class="page-view">
    <div class="page-view-content">
      <Breadcrumb />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
  import Breadcrumb from '@/components/h2o-breadcrumb'
  import Footer from '@/components/h2o-footer'
  export default {
    name: "pageView",
    components: {
      Breadcrumb,
      Footer
    },
  };
</script>

<style lang="scss" scoped>
  .page-view{
    padding: 20px;
    .page-view-content{
      background: white;
    }
  }
</style>