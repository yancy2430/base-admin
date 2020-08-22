<template>
  <page-header-wrapper>
    <base-table module="adminUser" @newClick="newAdmin" />
    <a-drawer
      title="添加管理员"
      :width="820"
      :visible="isNewAdmin"
      :body-style="{ paddingBottom: '80px' }"
      @close="isNewAdmin=false">
      <new-admin></new-admin>
    </a-drawer>
  </page-header-wrapper>
</template>

<script>
  import BaseTable from '../../base/BaseTable'
  import NewAdmin from './modules/NewAdmin'

  export default {
    name: 'Admin',
    components: { NewAdmin, BaseTable },
    data(){
      return {
        isNewAdmin:false
      }
    },
    methods:{
      newAdmin(){
        this.isNewAdmin = true
      }
    }

  }
</script>

<style scoped>

</style>
