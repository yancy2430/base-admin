<template>
    <a-cascader
            :field-names="{ label: 'name', value: 'id', children: 'children' }"
            :options="options"
            :show-search="{ filter }"
            placeholder="请选择城市"
            @change="onChange"
    />
</template>

<script>
  import request from '../utils/request'
  export default {
    name: "TdCitySelect",
    props:['value'],
    data(){
      return{
        options: [
        ],
      }
    },
    created(){
      request({
        url: "cityTree",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(res => {
        this.options=res.data
      })
    },
    methods: {
      onChange(value, selectedOptions) {
        this.$emit("input",value)
        this.$emit("change",value, selectedOptions)
      },
      filter(inputValue, path) {
        return path.some(option => option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
      },
    },

  }
</script>

<style scoped>

</style>
