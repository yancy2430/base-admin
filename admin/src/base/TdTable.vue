<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper">
            <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                <a-row :gutter="24">
                    <a-col
                            v-for="i in 11"
                            :key="i"
                            :span="6"
                            :style="{ display: i < count ? 'block' : 'none' }"
                    >
                        <a-form-item label="条件">
                            <a-input
                                    placeholder="placeholder"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :style="{ textAlign: 'left' }">
                        <slot name="leftHeaderBtn"></slot>
                    </a-col>
                    <a-col :span="12" :style="{ textAlign: 'right' }">

                        <a-button type="primary" html-type="submit">
                            搜索
                        </a-button>
                        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                            重置
                        </a-button>
                        <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
                            更多
                            <a-icon :type="expand ? 'up' : 'down'"/>
                        </a>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <s-table
                class="td-table"
                ref="table"
                size="middle"
                rowKey="id"
                :data="loadData"
                :rowSelection="rowSelection"
                :alert="false"
                :align="'center'"
                showPagination="auto"
                :scroll="{ x: 1500}"
                :pageSize="20"
        >
            <a-table-column
                    :ellipsis="false"
                    v-for="(item,index) in heads"
                    :key="index"
                    :title="item.title"
                    :data-index="item.name"
                    :align="item.align"
                    :width="item.width===0?'':item.width"
            >
            </a-table-column>
        </s-table>
    </a-card>
</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import request from '../utils/request'

  export default {
    name: "TdTable",
    props: ['url'],
    components: {
      STable,
    },
    data () {
      return {
        expand: false,
        form: this.$form.createForm(this, { name: 'advanced_search' }),
        heads: [],
        selectedRowKeys: [],
        selectedRows: [],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return request({
            url: '/adminList',
            method: 'GET',
            params: {
              page: parameter.page,
              size: parameter.size,
              header: true,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          })
            .then(res => {
              if (res.code == 0) {

                this.heads = res.data.heads
                return res.data
              }
            })
        },
      }
    },
    computed: {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          columnWidth: 50,
          onChange: this.onSelectChange
        }
      },
      count () {
        return this.expand ? 11 : 9;
      },
    },
    methods: {
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      handleSearch (e) {
        e.preventDefault();
        this.form.validateFields((error, values) => {
          console.log('error', error);
          console.log('Received values of form: ', values);
        });
      },
      handleReset () {
        this.form.resetFields();
      },

      toggle () {
        this.expand = !this.expand;
      },
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

    //搜索样式
    .searchText {
        display: flex;
        justify-content: space-between;
    }

    .searchSpan {
        cursor: pointer;
        display: inline-block;
        padding: 3px 6px;
        text-align: right;
        width: 110px;
        vertical-align: top;
    }

    //表头排序样式
    .tabHand {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .td-table .ant-table-row {
        color: black;
    }

    .ant-advanced-search-form {
        border-radius: 6px;
        margin-bottom: 16px;
    }

    .ant-advanced-search-form .ant-form-item {
        display: flex;
        margin-bottom: 10px;
    }

    .ant-advanced-search-form .ant-form-item-control-wrapper {
        flex: 1;
    }

    #components-form-demo-advanced-search .ant-form {
        max-width: none;
    }

    #components-form-demo-advanced-search .search-result-list {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
    }
</style>
