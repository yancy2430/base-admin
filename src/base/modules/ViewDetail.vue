<template>
  <div>
    <a-row>
      <a-col :span="12" v-for="(item,key) in columns" :key="key">
        <description-item :title="item.title" :content="data[item.dataIndex]" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import descriptionItem from './DescriptionItem'

  export default {
    name: 'ViewDetail',
    components: {
      descriptionItem
    },
    props: {
      columns: Array,
      data: Object
    },
    data () {
      return {
        visible: false,
        pStyle: {
          fontSize: '16px',
          color: 'rgba(0,0,0,0.85)',
          lineHeight: '24px',
          display: 'block',
          marginBottom: '16px'
        },
        pStyle2: {
          marginBottom: '24px'
        }
      }
    },
    methods: {
      showDrawer () {
        this.visible = true
      },
      onClose () {
        this.visible = false
      }
    }
  }
</script>
