<template>
  <div>
    <a-form-item v-for="(permission, index) in data" :key="index" v-if="permission.children" >
      <span slot="label" style="font-weight: bold">
        {{ permission.name }}
      </span>
      <a-row :gutter="16" v-for="(item, i) in permission.children" :key="i">
        <a-col :xl="4" :lg="24">
          {{ item.name }}：
        </a-col>
        <a-col :xl="20" :lg="24">
          <a-checkbox
            :indeterminate="item.indeterminate"
            v-model="item.checked"
            @change="onChangeCheckAll($event,item)">
            全选
          </a-checkbox>
          <a-checkbox v-for="(btn, j) in item.btns" :key="j" :value="btn.code" v-model="btn.checked" @change="onChangeCheck($event,btn,item)">
            {{ btn.name }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-form-item>
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
  import { permissionsByRole, savePermissionsByRole } from 'fruits-api/manage'
  import RoleCheckbox from './RoleCheckbox'
  export default {
    name: 'RoleEdit',
    components: { RoleCheckbox },
    data () {
      return {
        data: [],
        loginBtn: false
      }
    },
    props: {
      roleId: Number
    },
    created () {
      permissionsByRole(this.roleId).then(res => {
        if (res.code === 0) {
          this.data = res.data
        }
      })
    },
    watch: {
      roleId (v) {
        permissionsByRole(v).then(res => {
          if (res.code === 0) {
            this.data = res.data
          }
        })
      }
    },
    methods: {
      handleSubmit () {
        this.loginBtn = true
        savePermissionsByRole(this.roleId, this.data).then(res => {
          if (res.code === 0) {
            this.$emit('close', true)
          }
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

<style scoped>

</style>
