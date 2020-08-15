<template>
      <div>
        <a-tabs type="card" @change="callback">
          <a-tab-pane tab="Tab 1"  v-for="(permission, index) in data" :key="index" :tab="permission.name">
            <a-form-item label="拥有权限">
              <a-row :gutter="16" v-for="(item, i) in permission.children" :key="i">
                <a-col :xl="4" :lg="24">
                  {{ item.name }}：
                </a-col>
                <a-col :xl="20" :lg="24">
                  <a-checkbox>
                    全选
                  </a-checkbox>
                  <a-checkbox-group v-model="item.selected"  >
                    <a-checkbox :value="btn.code"  v-for="(btn, j) in  item.btns" :key="j">
                      {{btn.name}}
                    </a-checkbox>
                  </a-checkbox-group>
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
      </div>
</template>

<script>
  import {  resources} from '@/api/system'
  export default {
    name: 'RoleEdit',
    data(){
      return {
        data:[],
      }
    },
    created () {
      resources().then(res=>{
        console.log(res.data)
        if (res.code===0){
          this.data = res.data
        }
      })
    },
    methods:{
      callback(e){

      }
    }
  }
</script>

<style scoped>

</style>