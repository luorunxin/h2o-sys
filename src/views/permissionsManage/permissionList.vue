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
          show-checkbox
          node-key="tree_id"
          highlight-current
          empty-text="暂无数据，请点击【添加】按钮进行添加"
          :expand-on-click-node="false"
          :default-expanded-keys="defaultExpanded"
          @node-click="nodeClick($event)"
        >
        </el-tree>
      </div>
      <div class="block" v-show="form.tree_id" @click.stop="stopP($event)">
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
  </div>
</template>

<script>
  export default {
    name: "duty",
    data() {
      return {
        tree_id: 1,
        data: [],
        defaultExpanded: [],
        form: {
          tree_id: null,
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
    },
    methods: {
      setFormEmpty() {
        this.form = {
          tree_id: null,
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
          tree_id: this.$refs['tree'].getCurrentNode().tree_id,
          label: this.$refs['tree'].getCurrentNode().label
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
        // const loading = this.$loading({
        //   target: document.querySelector('.permission-list'),
        //   text: '提交中...',
        // })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit')
          } else {
            return false;
          }
        })
      },
      addTreeNode() {
        let newNode = {
          tree_id: this.tree_id++,
          label: ''
        }
        if(!this.$refs['tree'].getCurrentKey()){
          this.data.push(newNode)
        }else{
          this.$refs['tree'].append(newNode,this.$refs['tree'].getCurrentKey())
        }
        Object.assign(this.form, newNode)
        this.$nextTick(() => {
          this.$refs['tree'].setCurrentKey(newNode.tree_id)
          this.defaultExpanded.push(this.$refs['tree'].getCurrentKey())
        })
      },
      removeTreeNode() {
        if(this.$refs['tree'].getCurrentKey()) {
          this.$refs['tree'].remove(this.$refs['tree'].getCurrentNode())
          this.$refs['tree'].setCurrentKey(null)
          this.setFormEmpty()
        }else{
          this.$message({
            message: '至少得选择一个权限节点！',
            type: 'warning'
          });
        }
      },
      // append(data) {
      //   const newChild = { id: id++, label: 'testtest', children: [] };
      //   if (!data.children) {
      //     this.$set(data, 'children', []);
      //   }
      //   data.children.push(newChild);
      // },
      //
      // remove(node, data) {
      //   const parent = node.parent;
      //   const children = parent.data.children || parent.data;
      //   const index = children.findIndex(d => d.id === data.id);
      //   children.splice(index, 1);
      // }
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
      .block{
        flex: 1;
      }
      .block:nth-child(2){
        display: flex;
        justify-content: center;
      }
    }
    .btn-box{
      margin-bottom: 20px;
    }
  }
</style>