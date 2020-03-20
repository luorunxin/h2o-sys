<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :to="{ path: !item.path?'/':item.path }"
      >
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "h2oBreadcrumb",
    data() {
      return {
        menus: [],
        breadcrumbs: []
      }
    },
    watch: {
      '$route': {
        handler(to){
          this.breadcrumbs = []
          let matched = to.matched
          matched.forEach(item => {
            let obj = {}
            obj.path = item.path
            obj.title = item.meta.title
            this.breadcrumbs.push(obj)
          })
        },
        immediate: true
      }
    },
  };
</script>

<style lang="scss" scoped>
  .breadcrumb{
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #f1f1f1;
  }
</style>