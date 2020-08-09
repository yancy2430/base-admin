<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main" :class="{ 'mobile': isMobile }">
        <div class="account-settings-info-left" style="height: 450px;overflow-x: hidden;">
          <a-menu
            :mode="isMobile ? 'horizontal' : 'inline'"
            :style="{ border: '0', width: isMobile ? '560px' : 'auto'}"
            :selectedKeys="selectedKeys"
            type="inner"
            @openChange="onOpenChange"
            @click="onClick"
          >
            <a-menu-item v-for="item in tables" :key="item">
              {{ item }}
            </a-menu-item>

          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>编辑展示</span>
            <a-button :loading="saveLoading" type="primary" style="float: right;" @click="onSave">
              {{ saveLoadingText }}
            </a-button>
          </div>
          <a-row :gutter="gutter" style="font-weight: bold;font-size: 16px;padding-bottom: 10px;border-bottom: 1px solid #ddd">
            <a-col :span="4">
              字段名
            </a-col>
            <a-col :span="4">
              字段中文名
            </a-col>
            <a-col :span="2">
              显示
            </a-col>
            <a-col :span="2">
              查找
            </a-col>
            <a-col :span="4">
              数据类型
            </a-col>
            <a-col :span="6">
              备注
            </a-col>
          </a-row>
          <a-spin :spinning="spinning">
            <a-list item-layout="horizontal" :data-source="fields" style="height: 450px;overflow-x: hidden;">
              <a-list-item slot="renderItem" slot-scope="item,index">
                <a-list-item-meta>
                  <div slot="title">
                    <a-row :gutter="gutter">
                      <a-col :span="4">
                        <a-input :value="fields[index].fieldName" placeholder="字段名"/>
                      </a-col>
                      <a-col :span="4">
                        <a-input  placeholder="字段中文名" v-model="fields[index].name"/>
                      </a-col>
                      <a-col :span="2">
                        <a-switch style="margin: 5px 20px 5px 0;" v-model="fields[index].showType"/>
                      </a-col>
                      <a-col :span="2">
                        <a-switch style="margin: 5px 20px 5px 0;" v-model="fields[index].findType"/>
                      </a-col>
                      <a-col :span="4">
                        <a-cascader
                          style="width: 200px;margin: 5px 20px 5px 0;"
                          :field-names="{ label: 'label', value: 'value', children: 'children' }"
                          :options="enums.input"
                          placeholder="编辑类型"
                          @change="onChange"
                          v-model="fields[index].foreign"
                          :allowClear="false"
                        />
                      </a-col>
                      <a-col :span="6">
                        <a-input  placeholder="字段中文名" v-model="fields[index].remark"/>
                      </a-col>
                    </a-row>
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-spin>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  import { RouteView } from '@/layouts'
  import { baseMixin } from '@/store/app-mixin'
  import { tables, allEnums, fields, saveFields } from '@/api/baseData'

  const plainOptions = ['搜索', '显示列', '编辑']
  const defaultCheckedList = ['Apple', 'Orange']
  export default {
    name: 'Tables',
    components: {
      RouteView
    },
    mixins: [baseMixin],
    data () {
      return {
        gutter:48,
        list: [
          { name: 'John', text: '', id: 0 },
          { name: 'Joao', text: '', id: 1 },
          { name: 'Jean', text: '', id: 2 }
        ],
        checkedList: defaultCheckedList,
        plainOptions,
        // horizontal  inline
        mode: 'inline',
        spinning: false,
        saveLoading: false,
        saveLoadingText: '保存设置',
        openKeys: [],
        selectedKeys: [],
        // cropper
        preview: {},
        option: {
          img: '/avatar2.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 180,
          autoCropHeight: 180,
          fixedBox: true,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1]
        },
        pageTitle: '',
        tables: [],
        enums: {},
        fields: [],
        test: '1',
        showType: []
      }
    },
    created () {
      tables()
        .then(res => {
          this.tables = res.data
          this.onClick({
            key: this.tables[0]
          })
        })
      allEnums()
        .then(res => {
          this.enums = res.data
        })
    },
    mounted () {

    },
    methods: {
      onChange (value, selectedOptions) {
        console.log(this.showType)
      },
      onSave () {
        this.saveLoading = true
        saveFields(this.fields)
          .then(res => {
            if (res.code===0){
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
            this.saveLoading = false
          })
      },
      onOpenChange (openKeys) {
        this.openKeys = openKeys
      },
      onClick (obj) {
        this.selectedKeys = [obj.key]
        this.spinning = true
        fields({
          table: obj.key
        })
          .then(res => {
            this.spinning = false
            this.fields = res.data
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .account-settings-info-main {
    width: 100%;
    display: flex;
    height: 100%;
    overflow: auto;

    &.mobile {
      display: block;

      .account-settings-info-left {
        border-right: unset;
        border-bottom: 1px solid #e8e8e8;
        width: 100%;
        height: 50px;
        overflow-x: auto;
        overflow-y: scroll;
      }

      .account-settings-info-right {
        padding: 20px 40px;
      }
    }

    .account-settings-info-left {
      border-right: 1px solid #e8e8e8;
      width: 224px;
    }

    .account-settings-info-right {
      flex: 1 1;
      padding: 8px 40px;

      .account-settings-info-title {
        color: rgba(0, 0, 0, .85);
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 12px;
      }

      .account-settings-info-view {
        padding-top: 12px;
      }
    }
  }

</style>
