<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="currentTab">
      <a-step title="填写基本信息"/>
      <a-step title="设置初始密码"/>
      <a-step title="创建完成"/>
    </a-steps>
    <div class="content">
      <a-form  v-if="currentTab === 0" style="max-width: 360px; margin: 40px auto 0;">
        <a-form-item
          label="登录账号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-model="form.username"/>
        </a-form-item>
        <a-form-item
          label="真实姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item label="绑定手机"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input
            style="width: 100%"
            v-model="form.phone"
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
          <r-select hash="2025773125" input-type="9" v-model="form.roleId" />
        </a-form-item>
        <a-form-item :wrapperCol="{span: 19, offset: 5}">
          <a-button type="primary" @click="nextStep">下一步</a-button>
        </a-form-item>
      </a-form>
      <a-form  v-if="currentTab === 1" style="max-width: 360px; margin: 40px auto 0;">
        <a-form-item
          label="登录账号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          class="stepFormText"
        >
          {{form.username}}
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
            v-model="form.password" />
        </a-form-item>

        <a-form-item
          label="安全设置"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          class="stepFormText"
        >
          <a-checkbox v-model="form.modifyPass">
            用户重新登录时重设密码
          </a-checkbox>
        </a-form-item>

        <a-form-item :wrapperCol="{span: 19, offset: 5}">
          <a-button :loading="loading" type="primary" @click="onAddAdmin">提交</a-button>
          <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
        </a-form-item>
      </a-form>
      <a-form  v-if="currentTab === 2" style="max-width: 360px; margin: 40px auto 0;">
        <a-result title="用户创建成功" status="success" style="max-width: 560px; margin: 40px auto 0;">
          <div class="information" ref="information">
            <a-row>
              <a-col :sm="8" :xs="24">登录账号：</a-col>
              <a-col :sm="16" :xs="24">{{form.username}}
              </a-col>
            </a-row>
            <a-row>
              <a-col :sm="8" :xs="24">真实姓名：</a-col>
              <a-col :sm="16" :xs="24">{{form.name}}
              </a-col>
            </a-row>
            <a-row>
              <a-col :sm="8" :xs="24">绑定手机：</a-col>
              <a-col :sm="16" :xs="24">{{form.phone}}
              </a-col>
            </a-row>
            <a-row>
              <a-col :sm="8" :xs="24">登录密码：</a-col>
              <a-col :sm="16" :xs="24">{{form.password}}
              </a-col>
            </a-row>
          </div>
          <template #extra>
            <a-button @click="finish">继续创建</a-button>
            <a-tooltip placement="topLeft" v-model="tooltipVisible" @visibleChange="visibleChange">
              <template slot="title">
                <span>{{copyMsg}}</span>
              </template>
              <a-button type="primary" class="copyUserInfo" style="margin-left: 8px" data-clipboard-action="copy" :data-clipboard-text="copyUserInfo" @click="onCopyInfo">复制信息</a-button>
            </a-tooltip>
          </template>
        </a-result>
      </a-form>
      <a-divider />
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
  export default {
    name: 'NewAdmin',
    components: {RSelect},
    data(){
      return {
        copyUserInfo:"",
        tooltipVisible:false,
        loading:false,
        copyMsg:"一键复制用户信息",
        currentTab:0,
        labelCol: { lg: { span: 5 }, sm: { span: 5 } },
        wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
        form: {}
      }
    },
    methods: {
      // handler
      nextStep () {
        if (this.currentTab < 2) {
          this.currentTab += 1
        }
      },
      prevStep () {
        if (this.currentTab > 0) {
          this.currentTab -= 1
        }
      },
      onAddAdmin(){
        this.loading = true
        addAdmin(this.form).then(res=>{
          this.loading =false
          if (res.code===0){
            if (this.currentTab < 2) {
              this.currentTab += 1
            }
          } else {
            this.$message.error("保存新管理账号失败")
          }
        })
      },
      finish () {
        this.form = {}
        this.currentTab = 0
      },
      onCopyInfo(){
        this.copyUserInfo = this.$refs.information.textContent
        let that = this;
        let clipboard = new this.clipboard(".copyUserInfo");
        clipboard.on('success', function () {
          that.tooltipVisible = true;
          that.copyMsg = "复制成功"
        });
        clipboard.on('error', function () {
          that.tooltipVisible = true;
          that.copyMsg = "复制失败，请手动复制"
        });
      },
      visibleChange(e){
        if (!e){
          this.tooltipVisible = false;
          setTimeout(() => {
            this.copyMsg="一键复制用户信息"
          }, 300)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .step-form-style-desc {
    padding: 0 56px;
    color: rgba(0,0,0,.45);

    h3 {
      margin: 0 0 12px;
      color: rgba(0,0,0,.45);
      font-size: 16px;
      line-height: 32px;
    }

    h4 {
      margin: 0 0 4px;
      color: rgba(0,0,0,.45);
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
