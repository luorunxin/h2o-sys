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
        <el-input class="w30" maxlength="40" v-model="form.title" placeholder="请输入标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input @input="checkPrice" class="w30" v-model="form.price" placeholder="请输入价格" clearable></el-input>
      </el-form-item>
      <el-form-item label="发货地址" prop="ship_address">
        <el-input class="w30" v-model="form.ship_address" placeholder="请输入发货地址" clearable></el-input>
      </el-form-item>
      <el-form-item label="快递费用" prop="courier_fees">
        <el-input @input="checkCourierFees" class="w30" v-model="form.courier_fees" placeholder="请输入快递费用"
                  clearable></el-input>
      </el-form-item>
      <div v-for="(item, index) in form.parameterss" :key="index">
        <el-form-item
          class="itemparameterss"
          label="产品参数"
          :prop="`parameterss.${index}.key`"
          :rules="{required:true, message:'请输入参数名称', trigger: ['blur','change']}"
        >
          <el-input class="parameterss" v-model="item.key" placeholder="请输入参数名称" clearable></el-input>
        </el-form-item>
        <el-form-item
          class="itemparameterss"
          :prop="`parameterss.${index}.value`"
          :rules="{required:true, message:'请输入参数值', trigger: ['blur','change']}"
        >
          <el-input class="parameterss" v-model="item.value" placeholder="请输入参数值" clearable></el-input>
          <el-button
            v-show="form.parameterss.length > 1"
            @click.stop="removeparametersss(index)"
            class="remove-parameterss"
            type="danger"
            size="small"
          >
            删除
          </el-button>
          <el-button
            v-show="index === form.parameterss.length-1"
            @click.stop="addparametersss"
            class="add-parameterss"
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
          //商品标题
          title: '',
          //商品价格
          price: null,
          //发货地址
          ship_address: '',
          //快递费用
          courier_fees: null,
          //商品参数
          parameterss: [
            {
              key: '',
              value: ''
            }
          ],
          //图片
          srcs: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820332151&di=ce29625309c3f15869cf3c44030ad1ea&imgtype=0&src=http%3A%2F%2F46.s21i-2.faidns.com%2F2841046%2F2%2FABUIABACGAAg5Ou0mQUo1pmzjwMw6Ac4lAU.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820350866&di=7a7d124698ace91b20d187590de52da6&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584820368048&di=5494afdbc18f948af5c198673e44fea4&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F865-161022163028.jpg'
          ],
          //商品类别 如服装
          goods_category_id: null,
          //1001是服装
          goods_categorys: [],
          //1男2女
          gender: null,
          //服装部位
          part_id: null,
          //服装部位对应的数字
          parts: [],
          //颜色 大小 和库存量
          clothing_amounts: [
            {
              color: '',
              size: '',
              amount: null
            }
          ],
          ss:[]
        },
        rule: {
          title: [
            {required: true, message: '请输入标题', trigger: ['blur', 'change']}
          ],
          price: [
            {required: true, message: '请输入价格', trigger: ['blur', 'change']}
          ],
          ship_address: [
            {required: true, message: '请输入发货地址', trigger: ['blur', 'change']}
          ],
          courier_fees: [
            {required: true, message: '请输入快递费用', trigger: ['blur', 'change']}
          ],
          goods_category_id: [
            {required: true, message: '请选择商品类别', trigger: ['blur', 'change']}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: ['change']}
          ],
          part: [
            {required: true, message: '请选择服装部位', trigger: ['blur', 'change']}
          ]
        },
      }
    },
    mounted() {
      this.getCategoryList()
      this.getTypesList()
      if(this.$route.query.type == 2) {
        this.getGoodsById(this.$route.query.id)
      }
    },
    methods: {
      getGoodsById(id) {
        const loading = this.$loading({
          target: document.querySelector('.top-form'),
          text: '加载中...',
        })
        this.$ajax('/getGoodsById', {id}).then(res => {
          if (res.status == 200) {
            Object.assign(this.form, res.result)
            this.form.clothing_amounts = []
            this.form.parameterss = this.getParameters(res.result.parameter);
            this.form.amounts.forEach(item => {
              let obj = {}
              obj.color = item.color
              obj.size = item.size
              obj.amount = item.amount
              this.form.clothing_amounts.push(obj)
            })
            this.form.type.forEach(item => {
              this.form.gender = item.gender;
              this.form.goods_categorys_id = item.goods_category_id;
              this.form.part_id = item.part_id;
            });
          }else{
            this.$notify.error({
              title: '提示',
              message: res.message
            })
          }
          loading.close()
        }).catch(err => {
          console.error(err);
          loading.close()
        })
      },
      submitForm(formName) {
        const loading = this.$loading({
          target: document.querySelector('.top-form'),
          text: '提交中...',
        })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.price = parseFloat(this.form.price)
            this.form.courier_fees = parseFloat(this.form.courier_fees)
            this.form.clothing_amounts.forEach(item => {
              item.amount = parseFloat(item.amount)
            })
            let parameter = ''
            this.form.parameterss.forEach((item, index) => {
              if (index == this.form.parameterss.length - 1) {
                parameter += item.key + ':' + item.value
              } else {
                parameter += item.key + ':' + item.value + ';'
              }
            })
            this.form.parameter = parameter
            this.$ajax('/saveGoods', JSON.stringify(this.form)).then(res => {
              loading.close()
              if (res.status == 200) {
                this.$notify.success({
                  title: '提示',
                  message: this.$route.query.type===1?'商品添加成功啦!!!':'商品修改成功啦!!!'
                })
                this.$router.push({
                  path: '/goods/list'
                })
              } else {
                this.$notify.error({
                  title: '提示',
                  message: res.message
                })
              }
            }).catch(err => {
              console.error(err)
              loading.close()
            })
          } else {
            return false;
          }
        })
      },
      addparametersss() {
        this.form.parameterss.push({
          key: '',
          value: ''
        })
      },
      removeparametersss(index) {
        this.form.parameterss.splice(index, 1)
      },
      addAmount() {
        this.form.clothing_amounts.push({
          color: '',
          size: '',
          amount: null
        })
      },
      removeAmount(index) {
        this.form.clothing_amounts.splice(index, 1)
      },
      checkPrice(value) {
        this.form.price = value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''
      },
      checkCourierFees(value) {
        this.form.courier_fees = value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''
      },
      onCheckAmount(value, index) {
        this.form.clothing_amounts[index].amount = value.match(/\d+/) ? value.match(/\d+/)[0] : ''
      },
      changeGender(value) {
        this.form.gender = value
      },
      changePart(value) {
        this.form.part = value
      },
      getCategoryList() {
        this.$ajax('/getCategoryList').then(res => {
          if (res.status == 200) {
            this.form.goods_categorys = res.result
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getTypesList() {
        this.$ajax('/getTypesList').then(res => {
          if (res.status == 200) {
            this.form.parts = res.result
          }
        }).catch(err => {
          console.error(err)
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .add-update-goods {
    padding: 20px;

    .top-form {
      .w30 {
        width: 30%;
        min-width: 300px;
      }

      .itemparameterss {
        display: inline-block;
      }

      .parameterss {
        width: 10%;
        min-width: 150px;
      }

      .remove-parameterss {
        margin-left: 40px;
      }

      .add-parameterss {
        margin-left: 20px;
      }
    }
  }
</style>