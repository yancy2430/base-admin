<template>
    <div>
        <td-table url="mall/storeList">

            <template slot="leftHeaderBtn">
                <a-button type="primary" @click="showModal">
                    创建新店铺
                </a-button>
            </template>
            <template slot="logo" slot-scope="record">
                <img :src="record.data.logo" style="width: 50px;height: 50px;">
            </template>
        </td-table>

        <a-drawer
                title="创建新店铺"
                :width="720"
                :visible="visible"
                :body-style="{ paddingBottom: '80px' }"
                @close="visible=false">
            <create-new-store @submit="onStoreAdd"></create-new-store>
        </a-drawer>
    </div>
</template>

<script>
  import TdTable from '../../base/TdTable'
  import CreateNewStore from './module/CreateNewStore'
  import request from '../../utils/request'
  export default {
    name: "StoreList",
    components: { CreateNewStore, TdTable },
    data () {
      return {
        visible: false,
      };
    },
    methods: {
      showModal () {
        this.visible = true;
      },
      onStoreAdd (values) {
        request({
          url: 'mall/storeAdd',
          method: 'POST',
          data: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(res => {
          this.loading = false
          if (res.code === 0) {
            this.visible = false;
            this.$message.success("添加成功")
          } else {
            this.$message.error("保存新管理账号失败")
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
