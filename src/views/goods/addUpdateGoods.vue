<template>
  <div class="add-update-goods">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rule"
      label-position="left"
      size="small"
      class="top-form"
    >
      <el-form-item label="标题" prop="title">
        <el-input class="w30" v-model="form.title" placeholder="请输入标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input @input="checkPrice" class="w30" v-model="form.price" placeholder="请输入价格" clearable></el-input>
      </el-form-item>
      <el-form-item label="发货地址" prop="ship_address">
        <el-input class="w30" v-model="form.ship_address" placeholder="请输入发货地址" clearable></el-input>
      </el-form-item>
      <el-form-item label="快递费用" prop="courier_fees">
        <el-input @input="checkCourierFees" class="w30" v-model="form.courier_fees" placeholder="请输入快递费用" clearable></el-input>
      </el-form-item>
      <div v-for="(item, index) in form.parameter" :key="item.key+index">
        <el-form-item
          class="itemparameter"
          label="产品参数"
          :prop="`parameter.${index}.key`"
          :rules="{required:true, message:'请输入参数名称', trigger: ['blur','change']}"
        >
          <el-input class="parameter" v-model="item.key" placeholder="请输入参数名称" clearable></el-input>
        </el-form-item>
        <el-form-item
          class="itemparameter"
          :prop="`parameter.${index}.value`"
          :rules="{required:true, message:'请输入参数值', trigger: ['blur','change']}"
        >
          <el-input class="parameter" v-model="item.value" placeholder="请输入参数值" clearable></el-input>
          <el-button
            v-show="form.parameter.length > 1"
            @click.stop="removeParameters(index)"
            class="remove-parameter"
            type="danger"
            size="small"
          >
            删除
          </el-button>
          <el-button
            v-show="index === form.parameter.length-1"
            @click.stop="addParameters"
            class="add-parameter"
            type="primary"
            size="small"
          >
            新增
          </el-button>
        </el-form-item>
      </div>
      <el-form-item label="商品类别" prop="goods_category_id">
        <el-select class="w30" v-model="form.goods_category_id" filterable placeholder="请选择商品类别">
          <el-option
            v-for="item in form.goods_categorys"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <Clothing
        :form="form"
        v-show="form.goods_category_id === 1001"
        @changeGender="changeGender"
        @changePart="changePart"
        @addAmount="addAmount"
        @removeAmount="removeAmount"
        @onCheckAmount="onCheckAmount"
      />
    </el-form>
    <el-form
      label-width="80px"
      label-position="left"
      size="small"
    >
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Clothing from './components/clothing'
  export default {
    name: "addUpdateGoods",
    components: {
      Clothing
    },
    data() {
      return {
        form: {
          title: '',
          price: null,
          ship_address: '',
          courier_fees: null,
          parameter: [
            {
              key: '',
              value: ''
            }
          ],
          srcs: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg'
          ],
          goods_category_id: null,
          goods_categorys: [
            {
              code: 1001,
              name: '服装'
            }
          ],
          gender: 1,
          part: null,
          parts: [
            {
              code: 10010,
              name: '上装'
            },
            {
              code: 10011,
              name: '下装'
            },
            {
              code: 10012,
              name: '鞋子'
            }
          ],
          clothing_amounts: [
            {
              color: '',
              size: '',
              amount: null
            }
          ]
        },
        rule: {
          title: [
            {required: true, message: '请输入标题', trigger: ['blur','change']}
          ],
          price: [
            {required: true, message: '请输入价格', trigger: ['blur','change']}
          ],
          ship_address: [
            {required: true, message: '请输入发货地址', trigger: ['blur','change']}
          ],
          courier_fees: [
            {required: true, message: '请输入快递费用', trigger: ['blur','change']}
          ],
          goods_category_id: [
            {required: true, message: '请选择商品类别', trigger: ['blur','change']}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: ['change']}
          ],
          part: [
            {required: true, message: '请选择服装部位', trigger: ['blur','change']}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        console.log(JSON.stringify(this.form,null,2))
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addParameters() {
        this.form.parameter.push({
          key: '',
          value: ''
        })
      },
      removeParameters(index) {
        this.form.parameter.splice(index,1)
      },
      addAmount() {
        this.form.clothing_amounts.push({
          color: '',
          size: '',
          amount: null
        })
      },
      removeAmount(index) {
        this.form.clothing_amounts.splice(index,1)
      },
      checkPrice(value) {
        this.form.price= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''
      },
      checkCourierFees(value) {
        this.form.courier_fees= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''
      },
      onCheckAmount(value,index) {
        this.form.clothing_amounts[index].amount= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''
      },
      changeGender(value) {
        this.form.gender = value
      },
      changePart(value) {
        this.form.part = value
      }
    }
  };
</script>

<style lang="scss" scoped>
  .add-update-goods{
    padding: 20px;
    .top-form{
      .w30{
        width: 30%;
        min-width: 300px;
      }
      .itemparameter{
        display: inline-block;
      }
      .parameter{
        width: 10%;
        min-width: 150px;
      }
      .remove-parameter{
        margin-left: 40px;
      }
      .add-parameter{
        margin-left: 20px;
      }
    }
  }
</style>