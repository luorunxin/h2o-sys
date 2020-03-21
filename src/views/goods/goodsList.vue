<template>
  <div class="goodsList">
    <div class="tabel-top">
      <el-button @click="toAddUpdateGoods" type="primary" size="small">添加商品</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="1400"
    >
      <el-table-column
        fixed
        prop="title"
        min-width="300"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="price"
        show-overflow-tooltip
        width="100"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="payment_number"
        show-overflow-tooltip
        width="100"
        label="付款人数">
      </el-table-column>
      <el-table-column
        prop="monthly_sales"
        show-overflow-tooltip
        width="100"
        label="月销量">
      </el-table-column>
      <el-table-column
        prop="ship_address"
        show-overflow-tooltip
        label="发货地址">
      </el-table-column>
      <el-table-column
        prop="courier_fees"
        show-overflow-tooltip
        width="100"
        label="快递费用">
      </el-table-column>
      <el-table-column
        prop="goods_category_id"
        show-overflow-tooltip
        width="100"
        label="商品类别">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        show-overflow-tooltip
        class-name="nowrap">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="120"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="mini">详情</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="mini">编辑</el-button>
          <el-button @click="deleteRow(scope.row)" type="text" size="mini">删除
          </el-button>
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
        layout="prev, pager, next, sizes"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goods-list",
    data() {
      return {
        page: 1,
        size: 10,
        tableData: [
          {
            title: '我就是大我就是大我就是大我就是大我就是大我就是大我就是大我就是大我就是大我就是大',
            price: '¥1.00',
            payment_number: 100,
            monthly_sales: 1000,
            ship_address: '湖北省武汉市',
            courier_fees: '¥2.00',
            goods_category_id: '服装',
            create_time: '2020-3-20 00:00:00'
          },
        ]
      }
    },
    methods: {
      toAddUpdateGoods() {
        this.$router.push({
          path: '/goods/addUpdateGoods',
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
  .goodsList{
    padding: 20px;
    .tabel-top{
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .pagination{
      margin-top: 20px;
    }
  }
</style>