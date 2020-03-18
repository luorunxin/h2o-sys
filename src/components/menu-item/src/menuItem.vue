<template>
  <router-link
    :to="{path: mune.children?'':menu.path}"
  >
    <div
      :class="['menu-single']"
      :style="`font-size:${menu.level==1?16:16-((menu.level-1)*2)}px; padding: 0 20px 0 ${menu.level*20}px;`"
      @click="activeMenu($event, menu)"
    >
      <div>
        <i :class="['iconfont',menu.icon]"></i>
        <span class="menu-text">{{menu.title}}</span>
      </div>
      <i v-if="mune.children" class="el-icon-arrow-down"></i>
    </div>
    <div v-if="menu.children">
      <MenuItem
        v-for="(item,index) in menu.children"
        :key="index"
        :menu="item"
      />
    </div>
  </router-link>
</template>

<script>
  export default {
    name: "menuItem",
    props: ['menu'],
    methods: {
      activeMenu(e, item) {
        if(item.children) {
          // document.getElementsByClassName('active').forEach(i => {
          //   i.setAttribute('class', 'menu-single')
          // })
          // e.target.setAttribute('class', 'menu-single active')
          // this.selected = index
        }
      }
    }
  };
</script>

<style scoped>

</style>