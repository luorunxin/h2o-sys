<template>
  <div class="Modify-product">
    <div class="Modify-product-top">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input
            v-model="form.price"
            type="number"
            @change="price"
            placeholder="(元)"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货地址">
          <el-input
            v-model="form.address"
            type="text"
            @change="price"
            placeholder="某某市/某某区"
          ></el-input>
        </el-form-item>
        <el-form-item label="快递费用">
          <el-input
            v-model="form.courier_fees"
            type="number"
            @change="expressDelivery"
            placeholder="可为0,不能为负数"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="form.region" placeholder="请选择商品类型">
            <el-option label="服装" value="1"></el-option>
            <el-option label="零食" value="2"></el-option>
            <el-option label="数码" value="3"></el-option>
            <el-option label="玩具" value="4"></el-option>
            <el-option label="装饰" value="5"></el-option>
            <el-option label="家私" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品参数">
          <el-col :span="11">
            <el-input v-model="form.date1" placeholder="参数标题"></el-input>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-input
              v-model="form.date2"
              placeholder="参数内容"
              style="width: 150%"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <!--      动态渲染组件-->
      <component :is="displays" :father="this.form" v-on:childByValue="childByValue"></component>
      <div class="img">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="form.srcs"
          list-type="picture"
        >
          上传图片:
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <div class="sub">
        <el-row>
          <el-button type="primary" @click="onSubmit">添加商品</el-button>
          <el-button plain>重置</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import clothing from "../Product _Types/clothing";
import Snacks from "../Product _Types/Snacks";
export default {
  name: "index",
  data() {
    return {
      form: {
        //商品名字
        title: "",
        //商品价格
        price: null,
        //商品发货地址
        address: "",
        //快递费用
        courier_fees: null,
        //商品参数名称
        date1: "sdf",
        //商品参数介绍
        date2: "ds",
        //商品类型
        region: "1",
        //子组件传过来的数据
        clothing_amounts:[],
        //男装还是女装
        gender:'0',
        //上衣还是裤子
        part:'0',
        //图片
        srcs: [
          {
            name: "food.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          },
          {
            name: "food2.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          }
        ]
      },
      displays: "clothing",

    };
  },
  created() {
    //用来判断当前用户选择的商品类型 来动态渲染相应的组件
    switch (this.displays) {
      case "Snacks":
        this.displays = "Snacks";
        break;
      case "clothing":
        this.displays = "clothing";
        break;
    }
  },
  methods: {
    childByValue(childByValue) {
      console.log(childByValue)
      this.form.clothing_amounts = [...childByValue.commodity];
      this.form.gender = childByValue.gender;
      this.form.part = childByValue.part;
    },
    //判断价格输入框 不能为负数
    price() {
      if (this.form.price << 1) {
        this.form.price = 1;
        this.$notify({
          title: "警告",
          message: "最低价格不能低于1",
          type: "warning"
        });
      }
    },
    //判断快递费用
    expressDelivery() {
      if (this.form.expressDelivery < 0) {
        this.form.expressDelivery = 0;
        this.$notify({
          title: "警告",
          message: "快递费用不能为负数",
          type: "warning"
        });
      }
    },
    onSubmit() {
      console.log("submit!",this.form);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },

  components: {
    clothing,
    Snacks
  }
};
</script>

<style scoped lang="scss">
.Modify-product {
  .Modify-product-top {
    width: 50%;
    padding: 3%;
    position: relative;
  }
}
.sub {
  padding: 5%;
}
.img {
  padding: 5%;
}
</style>
