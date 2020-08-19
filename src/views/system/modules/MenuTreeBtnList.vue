<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">
      添加按钮
    </a-button>
    <a-table :data-source="dataSource" :columns="columns" :row-key="(record , index) => index" size="small">
      <template slot="name" slot-scope="text, record">
        <a-input v-model="record.name" placeholder=""/>
      </template>
      <template slot="path" slot-scope="text, record">
        <a-select show-search v-model="record.path" style="width: 100%" @change="handleChange(record)">
          <a-select-option :value="method.url" v-for="(method,index) in methods" :key="index">
            {{ method.url }}
          </a-select-option>
        </a-select>
      </template>
      <template slot="code" slot-scope="text, record">
        <a-input disabled v-model="record.code" placeholder=""/>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="value.length"
          title="是否删除按钮?"
          @confirm="() => onDelete(record.code)"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
  import EditableCell from './EditableCell'
  import { methods } from '@/api/admin'

  export default {
    name: 'MenuTreeBtnList',
    components: {
      EditableCell
    },
    props: ['value'],
    model: {
      prop: 'value',
      event: 'input'
    },
    watch: {
      value (v) {
        this.dataSource = [...v]
      }
    },
    created () {
      methods().then(res => {
        if (res.code === 0) {
          this.methods = res.data
        }
      })
    },
    data () {
      this.dataSource = [...this.value]
      return {
        methods: [],
        count: 0,
        dataSource: [],
        columns: [
          {
            title: '显示名称',
            dataIndex: 'name',
            width: '180px',
            scopedSlots: { customRender: 'name' }
          },
          {
            title: '提交路径',
            dataIndex: 'path',
            scopedSlots: { customRender: 'path' }

          },
          {
            title: '权限代码',
            dataIndex: 'code',
            scopedSlots: { customRender: 'code' },
            width: '180px'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            width: '80px',
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    },
    methods: {
      onDelete (key) {
        const dataSource = [...this.value]
        this.dataSource = dataSource.filter(item => item.code !== key)
        this.$emit('input', this.dataSource)
      },
      handleAdd () {
        const newData = {
          key: this.count,
          name: '',
          path: '',
          code: ''
        }
        this.dataSource.push(newData)
        this.$emit('input', this.dataSource)
        this.count = this.count + 1
      },
      handleChange (record) {
        console.log(record)
        record.code = this.toHump(record.path)
      },
      toHump (name) {
        return name.replace(/\/(\w)/g, function (all, letter) {
          return letter.toUpperCase()
        })
      }
    }
  }
</script>
<style>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>
