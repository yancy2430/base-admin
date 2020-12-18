<template>
  <page-header-wrapper>
    <td-table url="member/list">
      <template></template>
      <template slot="avatar" slot-scope="record">
        <img :src="record.data.avatar" style="width: 40px;height: 40px" />
      </template>
      <template slot="operate" slot-scope="record">
        <a>角色</a>
        <a-divider type="vertical" />
        <a>编辑</a>
        <a-divider type="vertical" />
        <a>锁定</a>
      </template>

    </td-table>
  </page-header-wrapper>
</template>

<script>
    import BaseTable from '../../base/BaseTable'
    import TdTable from '../../base/TdTable'
    export default {
        name: 'UserList',
      components: { TdTable, BaseTable }
    }
</script>

<style scoped>

</style>
