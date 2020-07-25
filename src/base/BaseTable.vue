<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24" v-for="find in finds.head" :key="find.title">
            <a-form-item :label="find.title">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24" v-for="find in finds.more" :key="find.title">
              <a-form-item :label="find.title">
                <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <a-menu-item key="2"><a-icon type="lock" />导出</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
      <a-dropdown placement="bottomCenter" :trigger="['click']" v-model="opVisible" style="float: right;">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          显示<a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item,i) in columns" :key="item.id">
            <a-checkbox v-model="columns[i].hidden">
              {{item.title}}
            </a-checkbox>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="middle"
      rowKey="id"
      :components="components"
      :data="loadData"
      :alert="true"
      :rowSelection="rowSelection"
      showPagination="auto"
      :scroll="{ x: 1500}"
    >
      <a-table-column v-for="(item,index) in columns" :customRender="item.customRender" :width="item.width"
                      v-if="item.hidden" :key="item.id"
                      :title="item.title" :data-index="item.dataIndex" :align="item.align" :fixed="item.fixed"
                      :ellipsis="item.ellipsis"
      >
        <template slot-scope="text, record">
        <span>
          <a>查看</a>
          <a-divider type="vertical" />
          <a>编辑</a>
          <a-divider type="vertical" />
          <a>删除</a>
        </span>
        </template>
      </a-table-column>

    </s-table>

    <create-form
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      :inputs="inputs"
      @cancel="handleCancel"
      @ok="handleOk"
    />
    <step-by-step-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
  import moment from 'moment'
  import { STable, Ellipsis } from '@/components'
  import { fruitGoodsHeader, fruitGoodsList } from '@/api/baseData'
  import StepByStepModal from './modules/StepByStepModal'
  import CreateForm from './modules/CreateForm'

  const statusMap = {
    0: {
      status: 'default',
      text: '关闭'
    },
    1: {
      status: 'processing',
      text: '运行中'
    },
    2: {
      status: 'success',
      text: '已上线'
    },
    3: {
      status: 'error',
      text: '异常'
    }
  }

  export default {
    name: 'BaseTable',
    components: {
      STable,
      Ellipsis,
      CreateForm,
      StepByStepModal
    },
    data () {
      return {
        opVisible: false,
        components:{
          header: {
            cell: (h, props, children) => {
              const { key, ...restProps } = props

              const col = this.columns.find(col => {
                const k = col.dataIndex || col.key
                return k === key
              })

              if (!col || !col.width) {
                return h('th', { ...restProps }, [...children])
              }
              const dragProps = {
                key: col.dataIndex || col.key,
                class: 'table-draggable-handle',
                attrs: {
                  w: 10,
                  x: col.width,
                  z: 1,
                  axis: 'x',
                  draggable: true,
                  resizable: false
                },
                on: {
                  dragging: (x, y) => {
                    col.width = Math.max(x, 1)
                  },
                  dragstop:(x,y)=>{
                    console.log("拖动停止")
                  }
                }
              }
              const drag = h('vue-draggable-resizable', { ...dragProps })
              return h('th', { ...restProps, class: 'resize-table-th' }, [...children, drag])
            }
          }
        },
        columns: [],
        finds: [],
        inputs: [],
        // create model
        visible: false,
        confirmLoading: false,
        mdl: null,
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return fruitGoodsList(requestParameters)
            .then(res => {
              console.log(res.data)
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    filters: {
      statusFilter (type) {
        return statusMap[type].text
      },
      statusTypeFilter (type) {
        return statusMap[type].status
      }
    },
    created () {
      fruitGoodsHeader()
        .then(res => {
          console.log(res.data)
          const columns = []
          this.finds.head = res.data.finds.slice(0, 2)
          this.finds.more = res.data.finds.slice(2, res.data.finds.length)
          this.inputs = res.data.inputs
          for (const i in res.data.columns) {
            const item = res.data.columns[i]
            columns.push({
              title: item.title,
              align: 'center',
              width: (20 * item.width) || 'auto',
              ellipsis: true,
              hidden: true,
              dataIndex: item.fieldName,
              customRender: (text) => {
                switch (item.showType) {
                  case 1:
                    return text
                  case 2:
                    return text
                  case 3:
                    return <img style="width: 50px;height: 40px" src={text} />
                  case 4:
                    return <img style="width: 40px;height: 40px" src={text} />
                  case 5:
                    return text
                  case 6:
                    return <a href={text} style="padding: 0 5px">{text}</a>
                  case 7:
                    for (const index in item.mapping) {
                      if (text === item.mapping[index].value) {
                        return item.mapping[index].name
                      }
                    }
                }
              }
            })
          }
          columns.push({
            title: '操作',
            key: 'operation',
            align: 'center',
            fixed: 'right',
            hidden: true,
            width:300,
            scopedSlots: { customRender: 'action' }
          })
          this.columns = columns
        })
    },
    computed: {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    },
    methods: {
      renderTable(){

      },
      handleAdd () {
        this.mdl = null
        this.visible = true
      },
      handleEdit (record) {
        this.visible = true
        this.mdl = { ...record }
      },
      handleOk () {
        const form = this.$refs.createModal.form
        this.confirmLoading = true
        form.validateFields((errors, values) => {
          if (!errors) {
            console.log('values', values)
            if (values.id > 0) {
              // 修改 e.g.
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(res => {
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()

                this.$message.info('修改成功')
              })
            } else {
              // 新增
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(res => {
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()

                this.$message.info('新增成功')
              })
            }
          } else {
            this.confirmLoading = false
          }
        })
      },
      handleCancel () {
        this.visible = false

        const form = this.$refs.createModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
      handleSub (record) {
        if (record.status !== 0) {
          this.$message.info(`${record.no} 订阅成功`)
        } else {
          this.$message.error(`${record.no} 订阅失败，规则已关闭`)
        }
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      resetSearchForm () {
        this.queryParam = {
          date: moment(new Date())
        }
      }
    }
  }
</script>

<style lang="less">
  .resize-table-th {
    position: relative;
    .table-draggable-handle {
      height: 100% !important;
      bottom: 0;
      left: auto !important;
      right: -5px;
      cursor: col-resize;
      touch-action: none;
    }
  }
</style>