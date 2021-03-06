<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper">

            <a-form class="ant-advanced-search-form" layout="inline" :form="form" @submit="handleSearch">
                <a-row :gutter="24">
                    <a-col
                            v-for="(item,index) in heads"
                            :key="index"
                            v-if="item.search!==0"
                            :xs="24"
                            :sm="12"
                            :lg="8"
                            :xl="6"
                            :xxl="4"
                    >
                <a-form-item
                             :label-col="labelCol" :wrapper-col="wrapperCol" :label="item.title">
                    <remote-select v-if="item.options" :name="item.options" v-decorator="[item.name]"
                                   placeholder="请选择"/>
                    <template v-else>
                        <a-input v-if="item.search===1" v-decorator="[item.name]" placeholder=""/>
                        <a-input v-if="item.search===2" v-decorator="[item.name]" placeholder=""/>
                        <a-input v-if="item.search===3" v-decorator="[item.name]" placeholder=""/>
                        <a-input v-if="item.search===4" v-decorator="[item.name]" placeholder=""/>
                        <a-range-picker style="width: auto" v-if="item.search===5" v-decorator="[item.name]"/>
                        <a-range-picker style="width: auto" v-if="item.search===6" show-time v-decorator="[item.name]"/>
                    </template>
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
                bordered
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
                <template :name="item.name" :data="item" slot-scope="text, record,index">
                    <span v-if="$scopedSlots[item.name]">
                        <slot :name="item.name" :data="record"></slot>
                    </span>
                    <span v-else>{{Object.prototype.toString.call(record[item.name]) === '[object Object]'?record[item.name].label:record[item.name]}}</span>
                </template>
            </a-table-column>
            <a-table-column
                    :ellipsis="false"
                    key="operate"
                    title="操作"
                    align="center"
            >
                <template name="operate" :data="item" slot-scope="text, record,index">
                    <span v-if="$scopedSlots['operate']">
                        <slot name="operate" :data="record"></slot>
                    </span>
                    <span v-else></span>
                </template>
            </a-table-column>
        </s-table>
    </a-card>
</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import request from '../utils/request'
  import RemoteSelect from './modules/RemoteSelect'

  export default {
    name: "TdTable",
    props: ['url', 'operate_width'],
    components: {
      RemoteSelect,
      STable,
    },
    data () {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        expand: false,
        form: this.$form.createForm(this, { name: 'advanced_search' }),
        heads: [],
        selectedRowKeys: [],
        selectedRows: [],
        searchData: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          let params = {
            page: parameter.page,
            size: parameter.size,
            header: true,
          }
          for (let key in this.searchData) {
            if (Array.isArray(this.searchData[key])) {
              this.searchData[key] = this.searchData[key].join(",");
            }
          }
          Object.assign(params, this.searchData)
          return request({
            url: this.url,
            method: 'GET',
            params: params,
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
        return this.expand ? 50 : 8;
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
          this.searchData = values;
          this.$refs.table.refresh(true)
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

    /*.ant-input ,.ant-select{*/
    /*    min-height: 28px ;*/
    /*    padding: 0 8px;*/
    /*    line-height: 26px;*/
    /*}*/
    /*.ant-select-selection,.ant-select-selection--multiple{*/
    /*    min-height: 28px;*/
    /*}*/
    /*.ant-select-selection__placeholder {*/
    /*    margin-left: 0;*/
    /*}*/
    .ant-form-item-label {
        height: 28px;
        padding: 2px 8px;
        line-height: 26px;
    }

</style>
