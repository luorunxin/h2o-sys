<template>
  <div class="l-textarea-box">
    <div ref="tacover" class="text-covering">
      <div class="shadow">{{text}}</div>
    </div>
    <textarea
      ref="ta"
      :placeholder="placeholder"
      v-model="text"
      @keyup="changeValue($event)"
      @keyup.enter="enter"
    ></textarea>
  </div>
</template>

<script>
  export default {
    name: "lTextarea",
    data() {
      return {
      }
    },
    model: {
      prop: 'textareaVal',
      event: 'input'
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      textareaVal: {
        type: String,
        default: ''
      }
    },
    computed: {
      text: {
        get() {
          return this.textareaVal
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    },
    watch: {
      textareaVal(newVal) {
        if(!newVal) {
          this.$refs['ta'].style.height = 'calc(60px - 2rem)'
          this.$refs['ta'].parentNode.style.height = 'calc(60px - 2rem)'
        }
      }
    },
    methods: {
      enter() {
        this.$emit('onEnter')
      },
      changeValue(e) {
        e.target.style.height = this.$refs['tacover'].offsetHeight + 'px'
        e.target.parentNode.style.height = this.$refs['tacover'].offsetHeight + 'px'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .l-textarea-box{
    width: 100%;
    margin-right: 1rem;
    position: relative;
    textarea{
      list-style: none;
      width: 100%;
      height: 36px;
      padding: 10px;
      font-size: 12px;
      resize: none;
      outline: none;
      border: none;
      border-radius: 6px;
      /*overflow-y: visible;*/
      position: absolute;
      bottom: 0;
      z-index: 999;
      background: #f9f9f9;
      border: 1px solid #333333;
      letter-spacing: 1px;
    }
    .text-covering{
      width: 100%;
      letter-spacing: 1px;
      word-break: break-all;
      font-size: 12px;
      min-height: 36px;
      padding: 10px;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      border: 1px solid #333333;
      opacity: 0;
    }
  }
</style>