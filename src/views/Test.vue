<template>
  <div>
    <a-button type="primary" @click="onClick">
      获取宽度
    </a-button>
    <a-table bordered :columns="columns" :components="components" :data-source="data">
      <template v-slot:action>
        <a href="javascript:;">Delete</a>
      </template>
    </a-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueDraggableResizable from 'vue-draggable-resizable'

  Vue.component('vue-draggable-resizable', VueDraggableResizable)

  export default {
    name: 'App',
    data() {
      this.components = {
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
                }
              }
            }
            const drag = h('vue-draggable-resizable', { ...dragProps })
            return h('th', { ...restProps, class: 'resize-table-th' }, [...children, drag])
          }
        }
      }
      return {
        data: [
          {
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer'
          },
          {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer'
          },
          {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer'
          }
        ],
        columns: [
          {
            title: 'Date',
            dataIndex: 'date',
            width: 200
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
            width: 100
          },
          {
            title: 'Type',
            dataIndex: 'type',
            width: 100
          },
          {
            title: 'Note',
            dataIndex: 'note',
            width: 100
          },
          {
            title: 'Action',
            key: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ]
      }
    },
    methods:{
       onClick (){
        console.log(this.columns[0].width)
      }
    }
  }
</script>
<style>
  .resize-table-th {
    position: relative;
  }
  .table-draggable-handle {
    /* width: 10px !important; */
    height: 100% !important;
    left: auto !important;
    right: -5px;
    cursor: col-resize;
    touch-action: none;
    border: none;
  }
</style>