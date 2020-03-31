<template>
  <div class="page-view">
    <!---->
    <el-tabs
      v-show="connect.length>0"
      v-model="selectConnect"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="selectTab"
    >
      <el-tab-pane
        v-for="(item,index) in connect"
        :key="item.phone"
        :label="`与(${item.phone})的对话`"
        :name="`${index}`"
      >
        <div class="talk-container" v-show="showTalk">
          <div class="withCenter">
            <component
              v-for="(it, index) in item.talkContent"
              :key="index"
              :is="it.name"
              :text="it.text"
            />
          </div>
          <div class="input-group">
            <l-textarea
              v-model="textareaVal"
            />
            <button class="l-button" @click.stop="sendtext">发送</button>
          </div>
        </div>
        <div v-show="!showTalk">
          <Breadcrumb />
          <router-view />
        </div>
      </el-tab-pane>
    </el-tabs>
    <div v-show="connect.length<1" class="page-view-content">
      <Breadcrumb />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
  import Breadcrumb from '@/components/h2o-breadcrumb'
  import Footer from '@/components/h2o-footer'
  import LTextarea from '@/components/l-textarea'
  import LTalkLeft from '@/components/l-talk-left'
  import LTalkRight from '@/components/l-talk-right'
  import {mapState,mapActions} from 'vuex'
  export default {
    name: "pageView",
    components: {
      Breadcrumb,
      Footer,
      LTextarea,
      LTalkLeft,
      LTalkRight
    },
    data() {
      return {
        textareaVal: '',
      }
    },
    computed: {
      ...mapState([
        'showTalk',
      ]),
      connect: {
        get() {
          return this.$store.state.connect
        },
        set() {
          this.$store.state.connect
        }
      },
      selectConnect: {
        get() {
          return this.$store.state.selectConnect
        },
        set() {
          this.$store.state.selectConnect
        }
      }
    },
    methods:{
      ...mapActions([
        'actionUnshiftConnect',
        'actionSetShowTalk',
        'actionSetSelectConnect'
      ]),
      removeTab(name) {
        let index = parseInt(name)
        this.$store.dispatch('actionUnshiftConnect',index)
        if(this.connect.length>0){
          if(this.connect[index]){
            this.$store.dispatch('actionSetSelectConnect',`${index}`)
          }else{
            this.$store.dispatch('actionSetSelectConnect',`${index-1}`)
          }
        }else{
          this.$store.dispatch('actionSetShowTalk',false)
        }
      },
      selectTab() {
        this.$store.dispatch('actionSetShowTalk',true)
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-view{
    padding: 20px;
    .page-view-content{
      background: white;
    }
    .talk-container{
      height: calc(100vh - 186px);
      background: #e2e2e2;
      display: flex;
      flex-direction: column;
      .withCenter{
        padding: 20px 20px 0 20px;
        max-height: calc(100vh - 256px);
        height: calc(100vh - 256px);
        -o-overflow-scrolling: touch;
        -ms-overflow-scrolling: touch;
        -moz-overflow-scrolling: touch;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        overflow-y: scroll;
      }
      .input-group{
        width: 100%;
        border-top: 1px solid #dadada;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 1rem;
        .l-button{
          height: 36px;
          list-style: none;
          padding: 0 1.2rem;
          border: 1px solid #dadada;
          border-radius: .5rem;
          font-size: 14px;
          background: dodgerblue;
          color: white;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
        }
        .l-button:hover{
          background: #0f76ff;
        }
      }
    }
  }
</style>