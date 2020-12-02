<template>
  <page-header-wrapper>

    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="showAddGroup">新建权限组</a-button>
      </div>
      <a-table size="middle" :key="table" :defaultExpandAllRows="true" :columns="columns" :data-source="data" :row-key="item=>{ return (item.id+''+(item.code || '')) }">

        <span slot="action" slot-scope="record">
          <div v-if="record.children">
            <a @click="showAddRole(record.id)">新增角色</a>
            <a-divider type="vertical"/>
            <a @click="showEditGroup(record)">编辑</a>
            <a-divider type="vertical"/>
            <a-popconfirm
              title="是否删除这个权限组?"
              ok-text="是"
              @confirm="delGroup(record.id)"
              cancel-text="否"
            >
              <a style="color: #ff4d4f;">删除</a>
            </a-popconfirm>
          </div>
          <div v-else>
            <a @click="assignPermissions(record.id)">分配权限</a>
            <a-divider type="vertical"/>
            <a @click="showEditRole(record)">编辑</a>
            <a-divider type="vertical"/>
            <a-popconfirm
              title="是否删除这条数据?"
              ok-text="是"
              @confirm="delRole(record.id)"
              cancel-text="否">
              <a style="color: #ff4d4f;">删除</a>
            </a-popconfirm>
          </div>
        </span>
      </a-table>
      <a-modal
        title="新增权限组"
        :visible="showGroupVisible"
        :confirm-loading="confirmLoading"
        @ok="addGroup"
        @cancel="showGroupVisible=false"
      >
        <role-group-edit v-model="groupData"></role-group-edit>
      </a-modal>
      <a-modal
        title="新增角色"
        :visible="showAddRoleVisible"
        :confirm-loading="AddRoleConfirmLoading"
        @ok="addRole"
        @cancel="showAddRoleVisible=false"
      >
        <role-add v-model="roleData"></role-add>
      </a-modal>
      <a-drawer
        :title="'分配权限'"
        placement="right"
        :closable="false"
        :visible="allotVisible"
        :width="820"
        @close="allotVisible =false"
      >
        <role-edit :roleId="roleId"></role-edit>
      </a-drawer>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import BaseTable from '../../base/BaseTable'
  import {list, addGroup, addRole,delRole,delGroup} from 'tdeado-api/manage'
  import RoleGroupEdit from './modules/RoleGroupEdit'
  import RoleEdit from './modules/RoleEdit'
  import RoleAdd from './modules/RoleAdd'
  import request from '../../utils/request'

  export default {
    name: 'RoleList',
    components: { RoleAdd, RoleEdit, RoleGroupEdit, BaseTable },
    data () {
      return {
        roleId: 0,
        table: 0,
        groupData: {},
        roleData: {},
        AddRoleConfirmLoading: false,
        allotVisible: false,
        showAddRoleVisible: false,
        showGroupVisible: false,
        confirmLoading: false,
        data: [],
        columns: [
          {
            title: '名称',
            dataIndex: 'name',
            width: '25%',
            align:'center'
          },
          {
            title: '角色代码',
            dataIndex: 'code',
            width: '20%',
            align:'center'
          },
          {
            title: '说明',
            dataIndex: 'desc',
            width: '20%',
            align:'center'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 200,
            scopedSlots: { customRender: 'action' }
          }
        ]
      }
    },
    created () {
      request({
        url: '/roleList',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(res => {
        this.data = res.data
        this.table = new Date().getTime()
      })
    },
    methods: {
      delGroup(id){
        delGroup(id).then(res => {
          list().then(res => {
            this.data = res.data
            this.table = new Date().getTime()
          })
        })
      },
      delRole(id){
        delRole(id).then(res => {
          list().then(res => {
            this.data = res.data
            this.table = new Date().getTime()
          })
        })
      },
      assignPermissions (id) {
        this.roleId = id
        this.allotVisible = true
      },
      showAddRole (groupId) {
        this.roleData = {}
        this.showAddRoleVisible = true
        this.roleData['groupId'] = groupId
      },
      showEditRole (item) {
        this.showAddRoleVisible = true
        this.roleData = item
      },
      addRole () {
        this.AddRoleConfirmLoading = true
        request({
          url: '/addRole',
          method: 'POST',
          data: JSON.stringify(this.roleData),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            list().then(res => {
              this.data = res.data
              this.AddRoleConfirmLoading = false
              this.showAddRoleVisible = false
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      showAddGroup (item) {
        this.groupData = {}
        this.showGroupVisible = true
      },
      showEditGroup (item) {
        this.groupData = item
        this.showGroupVisible = true
      },
      addGroup () {
        this.confirmLoading = true
        request({
          url: 'addGroup',
          method: 'POST',
          data: JSON.stringify(this.groupData),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            list().then(res => {
              this.data = res.data
              this.confirmLoading = false
              this.showGroupVisible = false
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }

    }
  }
</script>

<style scoped>

</style>
