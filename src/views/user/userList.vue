<template>
  <div class="goodsList">
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="80px" label-position="left" class="demo-table-expand">
            <el-form-item label="手机号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="登陆地址">
              <span>{{ props.row.origin }}</span>
            </el-form-item>
            <el-form-item label="登陆设备">
              <span>{{ props.row.user_agent }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.login_time | date}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        width="140"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="origin"
        show-overflow-tooltip
        label="登陆地址">
      </el-table-column>
      <el-table-column
        prop="user_agent"
        show-overflow-tooltip
        label="登陆设备">
      </el-table-column>
      <el-table-column
        prop="login_time"
        label="登陆时间"
        show-overflow-tooltip
        class-name="nowrap"
      >
        <template slot-scope="scope">{{scope.row.login_time | date}}</template>
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
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsList",
    data() {
      return {
        page: 1,
        size: 10,
        tableData: [
          {
            phone: '',
            origin: '',
            user_agent: '',
            login_time: '',
          }
        ],
        loading: false,
        total: 0
      }
    },
    async mounted() {
      this.userList()
    },
    methods: {
      userList() {
        this.loading = true
        let params = {
          page: this.page,
          size: this.size
        }
        this.$ajax('/userList', JSON.stringify(params)).then(res => {
          this.loading = false
          if (res.status == 200) {
            this.total = res.total
            this.tableData = res.result
          } else {
            this.$notify.error({
              title: '提示',
              message: res.message
            })
          }
        }).catch(err => {
          console.error(err)
          this.loading = false
        })
      },
      handleSizeChange(e) {
        this.size = e
        this.goodsList()
      },
      handleCurrentChange(e) {
        this.page = e
        this.goodsList()
      },
    },
  };
</script>

<style lang="scss" scoped>
  .goodsList {
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

    .w100 {
      display: inline-block;
      min-width: 100px;
    }
  }
</style>