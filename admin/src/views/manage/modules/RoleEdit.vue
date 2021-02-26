<template>
  <div class="role-edit">

    <a-tree
        v-model="selectedKeys"
        checkable
        :tree-data="data"
        :replaceFields="{children:'children', title:'name', key:'code' }"
    />

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
      <a-button :style="{ marginRight: '8px' }" @click="visible = false">
        取消
      </a-button>
      <a-button type="primary" :loading="loginBtn" :disabled="loginBtn" @click="handleSubmit">
        提交
      </a-button>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5'
  import RoleCheckbox from './RoleCheckbox'
  import request from '../../../utils/request'
  export default {
    name: 'RoleEdit',
    components: { RoleCheckbox },
    data () {
      return {
        data: [],
        loginBtn: false,
        selectedKeys: [],
        defaultSelectedKeys: [],
      }
    },
    props: {
      roleId: Number
    },
    created () {
      request({
        url: 'permissionsByRole',
        method: 'GET',
        params:{
          roleId: this.roleId
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(res => {
        if (res.code === 0) {
          this.data = res.data.list
          this.selectedKeys = [...res.data.selected]
          this.defaultSelectedKeys = [...res.data.selected];
        }
      })
    },
    watch: {
      roleId (v) {
        request({
          url: 'permissionsByRole',
          method: 'GET',
          params:{
            roleId: v
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }).then(res => {
          if (res.code === 0) {
            this.data = res.data.list
            this.selectedKeys = [...res.data.selected]
            this.defaultSelectedKeys = [...res.data.selected];
          }
        })
      }
    },
    methods: {
      handleSubmit () {
        this.loginBtn = true
        if (md5(this.selectedKeys)===md5(this.defaultSelectedKeys)){

          this.$emit('close', true)
          this.loginBtn = false
          return;
        }
        request({
          url: 'savePermissionsByRole',
          method: 'POST',
          params:{
            roleId:this.roleId
          },
          data: JSON.stringify(this.selectedKeys),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(res => {
          if (res.code === 0) {
            this.$emit('close', true)
          }
        }).finally(()=>{
          this.loginBtn = false
        })
      },
      onCheck (e, btn) {
        btn.checked = e.target.checked
      },
      onChangeCheck (e, btn, item) {
        btn.checked = e.target.checked
        const num = item.btns.filter(obj => {
          if (obj.checked) {
            return obj.code
          }
        }).length
        if (num === item.btns.length) {
          item.checked = true
          item.indeterminate = false
        } else if (num > 0) {
          item.indeterminate = true
          item.checked = false
        } else {
          item.indeterminate = false
        }
        this.$forceUpdate()
      },
      onChangeCheckAll (e, item) {
        Object.assign(item, {
          indeterminate: false,
          checked: e.target.checked
        })
        if (e.target.checked) {
          for (let i = 0; i < item.btns.length; i++) {
            item.btns[i].checked = true
          }
        } else {
          for (let i = 0; i < item.btns.length; i++) {
            item.btns[i].checked = false
          }
        }
        console.log(item.btns)
      }
    }
  }
</script>

<style>
  .role-edit .ant-tabs .ant-tabs-left-content{
   padding-left: 0px!important;
}
  .role-edit .ant-card-head-title {
    padding: 11px 0!important;
  }
  .role-edit .ant-card-body {
    padding: 14px 24px;
    zoom: 1;
  }
</style>
