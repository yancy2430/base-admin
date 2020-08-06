<template>
  <!--级联选择-->
  <a-cascader
    change-on-select
    style=" width: 76%;margin-left: -3px;"
    :options="options"
    :field-names="{ label: 'name', value: 'id', children: 'children' }"
  />
</template>

<script>
  import { trees, getOptions } from '@/api/baseData'

  export default {
    name: 'cascader',
    props: {
      hash: Number,
      pid: Number,
    },
    data () {
      return {
        options: []
      }
    },
    created () {
      trees(this.hash, this.pid)
        .then(res => {
          this.options = res.data
        })

    },
    methods: {
      onChange (value) {
        console.log(value)
      },
    },
  }
</script>

<style scoped>

</style>