<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url" alt=""
        >
        <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "h2oUpload",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
      };
    },
    props: {
      fileSize: {
        type: Number,
        default: 5
      },
      fileTypes: {
        type: Array,
        default: () => ["image/gif","image/jpeg","image/jpg","image/png"]
      },
      fileList: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res) {
        this.$emit('onSuccessHandle', res)
      },
      beforeAvatarUpload(file) {
        const isJPG = this.fileTypes.includes(file.type)
        const isLt2M = file.size / 1024 / 1024 < this.fileSize

        if (!isJPG) {
          this.$message.error(`文件只能上传 ${this.fileTypes.join('、')} 格式!`)
        }
        if (!isLt2M) {
          this.$message.error(`文件大小不能超过 ${this.fileSize}MB!`)
        }
        return isJPG && isLt2M
      }
    }
  };
</script>

<style scoped>

</style>