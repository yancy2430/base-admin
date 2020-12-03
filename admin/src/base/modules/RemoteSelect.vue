<template>
      <a-select
        :placeholder="placeholder"
        @select="onSelect"
      >
        <a-select-option v-for="d in options" :value="d.name">
          {{ d.name }}
        </a-select-option>
      </a-select>
</template>

<script>
  import { options } from 'phanpy-api/common'

  export default {
    name: 'RemoteSelect',
    props:['type','name','placeholder'],
    data(){
      return {
        options:[]
      }
    },
    created(){
      if (this.type === 'options') {
        options (this.name).then(res => {
          this.options = res.data
        })
      }else if (this.type === 'enums') {

      }
    },
    methods:{
      onSelect(value,option){
        this.$emit('input', value)
        this.$emit('select', value,option)
      }
    }
  }
</script>

<style scoped>

</style>