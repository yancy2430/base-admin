<template>
  <a-input-group compact>
    <a-input-number v-model="mValue[0]" style=" width: 44%; text-align: center" placeholder=""/>
    <a-input style=" width: 12%; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled/>
    <a-input-number v-model="mValue[1]" style="width: 44%;text-align: center; border-left: 0" placeholder=""/>
  </a-input-group>
</template>

<script>
  export default {
    name: 'BetweenInput',
    props: {
      value: {
        type: Array,
        default: function () {
          return ['', '']
        }
      }
    },
    data () {
      return {
        mValue: this.value
      }
    },
watch: {
      value (val) {
        this.mValue = val// 新增result的watch，监听变更并同步到myResult上
      },
      mValue (val) {
        console.log(val)
        if (val[0] == null) {
          val[0] = ''
        }
        if (val[1] == null) {
          val[1] = ''
        }
        this.$emit('input', val)
      }
    }
  }
</script>

<style scoped>

</style>
