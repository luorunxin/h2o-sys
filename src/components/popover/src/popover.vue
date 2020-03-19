<template>
  <div class="popover-container">
    <div class="popover" ref="popo">
      <slot />
    </div>
    <div @mouseover="hover($event)">
      <slot name="curPopover" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "popover",
    props: ['trigger','location'],
    methods: {
      hover(e){
        let useLocation = this.getUseLocation(e.target)
        console.log(JSON.stringify(useLocation, null, 2))
      },
      getUseLocation(e) {
        let useLocation = []
        let rect = e.getBoundingClientRect();
        // let clientTop = document.documentElement.clientTop;
        // let clientLeft = document.documentElement.clientLeft;
        // 兼容ie多出的两个px
        // let top = rect.top - clientTop, // 距离顶部的位置
        //   bottom = rect.bottom - clientTop, // 距离顶部加上元素本身的高度就等于bottom的位置
        //   left = rect.left - clientLeft, // 距离左边的位置
        //   right = rect.right - clientLeft // 距离右边的位置就是 距离左边的位置加上元素本身的宽度


        console.log(rect.top,rect.right,rect.bottom,rect.left)
        // if(top > e.offsetHeight) {
        //   useLocation.push('top')
        // }
        // if(top > e.offsetHeight && right > e.offsetWidth){
        //   useLocation.push('top-right')
        // }
        // if(right > e.offsetWidth) {
        //   useLocation.push('right')
        // }
        // if(right > e.offsetWidth && bottom > e.offsetHeight) {
        //   useLocation.push('right-bottom')
        // }
        // if(bottom > e.offsetHeight) {
        //   useLocation.push('bottom')
        // }
        // if(bottom > e.offsetHeight && left > e.offsetWidth) {
        //   useLocation.push('left - bottom')
        // }
        // if(left > e.offsetWidth) {
        //   useLocation.push('left')
        // }
        // if(left > e.offsetWidth && top > e.offsetHeight) {
        //   useLocation.push('top-left')
        // }
        return useLocation
      }
    }
  };
</script>

<style lang="scss" scoped>
  .popover-container{
    position: relative;
    .popover{
      min-width: 150px;
      transition: all .5s;
      height: 0;
      overflow: hidden;
      position: absolute;
    }
  }
</style>