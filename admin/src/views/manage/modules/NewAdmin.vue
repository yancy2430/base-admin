<template>
    <a-card :bordered="false">
        <a-steps class="steps" :current="currentTab">
            <a-step title="填写基本信息"/>
            <a-step title="设置初始密码"/>
            <a-step title="创建完成"/>
        </a-steps>
        <div class="content">
            <a-form :form="forms[currentTab]" v-if="currentTab === 0" style="max-width: 360px; margin: 40px auto 0;">
                <a-form-item
                        label="登录账号"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                >
                    <a-input
                             v-decorator="[
            'username',
            {rules: [{ required: true, message: '请输入用户名' },{ validator: handleUsername }], validateTrigger: 'blur'}
          ]"
                    />
                </a-form-item>
                <a-form-item
                        label="真实姓名"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                >
                    <a-input
                             v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入姓名' }], validateTrigger: 'change'}
          ]"
                    />
                </a-form-item>
                <a-form-item label="绑定手机"
                             :labelCol="labelCol"
                             :wrapperCol="wrapperCol">
                    <a-input
                            style="width: 100%"

                            v-decorator="[
            'phone',
            {rules: [{ required: true, message: '请输入手机号' }], validateTrigger: 'change'}
          ]"
                    >
                        <a-select
                                slot="addonBefore"
                                style="width: 70px"
                                value="86"
                        >
                            <a-select-option value="86">
                                +86
                            </a-select-option>
                        </a-select>
                    </a-input>
                </a-form-item>
                <a-form-item
                        label="分配角色"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                >
                    <a-select
                              v-decorator="[
            'roleId',
            {rules: [{ required: true, message: '请选择角色' }], validateTrigger: 'change'}
          ]"
                    >
                        <a-select-opt-group v-for="d in options" :key="d.id">
                            <span slot="label">{{ d.name }}</span>
                            <a-select-option v-for="item in d.children" :key="item.id" :value="item.name">
                                {{ item.name }}
                            </a-select-option>
                        </a-select-opt-group>
                    </a-select>
                </a-form-item>
                <a-form-item :wrapperCol="{span: 19, offset: 5}">
                    <a-button type="primary" @click="nextStep">下一步</a-button>
                </a-form-item>
            </a-form>
            <a-form :form="forms[currentTab]" v-if="currentTab === 1" style="max-width: 360px; margin: 40px auto 0;">
                <a-form-item
                        label="登录账号"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        class="stepFormText"
                >
                    {{formValues[0].username}}
                </a-form-item>

                <a-form-item
                        label="设置密码"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        class="stepFormText"
                >
                    <a-input
                            type="password"
                            style="width: 80%;"
                            v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'change'}
          ]"/>
                </a-form-item>

                <a-form-item
                        label="安全设置"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        class="stepFormText"
                >
                    <a-checkbox>
                        用户重新登录时重设密码
                    </a-checkbox>
                </a-form-item>

                <a-form-item :wrapperCol="{span: 19, offset: 5}">
                    <a-button :loading="loading" type="primary" @click="onAddAdmin">提交</a-button>
                    <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
                </a-form-item>
            </a-form>
            <a-form :form="forms[currentTab]" v-if="currentTab === 2" style="max-width: 360px; margin: 40px auto 0;">
                <a-result title="用户创建成功" status="success" style="max-width: 560px; margin: 40px auto 0;">
                    <div class="information" ref="information">
                        <a-row>
                            <a-col :sm="8" :xs="24">登录账号：</a-col>
                            <a-col :sm="16" :xs="24">{{forms[0].username}}
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :sm="8" :xs="24">真实姓名：</a-col>
                            <a-col :sm="16" :xs="24">{{forms[0].name}}
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :sm="8" :xs="24">绑定手机：</a-col>
                            <a-col :sm="16" :xs="24">{{forms[0].phone}}
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :sm="8" :xs="24">登录密码：</a-col>
                            <a-col :sm="16" :xs="24">{{forms[0].password}}
                            </a-col>
                        </a-row>
                    </div>
                    <template #extra>
                        <a-button @click="finish">继续创建</a-button>
                        <a-tooltip placement="topLeft" v-model="tooltipVisible" @visibleChange="visibleChange">
                            <template slot="title">
                                <span>{{copyMsg}}</span>
                            </template>
                            <a-button type="primary" class="copyUserInfo" style="margin-left: 8px"
                                      data-clipboard-action="copy" :data-clipboard-text="copyUserInfo"
                                      @click="onCopyInfo">复制信息
                            </a-button>
                        </a-tooltip>
                    </template>
                </a-result>
            </a-form>
            <a-divider/>
            <div class="step-form-style-desc">
                <h3>说明</h3>
                <h4>创建后台管理用户</h4>
                <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
            </div>
        </div>
    </a-card>
