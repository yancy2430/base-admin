<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="addItem()">新建菜单</a-button>

      </div>
      <a-table :columns="columns" :data-source="data" row-key="id">
        <span slot="action" slot-scope="record">
        <a @click="addItem($event,record)">新增</a>
              <a-divider type="vertical"/>
        <a @click="editItem($event,record)">编辑</a>
              <a-divider type="vertical"/>
             <a-popconfirm
               title="是否删除这条数据?"
               ok-text="是"
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
        <menu-edit :menu-id="menuId" @close="closeEdit"></menu-edit>
      </a-drawer>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import MenuTreeBtnList from './modules/MenuTreeBtnList'

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '唯一码',
      dataIndex: 'code',
      width: '12%',
    },
    {
      title: '路径',
      dataIndex: 'path',
      width: '20%',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: '12%',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: '20%',
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 160,
      scopedSlots: { customRender: 'action' },
    },
  ]

  import { resources, saveMenu } from '@/api/system'
  import MenuEdit from './modules/MenuEdit'

  export default {
    name: 'MenuTree',
    components: { MenuEdit, MenuTreeBtnList },
    data () {
      return {
        visible: false,
        data: [],
        menuId:undefined,
        columns,
      }
    },
    created () {
      resources().then(res => {
        this.data = res.data
      })
    },
    methods: {
      closeEdit(){
        resources().then(res => {
          this.data = res.data
        })
        setTimeout(() => {
          this.visible = false
        }, 500)
      },
      editItem(e,item){
        this.menuId = item.id
        this.visible = true
      },
      addItem (e, item) {
        if (!item) {
          this.menuId = undefined
        }else {
        }
        this.visible = true
      },
      delMenu(id){

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