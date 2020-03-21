<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rule"
      label-position="left"
      size="small"
      class="top-form"
    >
      <el-form-item label="商品类别" prop="gender">
        <el-radio v-model="form.gender" label="1">男</el-radio>
        <el-radio v-model="form.gender" label="2">女</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "clothing",
    data() {
      return {
        form: {
          gender: "1"
        },
        rule: {
          gender: [
            {required: true, message: '请选择性别', trigger: ['change']}
          ]
        }
      }
    }
  };
</script>

<style scoped>

</style>