</template>

<script>
  import RSelect from "../../../base/modules/RSelect";
  import { addAdmin } from "tdeado-api/manage"
  import request from '../../../utils/request'

  export default {
    name: 'NewAdmin',
    components: { RSelect },
    data () {
      return {
        copyUserInfo: "",
        tooltipVisible: false,
        loading: false,
        copyMsg: "一键复制用户信息",
        currentTab: 0,
        labelCol: { lg: { span: 5 }, sm: { span: 5 } },
        wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
        formValues: [],
        options:[],
        forms: [this.$form.createForm(this),this.$form.createForm(this),this.$form.createForm(this)]
      }
    },
    created(){
      request({
        url: 'roleList',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(res => {
        if (res.code === 0) {
            this.options = res.data
        }
      })
    },
    methods: {
      // handler
      nextStep () {
        this.forms[this.currentTab].validateFields((err, values) => {
          if (err) {
            return;
          }
          this.formValues[this.currentTab] = values;
          if (this.currentTab < 2) {
            this.currentTab += 1
          }
        });

      },
      prevStep () {
        if (this.currentTab > 0) {
          this.currentTab -= 1
        }
        setTimeout(() => {
          this.forms[this.currentTab].setFieldsValue(this.formValues[this.currentTab])
        }, 50);
      },
      onAddAdmin () {
        this.loading = true

        this.forms[this.currentTab].validateFields((err, values) => {
          if (err) {
            this.loading = false
            return;
          }
          this.formValues[this.currentTab] = values;
          let data = {}
          for (let i = 0; i < this.formValues.length; i++) {
            Object.assign(data,this.formValues[i])
          }
          request({
            url: 'addAdmin',
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          }).then(res => {
            this.loading = false
            if (res.code === 0) {
              if (this.currentTab < 2) {
                this.currentTab += 1
              }
            } else {
              this.$message.error("保存新管理账号失败")
            }
          })

        });

      },
      finish () {
        this.formValues = {}
        this.currentTab = 0
      },
      onCopyInfo () {
        this.copyUserInfo = this.$refs.information.textContent
        let that = this;
        let clipboard = new this.clipboard(".copyUserInfo");
        clipboard.on('success', function() {
          that.tooltipVisible = true;
          that.copyMsg = "复制成功"
        });
        clipboard.on('error', function() {
          that.tooltipVisible = true;
          that.copyMsg = "复制失败，请手动复制"
        });
      },
      visibleChange (e) {
        if (!e) {
          this.tooltipVisible = false;
          setTimeout(() => {
            this.copyMsg = "一键复制用户信息"
          }, 300)
        }
      },
      handleUsername (rule, value, callback) {
        if (value==='' || value ===undefined){
          callback()
        }
        request({
          url: 'validationUserName',
          method: 'GET',
          params:{
            username:value
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }).then(res => {
          if (res.code === 0) {
            callback()
          }else {
            callback(res.msg)
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>
    .step-form-style-desc {
        padding: 0 56px;
        color: rgba(0, 0, 0, .45);

        h3 {
            margin: 0 0 12px;
            color: rgba(0, 0, 0, .45);
            font-size: 16px;
            line-height: 32px;
        }

        h4 {
            margin: 0 0 4px;
            color: rgba(0, 0, 0, .45);
            font-size: 14px;
            line-height: 22px;
        }

        p {
            margin-top: 0;
            margin-bottom: 12px;
            line-height: 22px;
        }
    }
</style>
