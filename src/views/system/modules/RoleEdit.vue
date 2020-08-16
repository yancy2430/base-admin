<template>
      <div>
            <a-form-item v-for="(permission, index) in data" :key="index" :label="permission.name">
              <a-row :gutter="16" v-for="(item, i) in permission.children" :key="i">
                <a-col :xl="4" :lg="24">
                  {{ item.name }}：
                </a-col>
                <a-col :xl="20" :lg="24">
                  <a-checkbox
                    :indeterminate="item.indeterminate"
                    v-model="item.checkedAll"
                    @change="onChangeCheckAll($event, item)">
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
      </div>
</template>

<script>
  import {  permissByRole} from '@/api/admin'
  export default {
    name: 'RoleEdit',
    data(){
      return {
        data:[],
      }
    },
    props:{
      roleId:Number
    },
    created () {
      permissByRole(this.roleId).then(res=>{
        if (res.code===0){
          this.data = []
          for (let i = 0; i < res.data.length; i++) {
            this.data.push(Object.assign({
              indeterminate:false,
              checkedAll:false,
              selected:[]
            },res.data[i]))
          }
          console.log(this.data)
        }
      })
    },
    methods:{
      onChange(){

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
      },
      onChangeCheckAll (e, item) {
        Object.assign(item, {
          selected: e.target.checked ? item.btns.map(obj => obj.code) : [],
          indeterminate: false,
          checkedAll: e.target.checked
        })
      },
      onCheckAllChange(index,i){
        console.log(this.data[index].children[i])
        for (let i = 0; i < this.data[index].children[i].btns.length; i++) {
          console.log(this.data[index].children[i].btns[i].checked)
          this.data[index].children[i].btns[i].checked  = true
          this.data[index].children[i].selected = this.data[index].children[i].selected || []
          this.data[index].children[i].selected.push(this.data[index].children[i].btns[i].code)
        }
        console.log(this.data)
      }
    }
  }
</script>

<style scoped>

</style>