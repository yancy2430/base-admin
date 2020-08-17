<template>
      <div>
            <a-form-item v-for="(permission, index) in data" :key="index" :label="permission.name" v-if="permission.children">
              <a-row :gutter="16" v-for="(item, i) in permission.children" :key="i">
                <a-col :xl="4" :lg="24">
                  {{ item.name }}：
                </a-col>
                <a-col :xl="20" :lg="24">
                  <a-checkbox
                    :indeterminate="item.indeterminate"
                    v-model="item.checkedAll" @change="onChangeCheckAll($event,item)">
                    全选
                  </a-checkbox>
                  <a-checkbox-group :name="item.code" v-model="item.selected" @change="onChangeCheck(item)">
                    <a-checkbox :value="btn.code" v-model="item.checked" v-for="(btn, j) in  item.btns" :key="j">
                      {{btn.name}}
                    </a-checkbox>
                  </a-checkbox-group>
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
  import {  permissByRole,savePermissionsByRole} from '@/api/admin'
  export default {
    name: 'RoleEdit',
    data(){
      return {
        data:[],
        loginBtn:false,
      }
    },
    props:{
      roleId:Number
    },
    created () {
      permissByRole(this.roleId).then(res=>{
        if (res.code===0){
          this.data = res.data
        }
      })
    },
    methods:{
      handleSubmit(){
        this.loginBtn = true
        savePermissionsByRole(this.roleId,this.data).then(res => {
          if (res.code===0){
            this.$emit('close', true)
          }
          this.loginBtn = false
        })
      },
      onChangeCheck(item){
        if (item.selected.length===item.btns.length) {
          item.checkedAll = true
          item.indeterminate = false
        } else if (item.selected.length>0) {
          item.indeterminate = true
          item.checkedAll = false
        }else {
          item.indeterminate = false
        }
        this.$forceUpdate()
        console.log(item)
        console.log(this.data)
      },
      onChangeCheckAll (e, item) {
        Object.assign(item, {
          selected: e.target.checked ? item.btns.map(obj => obj.code) : [],
          indeterminate: false,
          checkedAll: e.target.checked
        })
      },
    }
  }
</script>

<style scoped>

</style>