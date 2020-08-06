<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">

        <a-row :gutter="48">
          <a-col :md="8" :sm="24" v-for="(item,index) in finds" :key="index" v-if="!advanced?index<2:true">
            <a-form-item :label="item.label">
              <a-select @change="findType($event,item)" v-model="item.select" style="width: 24%" :options="item.finds">
              </a-select>
              <!--基本输入框-->
              <a-input v-if="item.input==1" style=" width: 76%;margin-left: -3px;" placeholder="" />
              <!--数值/区间-->
              <span v-if="item.input==2">
                <a-input-group compact v-if="item.input==2 && [7,8].indexOf(item.select)!=-1" style="width: 76%;margin-left: -1px;">
                  <a-input-number style=" width: 44%; text-align: center" placeholder="最小值" />
                  <a-input style=" width: 12%; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
                  <a-input-number  style="width: 44%;text-align: center; border-left: 0" placeholder="最大值" />
                </a-input-group>
                <a-input-group compact v-if="item.input==2 && [7,8].indexOf(item.select)==-1"  style="width: 76%;margin-left: -1px;" >
                  <a-input-number  style=" width: 100%;margin-left: -2px;"  />
                </a-input-group>
              </span>
              <!--级联选择-->
              <a-cascader
                          @popupVisibleChange="cascader($event,item)"
                          v-if="item.input==3" change-on-select
                          style=" width: 76%;margin-left: -3px;"
                          :options="options[item.name]"
                          :field-names="{ label: 'name', value: 'id', children: 'items' }"
              />
              <!--多选标签-->
              <a-select
                v-if="item.input==4"
                style=" width: 76%;margin-left: -3px;"
                mode="multiple"
                :filter-option="false"
                :not-found-content="fetching ? undefined : null"
                @search="loadOptions($event,item)"
              >
                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                <a-select-option v-for="d in options" :key="d.id">
                  {{ d.name }}
                </a-select-option>
              </a-select>

              <!--日期-->
              <a-date-picker v-if="item.input==5" style=" width: 76%;margin-left: -3px;" />
              <!--日期区间-->
              <a-range-picker v-if="item.input==5" style=" width: 76%;margin-left: -3px;" />

            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons"
                  :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
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
          <a-menu-item key="1">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="lock"/>
            导出
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>

      <a-dropdown placement="bottomCenter" :trigger="['click']" v-model="opVisible" style="float: right;">
        <a class="ant-dropdown-link">
          配置
          <a-icon type="down"/>
        </a>
        <a-menu slot="overlay">
          <draggable
            v-model="columns"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <a-menu-item class="ant-dropdown-menu-item" v-for="(element,i) in columns" :key="element.sort">
              <a-checkbox v-model="columns[i].show" @change="updateHeader">
                {{element.title}}
              </a-checkbox>
            </a-menu-item>
          </draggable>

        </a-menu>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="middle"
      rowKey="id"
      :components="components"
      :data="loadData"
      :alert="false"
      :rowSelection="rowSelection"
      showPagination="auto"
      :scroll="{ x: 1500}"
    >
      <a-table-column v-for="(item,index) in columns" :customRender="item.customRender" :width="item.width"
                      v-if="item.show" :key="item.id"
                      :title="item.title" :data-index="item.dataIndex" :align="item.align" :fixed="item.fixed"
                      :ellipsis="item.ellipsis"
      >
        <template slot-scope="text, record">
        <span>
          <a>查看</a>
          <a-divider type="vertical"/>
          <a>编辑</a>
          <a-divider type="vertical"/>
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
  import { fruitGoodsHeader, fruitGoodsList, saveOrUpdateHeader, trees,getOptions} from '@/api/baseData'
  import StepByStepModal from './modules/StepByStepModal'
  import CreateForm from './modules/CreateForm'
  import AInputGroup from 'ant-design-vue/es/input/Group'

  export default {
    name: 'BaseTable',
    components: {
      AInputGroup,
      STable,
      Ellipsis,
      CreateForm,
      StepByStepModal
    },
    data () {
      return {
        fetching: false,
        drag: false,
        opVisible: false,
        options: [
        ],
        components: {
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
                  dragstop: (x, y) => {
                    this.updateHeader()
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
          return fruitGoodsList(requestParameters)
            .then(res => {
              this.mapping = res.data.mapping
              return res.data
            })
        },
        loadCascader: parameter => {
          console.log(parameter)
          return trees("")
            .then(res => {
              this.mapping = res.data.mapping
              return res.data
            })
        },
        mapping:{},
        selectedRowKeys: [],
        selectedRows: [],
        test:0,
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
          const columns = []
          for (let i = 0; i < res.data.finds.length; i++) {
            this.finds.push(res.data.finds[i])
          }

          this.inputs = res.data.inputs
          for (const i in res.data.columns) {
            const item = res.data.columns[i]
            columns.push({
              tableName: item.tableName,
              sort: i,
              title: item.title,
              align: 'center',
              width: i > res.data.columns.length - 2 ? '' : item.width,
              show: item.show,
              dataIndex: item.fieldName,
              customRender: (text, record, index) => {
                switch (item.showType) {
                  case 1:
                    return text
                  case 2:
                    return text
                  case 3:
                    return <img style = 'width: 50px;height: 40px' src = { text } />
                  case 4:
                    return <img style = 'width: 40px;height: 40px' src = { text } />
                  case 5:
                    return text
                  case 6:
                    return <a href = { text } style = 'padding: 0 5px' > { text } < /a>
                  case 7:
                    for (const index in item.mapping) {
                      if (text == item.mapping[index].value) {
                        return item.mapping[index].name
                      }
                    }
                    return ""
                  case 8:
                    return this.mapping[item.fieldName][text]
                }
              }
            })
          }
          columns.push({
            sort: columns.length,
            title: '操作',
            key: 'operation',
            align: 'center',
            fixed: 'right',
            show: true,
            width: 160,
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
      },
      dragOptions () {
        return {
          animation: 200,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost'
        }
      }
    },

    methods: {
      cascader(show,item,pid) {

        if (this.options.length ===0){
          return trees(item.treeHash,pid)
            .then(res => {
              this.options[item.name] = res.data
              console.log(this.options)
            })
        }
      },
      loadOptions(e,item){
        console.log(e,item)

        return getOptions(item.optionHash,e)
          .then(res => {
            this.options = res.data;
          })


      },
      findType(e,item){
        console.log(e)
        console.log(item)
      },
      filter(inputValue, path) {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
      },
      updateHeader () {
        console.log(this.columns)
        const headers = []
        for (let index in this.columns) {
          if (this.columns[index].dataIndex) {
            headers.push({
              'id': this.columns[index].tableName + '-' + this.columns[index].dataIndex,
              'tableName': this.columns[index].tableName,
              'show': this.columns[index].show,
              'width': this.columns[index].width
            })
          }
        }
        saveOrUpdateHeader(headers)
          .then(res => {
            console.log(res)
          })
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
  .table-page-search-wrapper .ant-form-inline .ant-form-item > .ant-form-item-label {
    width: 90px;
  }
</style>