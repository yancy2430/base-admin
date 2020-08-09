<template>

  <section>
    <a-form :form="form" layout="vertical" hide-required-mark>
      <a-row :gutter="16">
        <a-col :span="item.inputType===12?24:12" v-for="(item,index) in inputs" :key="index">

          <a-form-item :label="item.title">
            <a-tooltip placement="topRight" mouseEnterDelay="0.4">
              <template slot="title">
                <span>{{item.prompt}}</span>
              </template>
              <a-textarea v-if="item.inputType===12" :label="item.title" placeholder="Controlled autosize"
                          :auto-size="{ minRows: 3, maxRows: 5 }"/>
              <!--文本-->
              <a-input v-else-if="item.inputType===1" placeholder=""/>
              <!--数字-->
              <a-input v-else-if="item.inputType===2" placeholder=""/>
              <!--选择-->
              <a-input v-else-if="item.inputType===3" placeholder=""/>
              <!--勾选-->
              <a-input v-else-if="item.inputType===4" placeholder=""/>
              <!--日期时间-->
              <a-input v-else-if="item.inputType===5" placeholder=""/>
              <!--日期-->
              <a-input v-else-if="item.inputType===6" placeholder=""/>
              <!--图片-->
              <a-input v-else-if="item.inputType===7" placeholder=""/>
              <!--文件-->
              <a-input v-else-if="item.inputType===8" placeholder=""/>
              <!--单级外键-->
              <a-input v-else-if="item.inputType===9" placeholder=""/>
              <!--多级外键-->
              <a-input v-else-if="item.inputType===10" placeholder=""/>
              <!--枚举类-->
              <a-input v-else-if="item.inputType===11" placeholder=""/>
              <!--开关-->
              <a-input v-else-if="item.inputType===13" placeholder=""/>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div
      :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        Cancel
      </a-button>
      <a-button type="primary" @click="onClose">
        Submit
      </a-button>
    </div>
  </section>
</template>

<script>
  import pick from 'lodash.pick'

  import moment from 'moment'
  // 表单字段
  const fields = ['description', 'id']

  export default {
    props: {
      inputs: {
        type: Array,
        required: true
      }
    },
    data () {

      return {
        form: this.$form.createForm(this),
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            name: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                name: 'hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                    name: 'xihu',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            name: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                name: 'nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                    name: 'zhonghuamen',
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
    methods: {
      moment,
      range (start, end) {
        const result = []
        for (let i = start; i < end; i++) {
          result.push(i)
        }
        return result
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