<template>
  <div class="l-dialog-container">
    <div class="l-dialog-left" v-show="left">
      {{text}}
    </div>
    <div class="l-dialog-right" v-show="!left">
      {{text}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "lDialog",
    props: {
      left: {
        type: Boolean,
        default: true
      },
      text: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .l-dialog-container{
    display: inline-block;
    word-break: break-all;
    &>div{
      min-height: 40px;
    }
    .l-dialog-left{
      padding: 10px;
      font-size: 14px;
      background-color: rgba(0,0,0,0.5);
      border-radius: 4px;
      position: relative;
      background: white;
      &:after {
        content: '';
        display: block;
        position: absolute;
        border-width: 6px;
        border-style: solid;
        border-color: transparent white transparent transparent;
        left: -12px;
        top: 15px;
      }
    }
    .l-dialog-right{
      padding: 10px;
      font-size: 14px;
      background-color: rgba(0,0,0,0.5);
      border-radius: 4px;
      position: relative;
      background: white;
      &:after {
        content: '';
        display: block;
        position: absolute;
        border-width: 6px;
        border-style: solid;
        border-color: transparent transparent transparent white;
        left: 100%;
        top: 15px;
      }
    }
  }
</style>