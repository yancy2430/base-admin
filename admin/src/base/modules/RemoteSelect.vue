<template>
    <a-select mode="multiple"
              placeholder="请选择"
              @change="onSelect"
              :filter-option="false"
              @blur="fetchUser"
              @search="fetchUser"
    >
        <a-select-option v-for="d in data" :key="d.value" :title="d.label" :value="d.value">
            {{ d.label }}
        </a-select-option>
    </a-select>

</template>

<script>

  import request from '../../utils/request'
  export default {
    name: 'RemoteSelect',
    props:['value','type','name','placeholder'],
    data(){
      return {
        data: [],
        value: [],
        fetching: false,
      }
    },
    created(){
      this.fetchUser("");
    },
    methods:{
      onSelect(value,option){
        this.$emit('input', value)
        this.$emit('select', value,option)
        this.$emit('change', value);
      },
      fetchUser(value) {
        console.log(value)
        this.data = [];
        this.fetching = true;
        request({
          url: 'options',
          method: 'GET',
          params:{
            name: this.name,
            key: Array.isArray(value)?"":value,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
          .then(body => {
            console.log(body)
            this.data = body.data;
            this.fetching = false;
          });
      },
    }
  }
</script>

<style scoped>

</style>
