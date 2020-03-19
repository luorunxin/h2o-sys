<template>
  <div class="default-layout">
    <div class="menu-box">
      <div class="menu-top">
        <router-link to="/">
          <div class="logo">
            <img src="../static/logo.png"/>
          </div>
        </router-link>
      </div>
      <Menu></Menu>
    </div>
    <div class="content-box">
      <div class="content-box-header">
        <i class="iconfont icon-toggle-right" @click="shrink"></i>
        <div class="personal-box">
          <el-tooltip class="item" effect="dark" content="暂无消息" placement="bottom">
            <i class="el-icon-message-solid"></i>
          </el-tooltip>
          <el-popover
            placement="bottom"
            trigger="hover"
            popper-class="logout-box"
          >
            <div class="logout">
              <i class="iconfont icon-tuichu"></i>
              退出登陆
            </div>
            <div class="personal" slot="reference">
              <i class="el-icon-s-custom"></i>
              <span>罗某人</span>
            </div>
          </el-popover>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/h2o-menu-unfold'
  export default {
    name: "basicLayout",
    components: {
      Menu
    },
    methods: {
      shrink() {

      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/static/base.scss";
  .default-layout{
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
    position: relative;
    padding-left: 256px;
    .menu-box{
      border-right: 1px solid #eaeaea;
      box-shadow: 2px 0 10px rgba(193, 201, 226, 0.5);
      width: 256px;
      max-width: 256px;
      min-width: 256px;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      background: white;
      .menu-top{
        height: 64px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo{
          width: 100%;
          height: 64px;
          overflow: hidden;
          &>img{
            width: 100%;
            transform: translateY(-100px);
          }
        }
      }
    }
    .content-box{
      width: 100%;
      height: 100%;
      position: relative;
      overflow-y: scroll;
      padding-top: 64px;
      .content-box-header{
        width: calc(100% - 256px);
        height: 64px;
        border-bottom: 1px solid #eaeaea;
        box-shadow: 0 2px 5px rgba(226, 226, 226, 0.50);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        position: fixed;
        top: 0;
        background: white;
        z-index: 998;
        .icon-toggle-right{
          font-size: 20px;
          transform: rotate(180deg);
          cursor: pointer;
          color: $theme-colors;
        }
        .personal-box{
          display: flex;
          align-items: center;
          .el-icon-message-solid,.el-icon-s-custom{
            font-size: 20px;
            color: $theme-colors;
            cursor: pointer;
          }
          .personal{
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-left: 20px;
            &>span{
              font-size: 14px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .logout-box{
    padding: 5px 0;
    .logout{
      width: 100%;
      text-align: center;
      cursor: pointer;
      transition: all .5s;
      padding: 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .icon-tuichu{
        margin-right: 6px;
      }
      &:hover{
        color: $theme-colors;
      }
    }
  }
</style>