<template>
    <div>
        <td-table url="phone/phoneList">
            <template slot="leftHeaderBtn">
                <a-button type="primary" @click="showModal">
                    上传电话
                </a-button>
            </template>
        </td-table>
        <a-modal
                :width="520"
                title="上传电话"
                :visible="visible"
                :confirm-loading="confirmLoading"
                cancelText="取消"
                okText="保存"
                @ok="handleCreate"
                @cancel="handleCancel">
            <a-form-model :model="form" :label-col="labelCol" :rules="rules"
                          ref="ruleForm"
                          :wrapper-col="wrapperCol">
                <a-form-model-item label="电话名称" prop="name">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="电话号码" prop="phoneNumber">
                    <a-input v-model="form.phoneNumber" />
                </a-form-model-item>
                <a-form-model-item label="分类" prop="cateId">
                    <remote-select v-model="form.cateId" name="com.tdeado.phone.entity.PhoneCate">
                    </remote-select>
                </a-form-model-item>

                <a-form-model-item label="城市" prop="cityId">
                    <td-city-select v-model="form.cityId"></td-city-select>
                </a-form-model-item>
                <a-form-model-item label="地址" prop="address">
                    <a-input v-model="form.address" placeholder="详细地址" />
                </a-form-model-item>
                <a-form-model-item label="说明" prop="explain">
                    <a-input v-model="form.explain" type="textarea" :auto-size="{ minRows: 3, maxRows: 6 }" />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
  import TdTable from '../../base/TdTable'
  import TdCitySelect from '../../base/TdCitySelect'
  import RemoteSelect from '../../base/modules/RemoteSelect'
  export default {
    name: "PhoneList",
    components: { RemoteSelect, TdCitySelect,  TdTable },
    data () {
      return {
        visible: false,
        confirmLoading:false,
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
        rules: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' },
            { min: 1, max: 6, message: '长度不能超过6个字', trigger: 'blur' },
          ],
          phoneNumber: [{ required: true, message: '电话号码不能为空', trigger: 'blur' }],
          cateId: [{ required: true, message: '必须选择分类', trigger: 'change' }],
          cityId: [
            {
              type: 'array',
              required: true,
              message: '请选择城市',
              trigger: 'change',
            },
          ],
          address: [
            { required: true, message: '详细地址不能为空', trigger: 'change' },
          ],
          explain: [{ required: true, message: '说明不能为空', trigger: 'blur' }],
        },
        form: {
          name: '',
          phoneNumber: '',
          cateId: '',
          cityId: [],
          address: '',
          expireTime: '',
          explain: '',
        },
      };
    },
    methods: {
      showModal () {
        this.visible = true;
      },
      handleCancel () {
        this.visible = false;
      },
      handleCreate () {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            alert('submit!');

            // this.visible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
