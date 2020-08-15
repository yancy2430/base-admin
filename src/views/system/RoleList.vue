<template>
  <page-header-wrapper>

    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="showAddGroup">新建权限组</a-button>
      </div>
      <a-table :defaultExpandAllRows="true" :columns="columns" :data-source="data" :row-key="item=>{ return (item.id+''+(item.code || '')) }">

        <span slot="action" slot-scope="record">
          <div v-if="record.children">
            <a @click="showAddRole(record.id)">新增角色</a>
              <a-divider type="vertical"/>
              <a @click="showEditGroup(record)">编辑</a>
                  <a-divider type="vertical"/>
                 <a-popconfirm
                   title="是否删除这条数据?"
                   ok-text="是"
                   @confirm="delMenu(record.id)"
                   cancel-text="否"
                 >
                <a  style="color: #ff4d4f;">删除</a>
                </a-popconfirm>
          </div>
          <div v-else>
                <a @click="assignPermissions()">分配权限</a>
                <a-divider type="vertical"/>
                <a @click="showEditRole(record)">编辑</a>
                <a-divider type="vertical"/>
                 <a-popconfirm
                   title="是否删除这条数据?"
                   ok-text="是"
                   @confirm="delMenu(record.id)"
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
        :width="720"
        @close="allotVisible =false"
      >
        <role-edit></role-edit>
      </a-drawer>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import BaseTable from '../../base/BaseTable'
  import { roleList, addGroup ,addRole} from '@/api/system'
  import RoleGroupEdit from './modules/RoleGroupEdit'
  import RoleEdit from './modules/RoleEdit'
  import RoleAdd from './modules/RoleAdd'

  export default {
    name: 'RoleList',
    components: { RoleAdd, RoleEdit, RoleGroupEdit, BaseTable }
    ,
    data () {
      return {
        groupData: {},
        roleData: {},
        AddRoleConfirmLoading:false,
        allotVisible:false,
        showAddRoleVisible: false,
        showGroupVisible: false,
        confirmLoading: false,
        data: [],
        columns: [
          {
            title: '名称',
            dataIndex: 'name',
            width: '25%',
          },
          {
            title: '角色代码',
            dataIndex: 'code',
            width: '20%',
          },
          {
            title: '说明',
            dataIndex: 'desc',
            width: '20%',
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 200,
            scopedSlots: { customRender: 'action' },
          },
        ]
      }
    },
    created () {
      roleList().then(res => {
        this.data = res.data
      })
    },
    methods: {
      assignPermissions(){
        this.allotVisible = true
      },
      showAddRole(groupId){
        this.roleData={}
        this.showAddRoleVisible = true
        this.roleData["groupId"] = groupId
      },
      showEditRole(item){
        this.showAddRoleVisible = true
        this.roleData = item
      },
      addRole () {
        this.AddRoleConfirmLoading = true
        addRole(this.roleData).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            roleList().then(res => {
              this.data = res.data
              this.AddRoleConfirmLoading = false
              this.showAddRoleVisible = false
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      showAddGroup(item){
        this.groupData={}
        this.showGroupVisible = true
      },
      showEditGroup(item){
        this.groupData=item
        this.showGroupVisible = true
      },
      addGroup () {
        this.confirmLoading = true
        addGroup(this.groupData).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            roleList().then(res => {
              this.data = res.data
              this.confirmLoading = false
              this.showGroupVisible = false
            })
          } else {
            this.$message.error(res.msg)
          }
        })

      },

    }
  }
</script>

<style scoped>

</style>