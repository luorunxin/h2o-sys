<template>
  <div class="permission-list">
    <div class="btn-box">
      <el-button @click.stop="addTreeNode" type="primary" size="small">添加</el-button>
      <el-button @click.stop="removeTreeNode" type="danger" size="small">删除</el-button>
    </div>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          ref="tree"
          :data="data"
          node-key="id"
          highlight-current
          empty-text="暂无数据，请点击【添加】按钮进行添加"
          :expand-on-click-node="false"
          :default-expanded-keys="defaultExpanded"
          @node-click="nodeClick($event)"
        >
        </el-tree>
      </div>
      <div class="block" v-show="form.id" @click.stop="stopP($event)">
        <el-form
          ref="form"
          :model="form"
          label-width="60px"
          :rules="rule"
          label-position="left"
          size="small"
          class="top-form"
        >
          <el-form-item label="名称:" prop="label">
            <el-input v-model="form.label" placeholder="请输入名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="标识:" prop="identify">
            <el-input v-model="form.identify" placeholder="请输入标识" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.stop="submitForm('form')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="submit-tree">
      <el-button type="primary" size="small" @click.stop="submitTree()">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "duty",
    data() {
      return {
        id: 1,
        data: [],
        defaultExpanded: [],
        form: {
          id: null,
          label: '',
          identify: ''
        },
        rule: {
          label: [
            {required: true, message: '请输入权限名称', trigger: ['change']}
          ],
          identify: [
            {required: true, message: '请输入权限标识', trigger: ['change']}
          ]
        },
      }
    },
    mounted() {
      let _this = this
      document.onclick = function() {
        if(_this.$refs['tree'].getCurrentKey()) {
          _this.$refs['tree'].setCurrentKey(null)
          _this.setFormEmpty()
        }
      }
      this.getPermissionsList()
    },
    destroyed() {
      document.onclick = null
    },
    methods: {
      getPermissionsList() {
        const loading = this.$loading({
          target: document.querySelector('.permission-list'),
          text: '加载中...',
        })
        this.$ajax('/getPermissionsList').then(res => {
          if(res.status == 200) {
            this.data = res.result.data
            this.id = res.result.start_id
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
      submitTree() {
        if(!this.submitForm('form')) return;
        const loading = this.$loading({
          target: document.querySelector('.permission-list'),
          text: '加载中...',
        })
        this.$ajax('/insertPermission',JSON.stringify(this.data)).then(res => {
          if(res.status == 200){
            this.$notify.success({
              title: '提示',
              message: '权限保存成功!'
            })
            this.getPermissionsList()
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
      setFormEmpty() {
        this.form = {
          id: null,
          label: '',
          identify: ''
        }
      },
      nodeClick(e) {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        } else if (window.event) {
          window.event.cancelBubble = true;
        }
        Object.assign(this.form, {
          id: this.$refs['tree'].getCurrentNode().id,
          label: this.$refs['tree'].getCurrentNode().label,
          identify: this.$refs['tree'].getCurrentNode().identify
        })
      },
      stopP(e) {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        } else if (window.event) {
          window.event.cancelBubble = true;
        }
      },
      submitForm(formName) {
        let flag = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs['tree'].getCurrentNode().label = this.form.label
            this.$refs['tree'].getCurrentNode().identify = this.form.identify
          } else {
            flag = false
            return false;
          }
        })
        return flag
      },
      addTreeNode() {
        let newNode = {
          id: this.id++,
          label: '请重新输入权限名称',
          identify: ''
        }
        if(!this.$refs['tree'].getCurrentKey()){
          newNode.parent_id = 0
          this.data.push(newNode)
        }else{
          newNode.parent_id = this.$refs['tree'].getCurrentKey()
          this.$refs['tree'].append(newNode,this.$refs['tree'].getCurrentKey())
        }
        Object.assign(this.form, newNode)
        this.$nextTick(() => {
          this.$refs['tree'].setCurrentKey(newNode.id)
          this.defaultExpanded.push(this.$refs['tree'].getCurrentKey())
        })
      },
      removeTreeNode() {
        if(this.$refs['tree'].getCurrentKey()) {
          const loading = this.$loading({
            target: document.querySelector('.permission-list'),
            text: '加载中...',
          })

          this.$ajax('/deletePermissionById',JSON.stringify({id:this.$refs['tree'].getCurrentKey()})).then(res => {
            if(res.status == 200) {
              this.$notify.success({
                title: '提示',
                message: `'${this.$refs['tree'].getCurrentNode().label}' 权限已删除!`
              })
              this.$refs['tree'].remove(this.$refs['tree'].getCurrentNode())
              this.$refs['tree'].setCurrentKey(null)
              this.setFormEmpty()
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
        }else{
          this.$message({
            message: '至少得选择一个权限节点！',
            type: 'warning'
          });
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .permission-list{
    padding: 20px;
    .custom-tree-container {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      font-size: 14px;
      margin: 20px 0;
      .block{
        flex: 1;
      }
      .block:nth-child(2){
        display: flex;
        justify-content: center;
      }
    }
    .submit-tree{
      text-align: center;
    }
  }
</style>