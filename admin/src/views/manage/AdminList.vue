<template>
  <page-header-wrapper>
    <td-table url="adminList">
      <template slot="leftHeaderBtn">
        <a-button type="primary" @click="newAdmin()">
          添加管理员
        </a-button>
        <a-dropdown :style="{ marginLeft: '8px' }">
          <a-menu slot="overlay">
            <a-menu-item key="1">
              <a-icon type="delete"/>
              删除
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="lock"/>
              锁定
            </a-menu-item>
          </a-menu>
          <a-button>
            批量操作
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </template>
      <template slot="roles" slot-scope="record">
          <!--{{record.data.roleName.join(",")}}-->
        <a-tag color="blue" style="margin: 2px;" v-for="item in record.data.roles" :key="item.id">
          {{item.name}}
        </a-tag>
      </template>
      <template slot="operate" slot-scope="record">
        <!--{{record.data.roleName.join(",")}}-->
        <a @click="lockAdmin(record.data.id)">锁定</a>
        <a-divider type="vertical" />
        <a>修改</a>
        <a-divider type="vertical" />
        <a style="color: red;">删除</a>
      </template>
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

      },
      lockAdmin(id){
        this.$confirm({
          title: '确认锁定',
          content: '是否确定需要锁定此账号',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
      }
    }

  }
</script>

<style scoped>

</style>
