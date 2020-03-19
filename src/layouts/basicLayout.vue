<template>
  <div class="default-layout">
    <div class="menu-box">
      <div class="menu-top">
        <router-link to="/">
          <div class="logo">h2o</div>
        </router-link>
      </div>
      <Menu :selected="0"></Menu>
    </div>
    <div class="content-box">
      <div class="content-box-header">
        <svg t="1584603243751" class="icon-shrink" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2008"><path d="M79.80864875 325.49091406L571.00624531 325.49091406c26.45823749 0 47.76067875 20.46776531 47.76067875 53.0718975s-21.30244031 53.02009031-47.76067875 53.02009124l-491.19759656 0c-26.45823749 0-47.81248593-20.41499906-47.81248594-53.02009124s21.35424844-53.0718975 47.81248594-53.0718975z m0 266.92618314L571.00624531 592.4170972c26.45823749 0 47.76067875 20.52149156 47.76067875 53.12466467 0 32.6041322-21.30244031 53.02200937-47.76067874 53.02200938l-491.19759656 0c-26.45823749 0-47.81248594-20.41691812-47.81248596-53.02200938 0-32.60317218 21.35424844-53.12466469 47.81248595-53.12466467z m4.73941875 266.82352874L942.72539375 859.24062595C971.68381906 859.24062595 991.99616281 879.70935126 991.99616281 912.31252343c0 32.6041322-20.31330281 53.02104937-49.27076906 53.02104938l-858.17828625 0c-28.90565813 0-52.55094562-20.41595813-52.55094469-53.02104937 0-32.60317218 23.64624656-53.0718975 52.55190469-53.0718975z m640.78094813-533.80247813l0 372.81190125L991.37159562 511.79229031l-266.04257999-186.3541425zM942.72539375 164.81214125l-858.17828625-1e-8c-28.90565813 0-52.55094562-20.46776531-52.55094469-53.02009031 0-32.6041322 23.6452875-53.12658376 52.55094469-53.12658374L942.72539375 58.66546718c28.95842531 0 49.27076907 20.52245156 49.27076906 53.12658376 0.00095906 32.552325-20.31234375 53.02009031-49.27076906 53.02009031z m0 0" fill="#ff8000" p-id="2009"></path></svg>
        <div class="personal-box">
          <el-tooltip class="item" effect="dark" content="暂无消息" placement="bottom">
            <i class="el-icon-message-solid"></i>
          </el-tooltip>
          <Popover>
            <div style="width:100%;text-align: center;cursor: pointer;:hover:#ff8000;">退出登陆</div>
            <div class="personal" slot="curPopover">
              <i class="el-icon-s-custom"></i>
              <span>罗某人</span>
            </div>
          </Popover>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/menu'
  import Popover from '@/components/popover'
  export default {
    name: "basicLayout",
    components: {
      Menu,
      Popover
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
    .menu-box{
      border-right: 1px solid #eaeaea;
      box-shadow: 2px 0 10px rgba(193, 201, 226, 0.5);
      width: 256px;
      max-width: 256px;
      min-width: 256px;
      height: 100%;
      .menu-top{
        height: 64px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo{
          font-size: 36px;
          font-weight: 400;
          color: $theme-colors;
        }
      }
    }
    .content-box{
      width: 100%;
      height: 100%;
      .content-box-header{
        width: 100%;
        height: 64px;
        border-bottom: 1px solid #eaeaea;
        box-shadow: 0 2px 5px rgba(226, 226, 226, 0.50);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        .icon-shrink{
          width: 20px;
          transform: rotate(180deg);
          cursor: pointer;
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
          .logout{
            width: 100%;
            text-align: center;
            cursor: pointer;
            &:hover{
              color: $theme-colors;
            }
          }
        }
      }
    }
  }
</style>