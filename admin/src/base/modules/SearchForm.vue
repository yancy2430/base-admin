<template>
  <a-form
    layout="inline"
    ref="form">
    <a-row type="flex" :gutter="48" :key="searchVersion">
      <a-col :md="8" :sm="24" v-for="(item,index) in value" :key="index" >
        <a-form-item :label="item.label">
          <a-select
            v-if="item.input!=7 && !item.enumHash"
            @change="selectChange($event,item)"
            v-model="item.select"
            style="width: 24%"
            :options="item.finds">
          </a-select>
          <!--基本输入框-->
          <a-input v-if="item.input==1" v-model="item.value" style="width: 76%;margin-left: -3px;" placeholder=""/>
          <!--数值/区间-->
          <span v-else-if="item.input==2">
            <between-input
              v-if="item.input==2 && [7,8].indexOf(item.select)!=-1"
              v-model="item.value"
              style="width: 76%;margin-left: -1px;">
            </between-input>
            <a-input-number
              v-if="item.input==2 && [7,8].indexOf(item.select)==-1"
              style="width: 76%;margin-left: -2px;"
              v-model="item.value"/>
          </span>
          <cascader v-else-if="item.input==3" v-model="item.value" :hash="item.treeHash" :pid="0"></cascader>
          <!--多选标签-->
          <m-select
            v-else-if="item.input==4 && item.optionHash"
            style="width: 76%;margin-left: -3px;"
            v-model="item.value"
            :hash="item.optionHash"
          >
          </m-select>
          <s-select
            v-else-if="item.input==4 && item.enumHash"
            style="width: 76%;margin-left: -3px;"
            v-model="item.value"
            :multiple="true"
            :hash="item.enumHash"
          >
          </s-select>
          <!--日期-->
          <a-date-picker
            valueFormat="YYYY-MM-DD"
            v-else-if="item.input==5 && [7,8].indexOf(item.select)==-1"
            v-model="item.value"
            style=" width: 76%;margin-left: -3px;"/>
          <!--日期区间-->
          <a-range-picker
            valueFormat="YYYY-MM-DD"
            v-else-if="item.input==5 && [7,8].indexOf(item.select)!=-1"
            v-model="item.value"
            style=" width: 76%;margin-left: -3px;"/>
          <!--日期时间-->
          <a-date-picker
            valueFormat="YYYY-MM-DD HH:mm:ss"
            show-time
            v-else-if="item.input==6 && [7,8].indexOf(item.select)==-1"
            v-model="item.value"
            style=" width: 76%;margin-left: -3px;"/>
          <!--日期时间区间-->
          <a-range-picker
            @change="selectChange($event,item)"
            valueFormat="YYYY-MM-DD HH:mm:ss"
            show-time
            v-else-if="item.input==6 && [7,8].indexOf(item.select)!=-1"
            v-model="item.value"
            style=" width: 76%;margin-left: -3px;"/>

          <a-switch v-else-if="item.input==7" v-model="item.value"/>
        </a-form-item>
      </a-col>
      <a-col :md="8 || 24" :sm="24">
        <span
          class="table-page-search-submitButtons"
          :style="true && { float: 'right', overflow: 'hidden' } || {} ">
          <a-button type="primary" @click="onSearch">查询</a-button>
          <a-button style="margin-left: 8px" @click="resetSearch">重置</a-button>
        </span>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
  import Cascader from './Cascader'
  import MSelect from './MSelect'
  import SSelect from './SSelect'
  import AInputGroup from 'ant-design-vue/es/input/Group'
  import BetweenInput from './BetweenInput'
  export default {
    name: 'SearchForm',
    props: ['value'],
    components: {
      BetweenInput,
      AInputGroup,
      Cascader,
      MSelect,
      SSelect
    },
    data () {
      return {
        advanced: false,
        searchVersion: new Date().getTime()
      }
    },

    methods: {
      onSearch () { // 搜索
        const fromData = []
        for (let i = 0; i < this.value.length; i++) {
          const item = this.value[i]
          fromData.push({
            name: item.name,
            findType: item.select,
            value: item.value
          })
        }
        this.$emit('input', this.value)
        this.$emit('search', fromData)
      },
      resetSearch () { // 重置搜索
        this.searchVersion = new Date().getTime()
        const cpValue = JSON.parse(JSON.stringify(this.value))
        for (let i = 0; i < cpValue.length; i++) {
            cpValue[i].value = undefined
        }
        this.$emit('input', cpValue)
      },
      selectChange (e, item) {
        if (item.select === 7 || item.select === 8) {
          Array.isArray(item.value) ? null : item.value = [item.value]
        } else {
          Array.isArray(item.value) ? item.value = item.value[0] : null
        }
        this.$refs.form.$forceUpdate()
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      }
    }

  }
</script>

<style scoped>

</style>
