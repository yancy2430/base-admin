<template>
  <page-header-wrapper>
    <!--<base-table url="admin/adminUser" @newClick="newAdmin" />-->
    <td-table url="admin/adminUser">

    </td-table>
    <a-drawer
      title="添加管理员"
      :width="820"
      :visible="isNewAdmin"
      :body-style="{ paddingBottom: '80px' }"
      @close="isNewAdmin=false">
      <new-admin @submit="onAddAdmin"></new-admin>
    </a-drawer>
  </page-header-wrapper>
</template>

<script>
  import BaseTable from '../../base/BaseTable'
  import NewAdmin from './modules/NewAdmin'
  import TdTable from '../../base/TdTable'

  export default {
    name: 'Admin',
    components: { TdTable, NewAdmin, BaseTable },
    data(){
      return {
        isNewAdmin:false
      }
    },
    methods:{
      newAdmin(){
        this.isNewAdmin = true
      },
      onAddAdmin(data){

      }
    }

  }
</script>

<style scoped>

</style>
