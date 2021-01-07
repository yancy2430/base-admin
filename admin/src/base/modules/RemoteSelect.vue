<template>
    <a-select
              :mode="mode"
              placeholder="请选择"
              @change="onSelect"
              :filter-option="false"
              @blur="fetchUser"
              @search="fetchUser"
              show-search
              allowClear
              showArrow
    >
        <a-select-option v-for="d in data" :key="d.value" :value="d.value">
            {{ d.label }}
        </a-select-option>
    </a-select>

</template>

<script>

  import request from '../../utils/request'
  export default {
    name: 'RemoteSelect',
    props:['value','type','name','placeholder','multiple'],
    data(){
      return {
        data: [],
        mode:this.multiple || "",
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
            this.data = body.data;
            this.fetching = false;
          });
      },
    }
  }
</script>

<style scoped>

</style>
