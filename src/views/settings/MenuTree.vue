<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="visible =true">新建菜单</a-button>

      </div>
      <a-table :columns="columns" :data-source="data" row-key="id">
        <span slot="action" slot-scope="text">
        <a>新增</a>
              <a-divider type="vertical"/>
        <a>编辑</a>
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
        title="新增菜单"
        placement="right"
        :closable="false"
        :visible="visible"
        :width="720"
        @close="visible = false"
      >
        <a-form layout="vertical" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="菜单名称">
                <a-input
                  v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '菜单名称不能为空' }],
                  },
                ]"
                  placeholder="请输入菜单名称"
                >
                  <div slot="prefix">
                    <a-dropdown :trigger="['click']">
                      <a-icon type="user" @click="e => e.preventDefault()" />
                      <div slot="overlay" >
                        <div class="ant-dropdown-menu" style="padding: 10px;">
                          <div class="icons-list">
                            <a-icon type="home" />
                            <a-icon type="setting" theme="filled" />
                            <a-icon type="smile" theme="outlined" />
                            <a-icon type="sync" spin />
                            <a-icon type="smile" :rotate="180" />
                            <a-icon type="loading" />
                          </div>
                        </div>
                      </div>
                    </a-dropdown>
                  </div>

                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="唯一编码">
                <a-input
                  v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '唯一编码不能为空' }],
                  },
                ]"
                  placeholder="唯一字符串编码"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="菜单路径">
                <a-input
                  v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  },
                ]"
                  placeholder="菜单全路径"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="排序">
                <a-input
                  v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  },
                ]"
                  placeholder="菜单排序"
                />
              </a-form-item>
            </a-col>

          </a-row>
        </a-form>
        <menu-tree-btn-list></menu-tree-btn-list>
        <div
          :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            取消
          </a-button>
          <a-button type="primary" @click="onClose">
            提交
          </a-button>
        </div>
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
    },{
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 160,
      scopedSlots: { customRender: 'action' },
    },
  ];


  import { resources } from '@/api/system'
  export default {
    name: 'MenuTree',
    components: { MenuTreeBtnList },
    data () {
      return {
        visible: false,
        data:[],
        columns,
      }
    },
    created () {
      resources().then(res => {
        console.log(res)
        this.data = res.data
      })
    }
  }
</script>

<style scoped>
  .icons-list >>> .anticon {
    margin-right: 6px;
    font-size: 24px;
  }
</style>