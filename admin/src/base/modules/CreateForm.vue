<template>

  <section>
    <a-form :form="form" layout="vertical" hide-required-mark>
      <a-row :gutter="16">
        <a-col :span="item.inputType===12?24:12" v-for="(item,index) in inputs" :key="index"  v-if="item.inputType>0">

          <a-form-item :label="item.title">
            <a-tooltip placement="topRight" :mouseEnterDelay="0.4">
              <template slot="title">
                <span>{{ item.prompt }}</span>
              </template>
              <a-textarea
                v-if="item.inputType===12"
                :label="item.title"
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3, maxRows: 5 }"/>
              <!--文本-->
              <a-input v-if="item.inputType===1"/>
              <!--数字-->
              <a-input-number v-if="item.inputType===2"/>
              <!--日期时间-->
              <a-input v-if="item.inputType===5" placeholder=""/>
              <!--日期-->
              <a-input v-if="item.inputType===6" placeholder=""/>
              <!--图片-->
              <a-input v-if="item.inputType===7" placeholder=""/>
              <!--文件-->
              <a-input v-if="item.inputType===8" placeholder=""/>
              <!--开关-->
              <a-input v-if="item.inputType===13" placeholder=""/>
              <r-select v-if="item.inputType===9" :inputType="item.inputType" :hash="item.hash" v-model="item.value" ></r-select>
              <r-select v-if="item.inputType===15" :inputType="item.inputType" :hash="item.hash" v-model="item.value" ></r-select>
              <r-select v-if="item.inputType===11" :inputType="item.inputType" :hash="item.hash" v-model="item.value" ></r-select>
              <r-select v-if="item.inputType===14" :inputType="item.inputType" :hash="item.hash" v-model="item.value" ></r-select>
              <r-select v-if="item.inputType===10" :inputType="item.inputType" :hash="item.hash" v-model="item.value" ></r-select>
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
      <a-button :style="{ marginRight: '8px' }">
        Cancel
      </a-button>
      <a-button type="primary">
        Submit
      </a-button>
    </div>
  </section>
</template>

<script>
  import pick from 'lodash.pick'

  import moment from 'moment'
  import SSelect from './SSelect'
  import MSelect from './MSelect'
  import RSelect from './RSelect'
  // 表单字段
  const fields = ['description', 'id']

  export default {
    components: { RSelect, MSelect, SSelect },
    props: {
      inputs: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
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
      }
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
