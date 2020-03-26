<template>
  <div class="add-update-duty-container">
    <div class="form-box">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rule"
        label-position="left"
        size="small"
        class="top-form"
      >
        <el-form-item label="职务名称" prop="duty_name">
          <el-input v-model="form.duty_name" placeholder="请输入职务名称" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="custom-tree-container">
      <div class="block"><span>*</span><span>职务权限</span></div>
      <div class="block">
        <el-tree
          ref="tree"
          :data="data"
          node-key="id"
          show-checkbox
          check-strictly
          default-expand-all
          empty-text="暂无权限数据"
          check-on-click-node
          :expand-on-click-node="false"
          :default-checked-keys="defaultChecked"
        >
        </el-tree>
      </div>
    </div>
    <div class="submit-tree">
      <el-button type="primary" size="small" @click.stop="submit('form')">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addUpdateDuty",
    data() {
      return {
        data: [],
        defaultChecked: [],
        form: {
          duty_name: '',
          permission_id: ''
        },
        rule: {
          duty_name: [
            {required: true, message: '请输入职务名称', trigger: ['blur','change']}
          ],
        },
      }
    },
    mounted() {
      this.getPermissionsList()
      if(this.$route.query.type == 2){
        this.getDutyById()
      }
    },
    methods: {
      getDutyById() {
        const loading = this.$loading({
          target: document.querySelector('.permission-list'),
          text: '加载中...',
        })
        let params = {
          id: this.$route.query.id
        }
        this.$ajax('/getDutyById',JSON.stringify(params)).then(res => {
          if(res.status == 200) {
            this.form.id = res.result.id
            this.form.duty_name = res.result.duty_name
            this.defaultChecked = res.result.permission_id
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
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.$refs['tree'].getCheckedNodes(false,true).length<1){
              this.$message({
                message: '请您先勾选权限！！！',
                type: 'warning'
              });
            }else{
              const loading = this.$loading({
                target: document.querySelector('.permission-list'),
                text: '提交中...',
              })
              this.form.permission_id = this.$refs['tree'].getCheckedNodes(false,true).map(item => {
                return item.id
              }).join(',')
              this.$ajax('/addUpdateDuty',JSON.stringify(this.form)).then(res => {
                if(res.status == 200) {
                  this.$notify.success({
                    title: '提示',
                    message: this.$route.query.type == 1?'职务添加成功!':'职务修改成功!'
                  })
                  this.$router.push('/permissionsManage/duty')
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
            }
          } else {
            return false;
          }
        })
      },
      getPermissionsList() {
        const loading = this.$loading({
          target: document.querySelector('.permission-list'),
          text: '加载中...',
        })
        this.$ajax('/getPermissionsList').then(res => {
          if(res.status == 200) {
            this.data = res.result.data
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
    }
  };
</script>

<style lang="scss" scoped>
  .add-update-duty-container{
    padding: 20px;
    .form-box{
      max-width: 400px;
    }
    .custom-tree-container {
      display: flex;
      align-items: flex-start;
      font-size: 14px;
      margin: 30px 0;
      .block{
        width: 100%;
      }
      .block:nth-child(1){
        width: 80px;
        padding-right: 12px;
        font-size: 14px;
        color: #606266;
        white-space: nowrap;
        span:nth-child(1){
          margin-right: 4px;
          color: red;
        }
      }
    }
    .submit-tree{
      margin-left: 80px;
    }
  }
</style>