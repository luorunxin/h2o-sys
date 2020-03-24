<template>
  <div class="add-update-role-container">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rule"
      label-position="left"
      size="small"
      class="top-form"
    >
      <el-form-item label="姓名" prop="name">
        <el-input class="w30" v-model="form.name" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input class="w30" v-model="form.phone" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="职务" prop="duty_id">
        <el-select class="w30" v-model="form.duty_id" filterable placeholder="请选择职务">
          <el-option
            v-for="(item,index) in form.dutes"
            :key="index"
            :label="item.duty_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "AddUpdateRole",
    data() {
      return {
        form: {
          name: '',
          gender: 1,
          phone: '',
          duty_id: null,
          dutes: []
        },
        rule: {
          name: [
            {required: true, message: '请输入姓名', trigger: ['blur', 'change']}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: ['blur', 'change']}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: ['blur', 'change']}
          ],
          duty_id: [
            {required: true, message: '请选择职务', trigger: ['blur', 'change']}
          ],
        },
      }
    },
    mounted() {
      this.getDutes()
      if(this.$route.query.type == 2){
        this.getRoleById()
      }
    },
    methods: {
      getDutes() {
        let params = {
          page: 1,
          size: 10000
        }
        this.$ajax('/getDutes',JSON.stringify(params)).then(res => {
          if(res.status == 200) {
            this.form.dutes = res.result
          }else{
            this.$notify.error({
              title: '提示',
              message: res.message
            })
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getRoleById() {
        const loading = this.$loading({
          target: document.querySelector('.permission-list'),
          text: '加载中...',
        })
        let params = {
          id: this.$route.query.id
        }
        this.$ajax('/getRoleById',JSON.stringify(params)).then(res => {
          if(res.status == 200) {
            console.log(JSON.stringify(res.result,null,2))
            Object.assign(this.form, res.result)
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
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              target: document.querySelector('.permission-list'),
              text: '提交中...',
            })
            this.$ajax('/addUpdateRole',JSON.stringify(this.form)).then(res => {
              if(res.status == 200) {
                this.$notify.success({
                  title: '提示',
                  message: this.$route.query.type == 1?'角色添加成功!':'角色修改成功!'
                })
                this.$router.push('/permissionsManage/roleList')
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
  .add-update-role-container{
    padding: 20px;
    .w30{
      width: 30%;
    }
  }
</style>