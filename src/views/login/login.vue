<template>
  <div class="login-container">
    <div class="login-box">
      <h4>h2o 商业管理系统</h4>
      <el-form
        ref="form"
        :model="form"
        label-width="50px"
        :rules="rule"
        label-position="left"
        size="small"
        class="top-form"
      >
        <el-form-item label="账号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password maxlength="16" minlength="6" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="savePwd">记住密码</el-checkbox>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button size="small" type="primary" @click="submitForm('form')">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Storage from '@/utils/storage.js'
  export default {
    name: "login",
    data() {
      return {
        form: {
          phone: '',
          password: ''
        },
        rule: {
          phone: [
            {required: true, message: '请输入账号', trigger: ['blur', 'change']}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: ['blur', 'change']}
          ]
        },
        savePwd: false
      }
    },
    mounted() {
      let keep_pwd = Storage.getLocal('keep_pwd')
      if(keep_pwd && keep_pwd.create_time+keep_pwd.keep_time>new Date().getTime()){
        this.form.phone = keep_pwd.phone
        this.form.password = keep_pwd.password
        this.savePwd = true
        this.submitForm('form')
      }else{
        Storage.removeLocal('keep_pwd')
        this.savePwd = false
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              target: document.querySelector('.login-container'),
              text: '正在登陆...',
            })
            this.$ajax('/login',JSON.stringify(this.form)).then(res => {
              if(res.status == 200){
                this.$notify.success({
                  title: '提示',
                  message: `${res.result.name}! 欢迎您回来！`
                })
                Storage.setSession('user_info', res.result)
                if(!Storage.getLocal('keep_pwd')){
                  let keep_pwd = {
                    phone: this.form.phone,
                    password: this.form.password,
                    create_time: new Date().getTime(),
                    keep_time: 1000*60*60*24*7
                  }
                  Storage.setLocal('keep_pwd', keep_pwd)
                }
                if(Storage.getLocal('current_path')){
                  this.$router.push(Storage.getLocal('current_path'))
                  Storage.removeLocal('current_path')
                }else{
                  this.$router.push('/')
                }
              }else{
                this.$notify.error({
                  title: '提示',
                  message: res.message
                })
              }
              loading.close()
            }).catch(err => {
              console.error(err)
              loading.close()
            })
          } else {
            return false;
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .login-container{
    width: 100vw;
    height: 100vh;
    background: url("../../static/login.jpg") no-repeat center center;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-box{
      max-width: 400px;
      min-width: 400px;
      background: white;
      box-shadow: 0 0 10px #dedede;
      border-radius: 10px;
      &>h4{
        text-align: center;
        padding: 20px;
      }
      .top-form{
        padding: 20px 40px 20px 40px;
      }
      .login-btn{
        text-align: center;
        padding-bottom: 20px;
      }
    }
  }
</style>