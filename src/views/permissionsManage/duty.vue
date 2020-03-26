<template>
  <div class="duty-container">
    <div class="tabel-top" v-show="permissions.add_duty">
      <el-button @click="toAddUpdateDuty" type="primary" size="small">添加职务</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="80px" label-position="left" class="demo-table-expand">
            <el-form-item label="职务名称">
              <span>{{ props.row.duty_name }}</span>
            </el-form-item>
            <el-form-item label="权限">
              <span>{{ props.row.permission_id }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.create_time | date}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="duty_name"
        width="150"
        show-overflow-tooltip
        label="职务名称">
      </el-table-column>
      <el-table-column
        prop="permission_id"
        show-overflow-tooltip
        label="权限">
      </el-table-column>
      <el-table-column
        prop="create_time"
        width="200"
        show-overflow-tooltip
        label="创建日期"
      >
        <template slot-scope="scope">{{scope.row.create_time | date}}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="90"
        label="操作"
        v-if="permissions.update_duty || permissions.delete_duty"
      >
        <template slot-scope="scope">
          <el-button v-show="permissions.update_duty" style="margin-right: 10px" @click="handleClick(scope.row)" type="text" size="mini">编辑</el-button>
          <el-popconfirm
            :title="`确定删除 '${scope.row.duty_name}' 这个职务吗？`"
            @onConfirm="deleteRow(scope.row)"
            v-show="permissions.delete_duty"
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
    name: "duty",
    data() {
      return {
        tableData: [],
        loading: false,
        page: 1,
        size: 10,
      }
    },
    mounted() {
      this.getDutes()
    },
    methods: {
      toAddUpdateDuty() {
        this.$router.push({
          path: '/permissionsManage/AddUpdateDuty',
          query: {
            type: 1
          }
        })
      },
      getDutes() {
        this.loading = true
        let params = {
          page: this.page,
          size: this.size
        }
        this.$ajax('/getDutes',JSON.stringify(params)).then(res => {
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
      handleSizeChange(e) {
        this.size = e
      },
      handleCurrentChange(e) {
        this.page = e
      },
      handleClick(row) {
        this.$router.push({
          path: '/permissionsManage/AddUpdateDuty',
          query: {
            id: row.id,
            type: 2
          }
        })
      },
      deleteRow(rows) {
        this.loading = true
        this.$ajax('/deleteDutyById', JSON.stringify({id: rows.id})).then(res=>{
          if (res.status == 200) {
            this.$notify.success({
              title: '提示',
              message: '职务删除成功啦!!!'
            })
            this.getDutes()
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
  }
</script>

<style lang="scss" scoped>
  .duty-container{
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