<template>
    <a-card :bordered="false">
        <a-form
                id="components-form-demo-validate-other"
                :form="form"
                v-bind="'horizontal'"
                :label-col="labelCol" :wrapper-col="wrapperCol"
                @submit="handleSubmit"
        >
            <a-form-item label="所属用户">
                <remote-select name="com.tdeado.user.entity.UserMember" placeholder="店铺分类">

                </remote-select>
            </a-form-item>

            <a-form-item label="店铺分类">
                <remote-select
                        multiple="multiple"
                        name="com.tdeado.mall.entity.MallStoreCate"
                        placeholder="店铺分类"
                >
                </remote-select>
            </a-form-item>
            <a-form-item label="店铺名称">
                <a-input
                        v-decorator="[
          'select',
          { rules: [{ required: true, message: 'Please select your country!' }] },
        ]"/>
            </a-form-item>
            <a-form-item label="负责人">
                <a-input />
            </a-form-item>
            <a-form-item label="联系电话">
                <a-input />
            </a-form-item>
            <a-form-item label="店铺logo">
                <a-input />
            </a-form-item>
            <a-form-item label="标签">
                <a-input />
            </a-form-item>
            <a-form-item label="店铺地址">
                <a-input />
            </a-form-item>
            <a-form-item label="店铺简介">
                <a-input />
            </a-form-item>
            <a-form-item label="上传营业执照" extra="清晰可分辨营业执照号">
                <a-upload
                        v-decorator="[
          'upload',
          {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
        ]"
                        name="logo"
                        action="/upload.do"
                        list-type="picture"
                >
                    <a-button>
                        <a-icon type="upload"/>
                        Click to upload
                    </a-button>
                </a-upload>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
                <a-button type="primary" html-type="submit">
                    Submit
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
    data(){
      return {
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
      this.form = this.$form.createForm(this, { name: 'form_in_modal' });
    },
    methods: {

    }

  }
</script>

<style scoped>

</style>
