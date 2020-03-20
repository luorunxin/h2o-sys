<template>
  <div class="Modify-product">
    <div class="Modify-product-top">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="form.region" placeholder="请选择商品类型">
            <el-option label="服装" value="shanghai"></el-option>
            <el-option label="零食" value="beijing"></el-option>
            <el-option label="数码" value="beijing"></el-option>
            <el-option label="玩具" value="beijing"></el-option>
            <el-option label="装饰" value="beijing"></el-option>
            <el-option label="家私" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="是否包邮">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="满199减50" name="type"></el-checkbox>
            <el-checkbox label="无门槛10元卷" name="type"></el-checkbox>
            <el-checkbox label="限时降价" name="type"></el-checkbox>
            <el-checkbox label="七天无理由退货" name="type"></el-checkbox>
            <el-checkbox label="30天保价" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="线上/线下">
          <el-radio-group v-model="form.resource">
            <el-radio label="纯电商销售"></el-radio>
            <el-radio label="线上/线下销售"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品介绍">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped lang="scss">
.Modify-product {
  .Modify-product-top {
    width: 40%;
    padding: 3%;
  }
}
</style>