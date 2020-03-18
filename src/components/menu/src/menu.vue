<template>
  <div class="menu">
    <router-link
      v-for="(item, index) in menus"
      :key="index"
      :to="{path: item.children?'':item.path}"
    >
      <div
        :class="['menu-single', {'active': menuActive == index}]"
        :style="`font-size:${item.level==1?16:16-((item.level-1)*2)}px; padding: 0 20px 0 ${item.level*20}px;`"
        @click.stop="openMenu(index, item)"
      >
        <div>
          <i :class="['iconfont',item.icon]"></i>
          <span class="menu-text">{{item.title}}</span>
        </div>
        <i :class="['el-icon-arrow-down', {'open': open === index}]"></i>
      </div>
      <div :class="['menu-item', {'open-menu-item': open === index}]">
        <router-link
          v-for="(i, ind) in item.children"
          :key="ind"
          :to="{path: i.path}"
        >
          <div
            :class="['menu-single', {'active': active==ind && menuActive === null}]"
            :style="`font-size:${i.level==1?16:16-((i.level-1)*2)}px; padding: 0 20px 0 ${i.level*20}px;`"
            @click.stop="activeMenu(ind)"
          >
            <div>
              <i :class="['iconfont',i.icon]"></i>
              <span class="menu-text">{{i.title}}</span>
            </div>
          </div>
        </router-link>
      </div>
    </router-link>
  </div>
</template>

<script>
  import routes from '@/router/routes.js'
  export default {
    name: "menu",
    data() {
      return {
        menus: [],
        obj: {},
        menuActive: null,
        active: null,
        open: null,
      }
    },
    props: {
      selected: {
        type: Number,
        default: 0
      },
      menuOpen: {
        type: Number,
        default: 0
      }
    },
    watch: {
      active(newVal) {
        this.$router.push(this.menus[this.open].children?this.menus[this.open].children[newVal].path:this.menus[this.open].path)
      }
    },
    created() {
      routes[0].children.forEach(item => {
        let obj = {}
        obj = {...item.meta}
        obj.path = item.path
        if(item.children) {
          obj.children = []
          item.children.forEach(i => {
            let o = {}
            o = {...i.meta}
            o.path = i.path
            obj.children.push(o)
          })
        }
        this.menus.push(obj)
      })
      this.active = JSON.parse(JSON.stringify(this.selected))
      this.open = JSON.parse(JSON.stringify(this.menuOpen))
      console.log(JSON.stringify(this.menus, null, 2))
    },
    methods: {
      activeMenu(index) {
        this.active = index
        this.menuActive = null
      },
      openMenu(index, item) {
        if(index == this.open) {
          this.open = null
        }else{
          this.open = index
        }
        if(!item.children){
          this.menuActive = index
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/static/base.scss";
  .menu{
    width: 100%;
    height: 100%;
    .menu-single{
      width: 100%;
      height: 40px;
      transition: background .5s, color .5s;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:hover{
        background: $theme-colors;
        color: white;
      }
      .menu-text{
        margin-left: 6px;
      }
    }
    .el-icon-arrow-down{
      font-weight: bold;
      font-size: 14px;
      transition: transform .3s;
    }
    .menu-item{
      transition: max-height .6s;
      max-height: 0px;
      overflow: hidden;
    }
    .open-menu-item{
      max-height: 1000px;
    }
    .active{
      background: $theme-colors;
      color: white;
    }
    .open{
      transform: rotate(180deg);
    }
    a{
      display: block;
    }
  }
</style>