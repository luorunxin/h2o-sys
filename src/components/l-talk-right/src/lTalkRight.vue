<template>
  <div class="single-right">
    <div class="covering"></div>
    <div class="dialog">
      <l-dialog :left="false" :text="text" />
    </div>
    <div class="head-photo">
      <div></div>
    </div>
  </div>
</template>

<script>
  import LDialog from '@/components/l-dialog'
  export default {
    name: "lTalkRight",
    components: {
      LDialog
    },
    props: ['text']
  }
</script>

<style lang="scss" scoped>
  .single-right{
    display: flex;
    margin-bottom: 20px;
    .head-photo{
      display: flex;
      justify-content: flex-end;
      flex: 1;
      &>div{
        width: 40px;
        height: 40px;
        background: dodgerblue;
        border-radius: 4px;
      }
    }
    .dialog{
      flex: 10;
      display: flex;
      justify-content: flex-end;
    }
    .covering{
      flex: 1;
    }
  }
</style>