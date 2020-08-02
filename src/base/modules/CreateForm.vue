<template>
  <a-modal
    title="新增"
    :width="940"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">

        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled/>
        </a-form-item>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="文本">
              <a-input/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="数字">
              <a-input-number style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="选择器">
              <a-select default-value="lucy">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="勾选">
              <a-checkbox-group
                name="checkboxgroup"
                :options="['Apple', 'Pear', 'Orange']"
              />
              <br/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="日期">
              <a-date-picker style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="日期时间">
              <a-date-picker style="width: 100%;" format="YYYY-MM-DD HH:mm:ss"
                      :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="日期区间">
              <a-range-picker style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="日期时间区间">
              <a-range-picker
                style="width: 100%;"
                :show-time="{hideDisabledOptions: true,defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],}"
                format="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="级联选择">
              <a-cascader :options="options" placeholder="Please select" />

            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="标签多选">
              <a-select mode="tags" style="width: 100%" placeholder="Tags Mode">
                <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                  {{ (i + 9).toString(36) + i }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="附件上传">
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                <a-button> <a-icon type="upload" /> Click to Upload </a-button>
              </a-upload>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="图片上传">
              <a-upload
                style="width: 100%;height: 150px;"
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                <img style="width: 100%;height: 150px;" v-if="true" :src="'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="文本域">
              <a-textarea
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3, maxRows: 5 }"
              />
            </a-form-item>
          </a-col>

        </a-row>



      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'

  import moment from 'moment';
  // 表单字段
  const fields = ['description', 'id']

  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      loading: {
        type: Boolean,
        default: () => false
      },
      model: {
        type: Object,
        default: () => null
      },
      inputs: {
        type: Array,
        required: true
      }
    },
    data () {
      this.formLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        }
      }
      return {
        form: this.$form.createForm(this),
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            name:'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                name:'hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                    name:'xihu',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            name:'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                name:'nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                    name:'zhonghuamen',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
    created () {
      console.log('custom modal created')

      // 防止表单未注册
      fields.forEach(v => this.form.getFieldDecorator(v))

      // 当 model 发生改变时，为表单设置值
      this.$watch('model', () => {
        this.model && this.form.setFieldsValue(pick(this.model, fields))
      })
    },
    methods:{
      moment,
      range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      },
    }
  }
</script>
<style>
  .ant-upload.ant-upload-select-picture-card {
    display: table;
    float: left;
    width: 100%;
    height: 100%;
  }
</style>