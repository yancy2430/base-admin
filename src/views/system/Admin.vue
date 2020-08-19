<template>
  <page-header-wrapper>
    <base-table module="adminUser"/>
  </page-header-wrapper>
</template>

<script>
  import BaseTable from '../../base/BaseTable'
  let myNotification = new Notification('标题', {
    body: '通知正文内容'
  })

  myNotification.onclick = () => {
    console.log('通知被点击')
  }
  export default {
    name: 'Admin',
    components: { BaseTable }

  }
</script>

<style scoped>

</style>
