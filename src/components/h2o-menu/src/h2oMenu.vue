<template>
  <div class="menu">
    <router-link
      v-for="(item, index) in menus"
      :key="index"
      :to="{path: item.children?'':item.path}"
    >
      <div
        :class="['menu-single', {'active': menuActive === index}]"
        :style="`font-size:${item.level==1?16:16-((item.level-1)*2)}px; padding: 0 20px 0 ${item.level*20}px;`"
        @click.stop="openMenu(index, item)"
        @mouseover="mouseMenu(index)"
        @mouseleave="leaveMenu"
      >
        <div class="menu-text-box">
          <i :class="['iconfont',item.icon]"></i>
          <span class="menu-text" :style="{opacity: unfold?'1':'0'}">{{item.title}}</span>
        </div>
        <i
          :class="['el-icon-arrow-down', {'open': open === index}]"
          :style="{opacity: unfold?'1':'0'}"
        ></i>
        <div
          class="floating-menu-item"
          :style="`width:${showFloatingMenuItem===index?'200px':'0px'}; height:${item.children && showFloatingMenuItem===index?item.children.length*40+'px;':'0px;'}`"
        >
          <router-link
            v-for="(i, ind) in item.children"
            :key="ind"
            :to="{path: i.path}"
          >
            <div
              :class="['menu-single', {'active': active===ind && menuActive === null && path==i.path}]"
              :style="`font-size:${i.level==1?16:16-((i.level-1)*2)}px; display:flex;justify-content: center;`"
              @click.stop="activeMenu(ind)"
            >
              <div class="menu-text-box">
                <i :class="['iconfont',i.icon]"></i>
                <span class="menu-text">{{i.title}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div
        class="menu-item"
        :style="{height: unfold && item.children && open === index?item.children.length*40+'px':'0px'}"
      >
        <router-link
          v-for="(i, ind) in item.children"
          :key="ind"
          :to="{path: i.path}"
        >
          <div
            :class="['menu-single', {'active': active===ind && menuActive === null && path==i.path}]"
            :style="`font-size:${i.level==1?16:16-((i.level-1)*2)}px; padding: 0 20px 0 ${i.level*20}px;`"
            @click.stop="activeMenu(ind, i.path)"
          >
            <div class="menu-text-box">
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
    name: "h2oMenuUnfold",
    data() {
      return {
        menus: [],
        obj: {},
        menuActive: null,
        active: null,
        open: null,
        showFloatingMenuItem: null,
        path: null
      }
    },
    props: {
      unfold: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      '$route': {
        handler(to){
          this.menus = []
          routes[0].children.forEach(item => {
            let obj = {}
            if(item.meta && item.meta.title && item.meta.level && item.meta.icon){
              obj = {...item.meta}
              obj.path = item.path
              if(item.children) {
                obj.children = []
                item.children.forEach(i => {
                  let o = {}
                  if(i.meta && i.meta.title && i.meta.level && i.meta.icon){
                    o = {...i.meta}
                    o.path = i.path
                    obj.children.push(o)
                  }
                })
              }
              this.menus.push(obj)
            }
          })
          let fullPath = to.fullPath
          for(let i in this.menus){
            if(this.menus[i].path === fullPath){
              this.menuActive = parseInt(i)
              break;
            }else {
              for(let key in this.menus[i].children){
                if(this.menus[i].children[key].path === fullPath) {
                  this.open = parseInt(i)
                  this.active = parseInt(key)
                  this.path = this.menus[i].children[key].path
                  this.menuActive = null
                  break;
                }
              }
            }
          }
        },
        immediate: true
      }
    },
    methods: {
      activeMenu(index, path) {
        this.path = path
        this.active = index
        this.menuActive = null
      },
      openMenu(index, item) {
        if(!this.unfold){
          return
        }
        if(index == this.open) {
          this.open = null
        }else{
          this.open = index
        }
        if(!item.children){
          this.menuActive = index
        }
      },
      mouseMenu(index) {
        if(!this.unfold){
          this.showFloatingMenuItem = index
        }
      },
      leaveMenu() {
        if(!this.unfold){
          this.showFloatingMenuItem = null
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
      transition: background .5s, color .5s, width .5s;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &:hover{
        background: $theme-colors;
        color: white;
      }
      .menu-text-box{
        display: flex;
        align-items: center;
        &>i{
          margin-right: 6px;
          transition: opacity .5s;
        }
        .menu-text{
          display: block;
          transition: opacity .4s;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .floating-menu-item{
        background: white;
        position: absolute;
        left: calc(100% + 5px);
        top: 0;
        z-index: 9999;
        box-shadow: 0 0 10px #bbbbbb;
        border-radius: 6px;
        transition: width .5s, height .5s;
        overflow: hidden;
      }
    }
    .el-icon-arrow-down{
      font-weight: bold;
      font-size: 14px;
      transition: transform .5s, opacity .5s;
    }
    .menu-item{
      transition: height .5s,;
      overflow: hidden;
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