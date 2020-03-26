<template>
  <div class="role-list">
    <div class="tabel-top" v-show="permissions.add_role">
      <el-button @click="toAddUpdateRole" type="primary" size="small">添加角色</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="80px" label-position="left" class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender==1?'男':'女' }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="密码">
              <span>{{ props.row.password }}</span>
            </el-form-item>
            <el-form-item label="职务">
              <span>{{ props.row.duty }}</span>
            </el-form-item>
            <el-form-item label="权限">
              <span>{{ props.row.permission }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.create_time | date}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        width="100"
        show-overflow-tooltip
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="gender"
        width="100"
        show-overflow-tooltip
        label="性别"
      >
        <template slot-scope="scope">{{scope.row.gender==1?'男':'女'}}</template>
      </el-table-column>
      <el-table-column
        prop="phone"
        width="140"
        show-overflow-tooltip
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="duty"
        width="100"
        show-overflow-tooltip
        label="职务">
      </el-table-column>
      <el-table-column
        prop="permission"
        show-overflow-tooltip
        label="权限">
      </el-table-column>
      <el-table-column
        prop="create_time"
        show-overflow-tooltip
        label="创建日期"
      >
        <template slot-scope="scope">{{scope.row.create_time | date}}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="90"
        label="操作"
        v-if="permissions.update_role || permissions.delete_role"
      >
        <template slot-scope="scope">
          <el-button v-show="permissions.update_role" style="margin-right: 10px" @click="handleClick(scope.row)" type="text" size="mini">编辑</el-button>
          <el-popconfirm
            :title="`确定删除 '${scope.row.name}' 这个角色吗？`"
            @onConfirm="deleteRow(scope.row)"
            v-show="permissions.delete_role"
          >
            <el-button slot="reference" type="text" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
        layout="total, prev, pager, next, sizes, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "roleList",
    data() {
      return {
        tableData: [],
        loading: false,
        page: 1,
        size: 10,
      }
    },
    mounted() {
      this.getRoleList()
    },
    methods: {
      toAddUpdateRole() {
        this.$router.push({
          path: '/permissionsManage/AddUpdateRole',
          query: {
            type: 1
          }
        })
      },
      handleSizeChange(e) {
        this.size = e
      },
      handleCurrentChange(e) {
        this.page = e
      },
      getRoleList() {
        this.loading = true
        let params = {
          page: this.page,
          size: this.size
        }
        this.$ajax('/getRoleList',JSON.stringify(params)).then(res => {
          if(res.status == 200) {
            this.tableData = res.result
          }else{
            this.$notify.error({
              title: '提示',
              message: res.message
            })
          }
          this.loading = false
        }).catch(err => {
          console.error(err)
          this.loading = false
        })
      },
      handleClick(row) {
        this.$router.push({
          path: '/permissionsManage/AddUpdateRole',
          query: {
            id: row.id,
            type: 2
          }
        })
      },
      deleteRow(rows) {
        this.loading = true
        this.$ajax('/deleteRoleById', JSON.stringify({id: rows.id})).then(res=>{
          if (res.status == 200) {
            this.$notify.success({
              title: '提示',
              message: '角色删除成功啦!!!'
            })
            this.getRoleList()
          }else{
            this.$notify.error({
              title: '提示',
              message: res.message
            })
          }
          this.loading = false
        }).catch(err=>{
          console.log(err)
          this.loading = false
        })
      },
    }
  };
</script>

<style lang="scss" scoped>
  .role-list{
    padding: 20px;
    .tabel-top {
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .pagination {
      margin-top: 20px;
    }

    .demo-table-expand label {
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;

      .price {
        color: red;
      }
    }
  }
</style>