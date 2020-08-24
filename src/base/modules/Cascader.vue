<template>
  <!--级联选择-->
  <a-cascader
    placeholder=""
    change-on-select
    style=" width: 76%;margin-left: -3px;"
    :options="options"
    v-model="mValue"
    :field-names="{ label: 'name', value: 'id', children: 'children' }"
  />
</template>

<script>
  import { tree } from 'phanpy-api/common'

  export default {
    name: 'Cascader',
    props: {
      hash: Number,
      pid: Number,
      value: Array
    },
    data () {
      return {
        options: [],
        mValue: this.value
      }
    },
    watch: {
      value (val) {
        this.mValue = val// 新增result的watch，监听变更并同步到myResult上
      },
      mValue (val) {
        this.$emit('input', val[val.length - 1])
      }
    },
    created () {
      tree(this.hash)
        .then(res => {
          this.options = res.data
        })
    },
    methods: {
      onChange (value) {
        console.log(value)
      }
    }
  }
</script>

<style scoped>

</style>
