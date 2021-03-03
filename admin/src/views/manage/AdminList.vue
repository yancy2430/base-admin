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

      <template slot="status" slot-scope="record">
        <a-tag color="blue" v-if="record.data.status=='正常'">
          正常
        </a-tag>
        <a-tag color="red" v-if="record.data.status=='锁定'">
          锁定
        </a-tag>
      </template>
      <template slot="roles" slot-scope="record">
          <!--{{record.data.roleName.join(",")}}-->
        <a-tag color="blue" style="margin: 2px;" v-for="item in record.data.roles" :key="item.id">
          {{item.name}}
        </a-tag>
      </template>
      <template slot="operate" slot-scope="record">
        <!--{{record.data.roleName.join(",")}}-->
          <a v-if="record.data.status=='正常'" @click="lockAdmin(record.data)">锁定</a>
          <a v-if="record.data.status=='锁定'" style="color: orange;" @click="unlockAdmin(record.data)">解锁</a>
        <a-divider type="vertical" />
        <a>角色</a>
        <a-divider type="vertical" />
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">更多<a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">修改信息</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="resetPassVisible=true" href="javascript:;">重置密码</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" style="color: red;">删除用户</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
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
    <a-modal
            title="重置密码"
            :visible="resetPassVisible"
            :confirm-loading="confirmLoading"
            @ok="handleResetPass"
            @cancel="resetPassVisible=false"
    >
      <a-input
              v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
              type="password"
              placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
  import BaseTable from '../../base/BaseTable'
  import NewAdmin from './modules/NewAdmin'
  import TdTable from '../../base/TdTable'
  import request from '../../utils/request'

  export default {
    name: 'Admin',
    components: { TdTable, NewAdmin, BaseTable },
    data(){
      return {
        isNewAdmin:false,
        resetPassVisible:false
      }
    },
    methods:{
      handleResetPass(){

      },
      newAdmin(){
        this.isNewAdmin = true
      },
      onAddAdmin(data){

      },
      lockAdmin(data){
        let that = this;
        this.$confirm({
          title: '确认锁定',
          content: '是否确定需要锁定此账号',
          onOk() {
            request({
              url: 'lockAdmin',
              method: 'GET',
              params:{
                id: data.id
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              }
            }).then(res => {
              if (res.code === 0 && res.data === true) {
                data.status="锁定"
              }else {
                that.$message.error(res.msg);
              }
            })
          },
          onCancel() {},
        });
      },
      unlockAdmin(data){
        let that = this;
        this.$confirm({
          title: '确认解锁',
          content: '是否确定需要解锁此账号',
          onOk() {
            request({
              url: 'unlockAdmin',
              method: 'GET',
              params:{
                id: data.id
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              }
            }).then(res => {
              if (res.code === 0 && res.data === true) {
                data.status="正常"
              }else {
                that.$message.error(res.msg);
              }
            })
          },
          onCancel() {},
        });
      }
    }

  }
</script>

<style scoped>

</style>
