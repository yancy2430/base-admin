<template>
  <div>
    <!--级联选择-->
    <a-cascader
      v-if="this.inputType == 10"
      change-on-select
      style=" width: 100%;"
      :options="selectData"
      v-model="mValue"
      :field-names="{ label: 'name', value: 'id', children: 'children' }"
      @change="handleChange"
    />
    <a-select
      v-else
      :mode="mode"
      :showSearch="showSearch"
      style="width: 100%"
      option-label-prop="title"
      :filter-option="false"
      :value="mValue"
      @search="search"
      :defaultValue="value"
      @change="handleChange"
    >
      <a-select-option v-for="d in selectData" :key="d.id" :title="d.name" :value="d.id">
        {{ d.name }}
      </a-select-option>
    </a-select>

  </div>
</template>

<script>
  import { enums, options, tree } from 'phanpy-api/common'
  import debounce from 'lodash/debounce'
  export default {
    name: 'RSelect',
    props: ["value","inputType","hash"],
    data () {
      this.search = debounce(this.search, 100)

      return {
        mValue:this.value,
        searchValue:"",
        selectData:[],
        showSearch:true,
        mode:"default"
      }
    },
    created(){
      if (this.inputType == 9){//单选单级外键
        this.mode = "default"
        options(this.hash, this.searchValue,this.mValue).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }
      else if (this.inputType == 15){//多选单级外键
        this.mode = "multiple"
        options(this.hash, this.searchValue,this.mValue).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }else if (this.inputType == 11){
        this.mode = "default"
        this.showSearch = false
        enums(this.hash).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }else if (this.inputType == 14){
        this.mode = "multiple"
        this.showSearch = false
        enums(this.hash).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }else if (this.inputType == 10){
        tree(this.hash).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      }
    },
    methods: {
      search(value){
        options(this.hash, value).then((res) => {
          if (res.code === 0) {
            this.selectData = [...res.data]
          }
        })
      },
      handleChange(value){
        this.mValue = value
        this.$emit('input', value)
        this.$emit('change', value)
      }

    }
  }
</script>

<style scoped>

</style>