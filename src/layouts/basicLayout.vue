<template>
  <div class="default-layout" :style="{paddingLeft: unfold?'256px':'54px'}">
    <div class="menu-box" :style="{width:unfold?'256px':'54px'}">
      <div class="menu-top">
        <router-link to="/">
          <div class="logo">
            <img src="../static/logo.png"/>
          </div>
        </router-link>
      </div>
      <Menu :unfold="unfold" />
    </div>
    <div class="content-box">
      <div :class="['content-box-header',{'header-unfold':unfold},{'header-fold':!unfold}]">
        <i
          :class="['iconfont', 'icon-toggle-right', {'rotate0':!unfold}, {'rotate180':unfold}]"
          @click="shrink"
        ></i>
        <div class="personal-box">
          <el-tooltip class="item" effect="dark" content="暂无消息" placement="bottom">
            <i class="el-icon-message-solid"></i>
          </el-tooltip>
          <el-popover
            placement="bottom"
            trigger="hover"
            popper-class="logout-box"
          >
            <div class="logout" @click.stop="logout">
              <i class="iconfont icon-tuichu"></i>
              退出登陆
            </div>
            <div class="personal" slot="reference">
              <i class="el-icon-s-custom"></i>
              <span>{{userName}}</span>
            </div>
          </el-popover>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/h2o-menu'
  import Storage from '@/utils/storage.js'
  import BASEURL from '@/utils/baseURL.js'
  import {mapActions, mapState} from 'vuex'
  export default {
    name: "basicLayout",
    components: {
      Menu
    },
    data() {
      return {
        unfold: true,
        userName: '',
        user: [],
        socket: null,
        timer: null,
        user_info: null,
        notify: []
      }
    },
    mounted() {
      this.user_info = Storage.getLocal('user_info')
      this.userName = this.user_info.name
      this.initWebSocket()
    },
    destroyed() {
      this.close()
    },
    computed: {
      ...mapState([
        'connect',
        'selectConnect',
        'showTalk',
      ])
    },
    methods: {
      ...mapActions([
        'actionSetConnect',
        'actionSetSocket',
        'actionPushConnect',
        'actionUnshiftConnect',
        'actionSetSelectConnect',
        'actionSetShowTalk',
        'actionSetMessage'
      ]),
      shrink() {
        this.unfold = !this.unfold
      },
      logout() {
        this.$ajax('/logout',JSON.stringify({phone: this.user_info.phone})).then(() => {
          Storage.removeLocal('keep_pwd')
          this.close()
          this.$router.push('/login')
        }).catch(err => {console.error(err)})
      },
      initWebSocket() {
        if (window.WebSocket || window.MozWebSocket){
          let address = BASEURL.socket + '/service'
          this.socket = new WebSocket(address)
          this.$store.dispatch('actionSetSocket', this.socket)
          this.open()
        }else{
          this.$notify.info({
            title: '提示',
            message: '当前客户端不支持客服聊天功能'
          })
        }
      },
      open() {
        console.log('正在连接...')
        this.socket.onopen = () => {
          this.send()
          this.message()
          this.setIntervalSend()
        }
      },
      send(data) {
        if(this.socket.readyState != 1) return
        let userInfo = {
          ...this.user_info,
          type: 'service'
        }
        if(this.user.length>0) userInfo.user = this.user
        if(data) userInfo.message = data
        this.socket.send(JSON.stringify(userInfo))
      },
      message() {
        let _this = this
        this.socket.onmessage = function (msg) {
          let userData = JSON.parse(msg.data)
          if(userData.isMatching){
            for(let c in _this.connect){
              if(_this.connect[c].phone === userData.phone){
                let conData = _this.connect
                conData[c].isMatching = true
                _this.$store.dispatch('actionSetConnect', conData)
              }
            }
            for(let n in _this.notify){
              if(_this.notify[n].phone === userData.phone){
                _this.notify[n].notify.close()
              }
            }
            return
          }
          _this.user.push(userData)
          let connect = _this.connect
          for(let i in connect){
            if(connect[i].phone === userData.phone &&
              parseInt(_this.selectConnect)==i && !connect[i].isMatching){
              let data = {
                index: i,
                content: {
                  name: 'l-talk-left',
                  text: userData.message
                }
              }
              _this.$store.dispatch('actionSetMessage',data)
              return
            }
          }

          let h = _this.$createElement
          let notify = _this.$notify.success({
            title: '消息提醒',
            duration: 0,
            position: 'bottom-right',
            dangerouslyUseHTMLString: true,
            message:
              h('a',
                {
                  class:'message-box',
                  href:'javascript:;',
                  on: {
                    click: () => {
                      _this.$store.dispatch('actionSetShowTalk',true)
                      for(let i in connect){
                        if(connect[i].phone === userData.phone && !connect[i].isMatching){
                          let data = {
                            index: i,
                            content: {
                              name: 'l-talk-left',
                              text: userData.message
                            }
                          }
                          _this.$store.dispatch('actionSetMessage',data)
                          _this.$store.dispatch('actionSetSelectConnect',`${i}`)
                          _this.closeNotify()
                          return
                        }
                      }
                      userData.talkContent = []
                      userData.talkContent.push({
                        name: 'l-talk-left',
                        text: userData.message
                      })
                      _this.$store.dispatch('actionPushConnect',userData)
                      _this.$store.dispatch('actionSetSelectConnect',`${_this.connect.length-1}`)
                      _this.closeNotify(userData.phone)
                    }
                  }
                },
                [
                  h('h4',
                    null,
                    `用户(${JSON.parse(msg.data).phone})向你发送消息:`
                  ),
                  h('p',
                    null,
                    `${JSON.parse(msg.data).message}`
                  )
                ]
              )
  //             `<a @click="connectUser" class="message-box" href="javascript:;">
  //         <h4>用户(${_this.user.phone})向你发送消息:</h4>
  //         <p>${_this.user.message}</p>
  //         </a>`
          });
          _this.notify.push({
            notify,
            phone: userData.phone
          })
        }
      },
      close() {
        let _this = this
        this.socket.close()
        this.socket.onclose = function () {
          console.log('连接关闭')
          clearInterval(_this.timer)
        }
      },
      closeNotify(phone) {
        for(let n in this.notify){
          if(this.notify[n].phone === phone){
            this.notify[n].notify.close()
          }
        }
      },
      setIntervalSend() {
        this.timer = setInterval(() => {
          this.socket.send('791618513')
        }, 5000)
      },
      // sendtext() {
      //   if(!this.textareaVal) return
      //   this.send(this.textareaVal)
      //   this.talkContent.push({
      //     name: 'l-talk-right',
      //     text: this.textareaVal
      //   })
      //   this.textareaVal = ''
      // },
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
    transition: padding-left .5s;
    .menu-box{
      border-right: 1px solid #eaeaea;
      box-shadow: 2px 0 10px rgba(193, 201, 226, 0.5);
      width: 256px;
      max-width: 256px;
      min-width: 56px;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      background: white;
      transition: width .5s;
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
      .header-unfold{
        width: calc(100% - 256px);
      }
      .header-fold{
        width: calc(100% - 56px);
      }
      .content-box-header{
        transition: width .5s;
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
          cursor: pointer;
          color: $theme-colors;
          transition: transform .5s;
        }
        .rotate0{
          transform: rotate(0deg);
        }
        .rotate180{
          transform: rotate(180deg);
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