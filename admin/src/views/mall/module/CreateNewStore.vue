<template>
    <a-card :bordered="false">
        <a-form
                id="components-form-demo-validate-other"
                :form="form"
                :label-col="labelCol" :wrapper-col="wrapperCol"
                @submit="storeAdd"
        >
            <a-form-item label="所属用户">
                <remote-select name="com.tdeado.user.entity.UserMember" placeholder="所属用户"
                               v-decorator="['userId',{rules: [{ required: true, message: '请选择所属用户' }], validateTrigger: 'change'}]">

                </remote-select>
            </a-form-item>

            <a-form-item label="店铺分类">
                <remote-select
                        name="com.tdeado.mall.entity.MallStoreCate"
                        placeholder="店铺分类"
                        v-decorator="['cateId',{rules: [{ required: true, message: '请选择店铺分类' }], validateTrigger: 'change'}]">
                </remote-select>
            </a-form-item>
            <a-form-item label="店铺名称">
                <a-input
                        v-decorator="['storeName',{rules: [{ required: true, message: '请输入店铺名称' }]}]"/>
            </a-form-item>
            <a-form-item label="负责人">
                <a-input
                        v-decorator="['principalName',{rules: [{ required: true, message: '请输入负责人姓名' }]}]"/>
            </a-form-item>
            <a-form-item label="联系电话">
                <a-input
                        v-decorator="['principalTel',{rules: [{ required: true, message: '请输入联系电话' }]}]"/>
            </a-form-item>
            <a-form-item label="店铺logo" extra="请上传200*200大小的正方形图片">
                <a-upload
                        name="file"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        action="/admin/file/uploadSingleImage"
                        :before-upload="beforeUpload"
                        v-decorator="['logo',{rules: [{ required: true, message: '请选择上传logo' }]}]"
                        @change="uploadChange"
                >
                    <img style="width: 100px;height: 100px;" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">
                            Upload
                        </div>
                    </div>
                </a-upload>
            </a-form-item>
            <a-form-item label="标签">
                <a-select mode="tags" style="width: 100%" :token-separators="[',']"
                          v-decorator="['storeTag',{rules: [{ required: true, message: '请输入标签 回车分词' }]}]"
                >
                </a-select>
            </a-form-item>
            <a-form-item label="店铺地址"
                         v-decorator="['address',{rules: [{ required: true, message: '请输入店铺地址' }]}]">
                <a-input/>
            </a-form-item>
            <a-form-item label="店铺简介">
                <a-input
                        v-decorator="['about',{rules: [{ required: true, message: '店铺简介' }]}]"/>
            </a-form-item>
            <a-form-item label="上传执照" extra="上传营业执照、食品加工许可证等证件">
                <a-upload
                        action="/admin/file/uploadSingleImage"
                        list-type="picture"
                        name="file"
                        multiple
                        v-decorator="['license',{rules: [{ required: true, message: '请选择上传logo' }]}]"
                >
                    <a-button>
                        <a-icon type="upload"/>
                        选择图片
                    </a-button>
                </a-upload>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script>
  import RemoteSelect from '../../../base/modules/RemoteSelect'


  export default {
    name: "CreateNewStore",
    components: { RemoteSelect },
    props: ['visible'],
    data () {
      return {
        loading:false,
        imageUrl:false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        }
      }
    },
    beforeCreate () {
      this.form = this.$form.createForm(this);
    },
    methods: {
      uploadChange(info){
            if (info.file.status === 'uploading') {
              this.loading = true;
              return;
            }
            if (info.file.status === 'done') {
              // Get this url from response in real world.
                this.imageUrl = info.file.response.data.thumbnail;
                this.loading = false;
            }
      },

      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.error('只能上传图片文件');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小小于 2MB!');
        }
        return isJpgOrPng && isLt2M;
      },
      storeAdd (e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (err) {
            this.loading = false
            return;
          }
          let licenses =[];
          values.license.fileList.forEach(function(item) {
            licenses.push(item.response.data.path)
          })
          values.license = licenses;
          values.logo = values.logo.file.response.data.path

          this.$emit("submit",values)
        });

      }
    }

  }
</script>

<style scoped>

</style>
