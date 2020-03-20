<template>
  <div class="goodsList">
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="商品类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="FreeShipping"
          label="是否包邮"
          width="100">
        </el-table-column>
        <el-table-column
          prop="activity"
          label="活动类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="activity"
          label="活动类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="商品介绍">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goods-list",
    data() {
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            type: '服装',
            FreeShipping: '是',
            activity: '返利',
            address: '上海市普陀区金沙江路 1518 弄'
          },
        ]
      }
    },
    methods: {
      //编辑
      handleClick(row) {
        console.log(row);
        this.$router.push({
          name:'ProductModification',
        })
      },
      //删除行
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
  };
</script>

<style lang="scss" scoped>

</style>