<template>
  <div>
    <el-form-item label="商品类别" prop="gender">
      <el-radio-group @change="changeGender" v-model="form.gender">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="服装部位" prop="part_id">
      <el-select @change="changePart" class="w30" v-model="form.part_id" filterable placeholder="请选择服装部位">
        <el-option
          v-for="item in form.parts"
          :key="item.code"
          :label="item.name"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <div v-for="(item, index) in form.clothing_amounts" :key="index">
      <el-form-item
        class="itemparameterss"
        label="商品库存"
        :prop="`clothing_amounts.${index}.color`"
        :rules="{required:true, message:'请输入颜色', trigger: ['blur','change']}"
      >
        <el-input class="parameter" v-model="item.color" placeholder="请输入颜色" clearable></el-input>
      </el-form-item>
      <el-form-item
        class="itemparameterss"
        :prop="`clothing_amounts.${index}.size`"
        :rules="{required:true, message:'请输入尺码', trigger: ['blur','change']}"
      >
        <el-input class="parameter" v-model="item.size" placeholder="请输入尺码" clearable></el-input>
      </el-form-item>
      <el-form-item
        class="itemparameterss"
        :prop="`clothing_amounts.${index}.amount`"
        :rules="{required:true, message:'请输入库存量', trigger: ['blur','change']}"
      >
        <el-input @input="checkAmount(item.amount,index)" class="parameter" v-model="item.amount" placeholder="请输入库存量" clearable></el-input>
        <el-button
          v-show="form.clothing_amounts.length > 1"
          @click.stop="removeParameters(index)"
          class="remove-parameter"
          type="danger"
          size="small"
        >
          删除
        </el-button>
        <el-button
          v-show="index === form.clothing_amounts.length-1"
          @click.stop="addParameters"
          class="add-parameter"
          type="primary"
          size="small"
        >
          新增
        </el-button>
      </el-form-item>
    </div>
  </div>
</template>

<script>
  export default {
    name: "clothing",
    data() {
      return {

      }
    },
    props: ['form'],
    methods: {
      changePart() {
        this.$emit('changePart', this.form.part)
      },
      changeGender() {
        this.$emit('changeGender', this.form.gender)
      },
      addParameters() {
        this.$emit('addAmount')
      },
      removeParameters(index) {
        this.$emit('removeAmount', index)
      },
      checkAmount(value,index) {
        this.$emit('onCheckAmount',value,index)
      }
    }
  };
</script>

<style lang="scss" scoped>
  .w30{
    width: 30%;
    min-width: 300px;
  }
  .parameter{
    width: 10%;
    min-width: 150px;
  }
  .itemparameterss{
    display: inline-block;
  }
  .remove-parameter{
    margin-left: 40px;
  }
  .add-parameter{
    margin-left: 20px;
  }
</style>