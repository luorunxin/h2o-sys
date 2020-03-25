<template>
  <div class="goodsList">
    <div class="tabel-top">
      <el-button @click="toAddUpdateGoods" type="primary" size="small">添加商品</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="80px" label-position="left" class="demo-table-expand">
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span class="price">¥ {{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="付款人数">
              <span>{{ props.row.payment_number }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.monthly_sales }}</span>
            </el-form-item>
            <el-form-item label="发货地址">
              <span>{{ props.row.ship_address }}</span>
            </el-form-item>
            <el-form-item label="快递费用">
              <span class="price">¥ {{ props.row.courier_fees }}</span>
            </el-form-item>
            <el-form-item label="商品类别">
              <span>{{ props.row.goods_category_id | getCategory(categoryList)}}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.create_time | date}}</span>
            </el-form-item>
            <el-form-item
              v-for="(item, index) in props.row.parameters"
              :key="index"
              :label="index == 0?'产品参数':''"
            >
              <span>{{ item.key }}</span> :
              <span>{{ item.value }}</span>
            </el-form-item>
            <el-form-item label="服装部位">
              <span>{{ props.row.type[0].part_id | getCategory(typesList)}}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.type[0].gender == 1?'男':'女'}}</span>
            </el-form-item>
            <el-form-item label="商品库存">
              <span class="w100" v-show="props.row.amounts[0].color">颜色</span>
              <span class="w100" v-show="props.row.amounts[0].size">尺码</span>
              <span class="w100" v-show="props.row.amounts[0].color || props.row.amounts[0].size">库存量</span>
            </el-form-item>
            <el-form-item
              v-for="(item, index) in props.row.amounts"
              :key="index"
              label=""
            >
              <span class="w100">{{ item.color }}</span>
              <span class="w100">{{ item.size }}</span>
              <span class="w100">{{ item.amount }}</span>
            </el-form-item>
            <el-form-item label="图片">
              <el-image
                v-for="(item, index) in props.row.imageList"
                :key="index"
                lazy
                style="width: 100px; height: 100px;margin-right: 10px;"
                :src="item"
                :preview-src-list="props.row.imageList">
              </el-image>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        min-width="300"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="price"
        show-overflow-tooltip
        width="100"
        label="价格(元)">
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
        label="快递费用(元)">
      </el-table-column>
      <el-table-column
        prop="goods_category_id"
        show-overflow-tooltip
        width="100"
        label="商品类别"
      >
        <template slot-scope="scope">{{scope.row.goods_category_id | getCategory(categoryList)}}</template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        show-overflow-tooltip
        class-name="nowrap"
      >
        <template slot-scope="scope">{{scope.row.create_time | date}}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="90"
        label="操作">
        <template slot-scope="scope">
          <!--<el-button @click="handleClick(scope.row)" type="text" size="mini">详情</el-button>-->
          <el-button style="margin-right: 10px" @click="handleClick(scope.row)" type="text" size="mini">编辑</el-button>
          <el-popconfirm
            :title="`确定删除 '${scope.row.title}' 这个商品吗？`"
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
    name: "goods-list",
    data() {
      return {
        page: 1,
        size: 10,
        tableData: [],
        loading: false,
        categoryList: [],
        typesList: []
      }
    },
    mounted() {
      this.getCategoryList()
      this.getTypesList()
      this.goodsList()
    },
    methods: {
      goodsList() {
        this.loading = true
        let params = {
          page: this.page,
          size: this.size
        }
        this.$ajax('/goodsList', JSON.stringify(params)).then(res => {
          this.loading = false
          if (res.status == 200) {
            this.tableData = res.result
            this.tableData.forEach(item => {
              item.parameters = this.getParameters(item.parameter)
              item.imageList = item.images.map(m => {
                return m.src
              })
            })
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
        this.goodsList()
      },
      handleCurrentChange(e) {
        this.page = e
        this.goodsList()
      },
      //编辑
      handleClick(row) {
        this.$router.push({
          path: '/goods/addUpdateGoods',
          query: {
            id: row.id,
            type: 2
          }
        })
      },
      //删除行
      deleteRow(rows) {
        this.loading = true
        this.$ajax('/deleteGoodsById', {id: rows.id}).then(res=>{
          if (res.status == 200) {
            this.$notify.success({
              title: '提示',
              message: '商品删除成功啦!!!'
            })
            this.goodsList()
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
      getCategoryList() {
        this.$ajax('/getCategoryList').then(res => {
          if (res.status == 200) {
            this.categoryList = res.result
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getTypesList() {
        this.$ajax('/getTypesList').then(res => {
          if (res.status == 200) {
            this.typesList = res.result
          }
        }).catch(err => {
          console.error(err)
        })
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