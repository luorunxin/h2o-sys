<template>
  <div class="clothing ">
    <div class="aa">
      <p>男装/女装</p>
      <el-radio v-model="gender" label="1">男</el-radio>
      <el-radio v-model="gender" label="2">女</el-radio>
    </div>
    <div class="aa">
      <p>服装部位</p>
      <el-radio v-model="part" label="1">上衣</el-radio>
      <el-radio v-model="part" label="2">裤子</el-radio>
      <el-radio v-model="part" label="3">其他</el-radio>
    </div>
    <div class="clothingList">
      <div class="clothingList" v-for="(item, index) in commoditys.commodity" :key="index">
        <div>
          {{ item.title }}:
          <el-input v-model="item.value" @change="onSubmit" :placeholder="item.prompt"></el-input>
        </div>
      </div>
      <el-button type="text">新增</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "clothing",
  data() {
    return {
      //商品
      commoditys: {
        gender:'1',
        part: '1',
        commodity: [
          { title: "商品颜色", value: "", prompt: "请输入颜色" },
          { title: "商品尺码", value: "", prompt: "请输入尺码" },
          { title: "商品库存", value: "", prompt: "请输入库存" }
        ],
      },
      suu:0,
      gender:'1',
      part: '1'
    };
  },
  methods: {
    //提交
    tijiao() {
      this.$emit('childByValue',this.commoditys)
    },
    onSubmit() {
      for (let i = 0; i < this.commoditys.commodity.length; i++) {
        if (this.commoditys.commodity[i].value) {
          this.suu++
        }
        if (this.suu==4) {
          this.tijiao();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.clothingList {
  display: flex;
  justify-content: space-between;
  padding: 3%;
  font-size: 14px;
  color: #4f4f4f;
  align-items: center;

  div {
    margin-right: 10px;
  }
}
  .aa {
    padding-left: 6%;
    font-size: 14px;
  }
</style>
