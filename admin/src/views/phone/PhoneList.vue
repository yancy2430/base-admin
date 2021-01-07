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
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="电话名称">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="分类">
                    <a-select v-model="form.region" placeholder="please select your zone">
                        <a-select-option value="shanghai">
                            Zone one
                        </a-select-option>
                        <a-select-option value="beijing">
                            Zone two
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item label="城市">
                    <td-city-select v-model="form.city"></td-city-select>
                </a-form-model-item>

                <a-form-model-item label="过期时间">
                    <a-date-picker
                            v-model="form.date1"
                            show-time
                            type="date"
                            placeholder="Pick a date"
                            style="width: 100%;"
                    />
                </a-form-model-item>
                <a-form-model-item label="说明">
                    <a-input v-model="form.desc" type="textarea" />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
  import TdTable from '../../base/TdTable'
  import TdCitySelect from '../../base/TdCitySelect'
  export default {
    name: "PhoneList",
    components: { TdCitySelect,  TdTable },
    data () {
      return {
        visible: false,
        confirmLoading:false,
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
        form: {
          name: '',
          region: undefined,
          date1: undefined,
          delivery: false,
          type: [],
          resource: '',
          desc: '',
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
        this.visible = false;
      },
    }
  }
</script>

<style scoped>

</style>
