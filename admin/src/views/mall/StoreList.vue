<template>
    <div>
        <td-table url="mall/storeList">

            <template slot="leftHeaderBtn">
                <a-button type="primary" @click="showModal">
                    创建新店铺
                </a-button>
            </template>
            <template slot="logo" slot-scope="record">
                <img :src="record.data.logo" style="width: 40px;height: 40px" />
            </template>
        </td-table>
        <a-drawer
                title="创建新店铺"
                :width="720"
                :visible="visible"
                :body-style="{ paddingBottom: '80px' }"
                @close="visible=false">
            <create-new-store></create-new-store>
        </a-drawer>
    </div>
</template>

<script>
  import TdTable from '../../base/TdTable'
  import CreateNewStore from './module/CreateNewStore'
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
      handleCancel () {
        this.visible = false;
      },
      handleCreate () {
        this.visible = false;
      },
    }
  }
</script>

<style scoped>

</style>
