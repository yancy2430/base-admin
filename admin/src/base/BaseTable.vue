<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper">
            <search-form v-model="finds" v-if="searchShow" @search="onSearch">
            </search-form>
        </div>
        <div class="table-operator">
            <slot name="leftHeaderBtn"></slot>
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
                <a-button>
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
                                {{ element.title }}
                            </a-checkbox>
                        </a-menu-item>
                    </draggable>

                </a-menu>
            </a-dropdown>
            <a style="margin-right: 18px;margin-bottom: 24px;float: right;" @click="searchShow = !searchShow">
                搜索
                <a-icon style="font-size: 10px;" :type="searchShow ? 'up' : 'down'"/>
            </a>
        </div>
        <s-table
                ref="table"
                size="middle"
                rowKey="id"
                :components="components"
                :data="loadData"
                :alert="false"
                :align="'center'"
                :rowSelection="rowSelection"
                showPagination="auto"
                :scroll="{ x: 1500}"
                :pageSize="20"
        >
            <a-table-column
                    v-for="(item,index) in columns"
                    :customRender="item.customRender"
                    :width="item.width<50?50:item.width"
                    v-if="item.show"
                    :key="index"
                    :title="item.title"
                    :data-index="item.dataIndex"
                    :align="item.align"
                    :fixed="item.fixed"
                    :ellipsis="true"
            >
                <template slot-scope="text, record,index">
<!--                    {{$slots[]}}-->
                    {{columns[index]}}
                    <slot name="tableOperationBtn" :data="record"></slot>
<!--                    <slot name="tableOperationBtn" :data="record"></slot>-->
                </template>
            </a-table-column>
        </s-table>
        <a-drawer
                title="新增"
                :width="720"
                :visible="visible"
                :body-style="{ paddingBottom: '80px' }"
                @close="visible=false"
        >
            <create-form :inputs="inputs">
            </create-form>
        </a-drawer>
        <a-drawer
                title="详情"
                :width="720"
                :visible="check"
                :body-style="{ paddingBottom: '80px' }"
                @close="check=false"
        >
            <view-detail :columns="columns" :data="item"></view-detail>
        </a-drawer>
    </a-card>
</template>

<script>
    import {STable, Ellipsis} from '@/components'
    import {header, page, saveOrUpdateHeader} from 'tdeado-api/common'
    import CreateForm from './modules/CreateForm'
    import ViewDetail from './modules/ViewDetail'
    import SearchForm from './modules/SearchForm'

    export default {
        name: 'BaseTable',
        components: {
            SearchForm,
            ViewDetail,
            STable,
            Ellipsis,
            CreateForm
        },
        props: {
            module: String,
        },
        data() {
            return {
                searchShow: false,
                item: {},
                check: false,
                visible: false,
                searchVersion: new Date().getTime(),
                fetching: false,
                drag: false,
                opVisible: false,
                options: [],
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
                cpFinds: [],
                inputs: [],
                searchData: [],
                // 高级搜索 展开/关闭
                advanced: false,
                // 加载数据方法 必须为 Promise 对象
                loadData: parameter => {
                    return page(this.module, parameter.page, parameter.size, encodeURIComponent(JSON.stringify(this.searchData)))
                        .then(res => {
                            if (res.code == 0) {
                                this.mapping = res.data.mapping
                                return res.data
                            } else {
                                return null
                            }
                        })
                },
                mapping: {},
                selectedRowKeys: [],
                selectedRows: []
            }
        },
        created() {
            header(this.module)
                .then(res => {
                    const columns = []
                    for (let i = 0; i < res.data.finds.length; i++) {
                        this.finds.push(res.data.finds[i])
                    }
                    this.cpFinds = JSON.parse(JSON.stringify(this.finds))
                    this.inputs = res.data.inputs
                    for (const i in res.data.columns) {
                        const item = res.data.columns[i]

                        columns.push({
                            id: item.id,
                            tableName: item.tableName,
                            sort: i,
                            title: item.title,
                            align: 'center',
                            width: i == res.data.columns.length - 1 ? '' : item.width,
                            show: item.show,
                            dataIndex: item.fieldName,
                            customRender: (text, record, index) => {

                              if (this.$slots[item.fieldName]){
                                console.log(this.$slots[item.fieldName])
                                return  this.$slots[item.fieldName]
                              }

                                switch (item.inputType) {
                                    case 7:
                                        return
                                    <
                                        img
                                        style = 'width: 50px;height: 40px'
                                        src = {text}
                                        />
                                    case 11:
                                        if (this.mapping) {
                                            for (const index in item.mapping) {
                                                if (text == item.mapping[index].value) {
                                                    return item.mapping[index].name
                                                }
                                            }
                                        }
                                        return ''
                                    case 9:
                                        if (this.mapping[item.fieldName]) {
                                            return this.mapping[item.fieldName][text]
                                        }
                                    case 10:
                                        if (this.mapping[item.fieldName]) {
                                            return this.mapping[item.fieldName][text]
                                        }
                                    default:
                                        return text
                                }
                            }
                        })
                    }
                    console.log(this.$slots)
                  // if (this.$slots.tableOperationBtn){
                    columns.push({
                        sort: columns.length,
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        fixed: 'right',
                        show: true,
                        width: 160,
                        scopedSlots: {customRender: 'action'}
                    })
                  // }
                  this.columns = columns
                })
        },
        computed: {
            rowSelection() {
                return {
                    selectedRowKeys: this.selectedRowKeys,
                    onChange: this.onSelectChange
                }
            },
            dragOptions() {
                return {
                    animation: 200,
                    group: 'description',
                    disabled: false,
                    ghostClass: 'ghost'
                }
            }
        },

        methods: {
            onSearch(val) { // 搜索
                this.searchData = val
                this.$refs.table.refresh(true)
            },
            refresh(){
                this.$refs.table.refresh(true)
            },
            updateHeader() {
                const headers = []
                for (const index in this.columns) {
                    if (this.columns[index].dataIndex) {
                      console.log(this.columns[index])
                        headers.push({
                            'id': this.columns[index].id,
                            'strId': this.columns[index].tableName + '-' + this.columns[index].dataIndex,
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
            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys
                this.selectedRows = selectedRows
            },
            onShowDetail(e, item) {
                console.log(this.columns)
                this.item = item
                this.check = true
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
