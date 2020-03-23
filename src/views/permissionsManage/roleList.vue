<template>
  <div class="role-list">
    <div class="tabel-top">
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
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="职务">
              <span>{{ props.row.duty }}</span>
            </el-form-item>
            <el-form-item label="权限">
              <span>{{ props.row.permission }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.create_time }}</span>
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
        label="性别">
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
        label="创建日期">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="90"
        label="操作">
        <template slot-scope="scope">
          <el-button style="margin-right: 10px" @click="handleClick(scope.row)" type="text" size="mini">编辑</el-button>
          <el-popconfirm
            :title="`确定删除 '${scope.row.name}' 这个角色吗？`"
            @onConfirm="deleteRow(scope.row)"
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
        tableData: [
          {
            name: '张三',
            gender: '男',
            phone: '12134567890',
            duty: '客服',
            permission: '商品，权限管理商品，权限管理',
            create_time: '2020-02-02 02:02:02',
          }
        ],
        loading: false,
        page: 1,
        size: 10,
      }
    },
    methods: {
      toAddUpdateRole() {

      },
      handleSizeChange(e) {
        this.size = e
      },
      handleCurrentChange(e) {
        this.page = e
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