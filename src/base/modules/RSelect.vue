<template>
  <div>
    <!--级联选择-->
    <a-cascader
      v-if="this.inputType == 10"
      change-on-select
      style=" width: 100%;"
      :options="selectData"
      :field-names="{ label: 'name', value: 'id', children: 'children' }"
    />
    <a-select
      v-else
      :mode="mode"
      :showSearch="showSearch"
      style="width: 100%"
      option-label-prop="title"
      :filter-option="false"
      v-model="mValue"
      @search="search"
      @change="handleChange"
    >
      <a-select-option v-for="d in selectData" :key="d.id" :title="d.name" :value="d.id">
        {{ d.name }}
      </a-select-option>
    </a-select>

  </div>
</template>

<script>
  import { getEnums, getOptions, trees } from '@/api/baseData'
  import debounce from 'lodash/debounce'
  export default {
    name: 'RSelect',
    props: ["value","inputType","hash"],
    data () {
      this.search = debounce(this.search, 100)
      this.mValue = [...this.value]
      return {
        mValue:[],
        searchValue:"",
        selectData:[],
        showSearch:true,
        mode:"default"
      }
    },
    created(){
      if (this.inputType == 9){//单选单级外键
        this.mode = "default"
        getOptions(this.hash, this.searchValue).then((res) => {
          console.log(res.data)
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }
      else if (this.inputType == 15){//多选单级外键
        this.mode = "multiple"
        getOptions(this.hash, this.searchValue).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }else if (this.inputType == 11){
        this.mode = "default"
        this.showSearch = false
        getEnums(this.hash).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }else if (this.inputType == 14){
        this.mode = "multiple"
        this.showSearch = false
        getEnums(this.hash).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }else if (this.inputType == 10){
        trees(this.hash).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }
    },
    methods: {
      search(value){
        getOptions(this.hash, value).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      },
      handleChange(value){
        console.log(value)
        this.$emit('change', value)
      }

    }
  }
</script>

<style scoped>

</style>