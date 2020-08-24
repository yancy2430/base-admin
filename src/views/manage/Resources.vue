<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="addItem(0)">新建菜单</a-button>

      </div>
      <a-table :columns="columns" :data-source="data" size="middle" row-key="id">
        <span slot="action" slot-scope="record">
          <a @click="addItem(record.id)">新增</a>
          <a-divider type="vertical"/>
          <a @click="editItem($event,record)">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm
            title="是否删除这条数据?"
            ok-text="是"
            @confirm="delMenu(record.id)"
            cancel-text="否"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
      <a-drawer
        :title="'新增'"
        placement="right"
        :closable="false"
        :visible="visible"
        :width="720"
        @close="visible =false"
      >
        <menu-edit :menu-id="menuId" :menu-pid="menuPid" @close="closeEdit"></menu-edit>
      </a-drawer>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import MenuTreeBtnList from './modules/MenuTreeBtnList'

  import { resources, delMenu } from 'phanpy-api/setting'
  import MenuEdit from './modules/MenuEdit'
  const columns = [
    {
      title: '名称',
      dataIndex: 'name'
    },

    {
      title: '路径',
      dataIndex: 'path',
      width: '20%'
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: '12%'
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: '20%'
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 160,
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    name: 'Resources',
    components: { MenuEdit, MenuTreeBtnList },
    data () {
      return {
        menuPid: 0,
        visible: false,
        data: [],
        menuId: undefined,
        columns
      }
    },
    created () {
      resources().then(res => {
        this.data = res.data
      })
    },
    methods: {
      closeEdit () {
        resources().then(res => {
          this.data = res.data
        })
        setTimeout(() => {
          this.visible = false
        }, 500)
      },
      editItem (e, item) {
        this.menuPid = undefined
        this.menuId = item.id
        this.visible = true
        this.visible = true
      },
      addItem (pid) {
        this.menuPid = pid
        this.menuId = undefined
        this.visible = true
      },
      delMenu (id) {
        delMenu(id).then(res => {
          if (res.code === 0) {
            resources().then(res => {
              this.data = res.data
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .icons-list >>> .anticon {
    margin-right: 6px;
    font-size: 24px;
  }
</style>
