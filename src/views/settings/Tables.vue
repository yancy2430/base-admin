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
        <div class="account-settings-info-right" >
          <div class="account-settings-info-title">
            <span>编辑展示</span>
            <a-button :loading="saveLoading" type="primary" style="float: right;" @click="onSave">
              {{ saveLoadingText }}
            </a-button>
          </div>
          <a-spin :spinning="spinning">
          <a-list item-layout="horizontal" :data-source="fields" style="height: 450px;overflow-x: hidden;">
            <a-list-item slot="renderItem" slot-scope="item,index">
              <a-list-item-meta>
                <div slot="title">
                  <a-row>
                    <a-col :span="24">
                      <a-input disabled style="width: 200px;margin: 5px 20px 5px 0;" :value="fields[index].fieldName" placeholder="字段名"/>
                      <a-input style="width: 200px;margin: 5px 20px 5px 0;" placeholder="字段中文名" v-model="fields[index].name" />
                      <a-cascader
                        style="width: 200px;margin: 5px 20px 5px 0;"
                        :field-names="{ label: 'name', value: 'value', children: 'children' }"
                        :options="enums.show"
                        placeholder="选择显示类型"
                        @change="onChange"
                        v-model="fields[index].foreigns"
                        :allowClear="false"
                      />
                      <a-select style="width: 200px;margin: 5px 20px 5px 0;" placeholder="查询类型" v-model="fields[index].findType">
                        <a-select-option v-for="item in enums.find" :key="item.value" :value="item.value">
                          {{item.name}}
                        </a-select-option>
                      </a-select>
                      <a-select style="width: 200px;margin: 5px 20px 5px 0;" placeholder="编辑类型"  v-model="fields[index].inputType">
                        <a-select-option v-for="item in enums.input" :key="item.value" :value="item.value">
                          {{item.name}}
                        </a-select-option>
                      </a-select>
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
  import { tables, enums, fields , saveFields } from '@/api/baseData'

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
        fields:[],
        test: '1',
        showType:[]
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
      enums()
        .then(res => {
          this.enums = res.data
        })
    },
    mounted () {

    },
    methods: {
      onChange(value,selectedOptions) {
        console.log(this.showType)
      },
      onSave (){
        this.saveLoading = true
        saveFields(this.fields)
          .then(res => {
            if (res.code===0){

            }else{
              this.$message.error(res.msg);
            }
            this.saveLoading = false
        })
        console.log(this.fields)
      },
      onOpenChange (openKeys) {
        this.openKeys = openKeys
      },
      onClick (obj) {
        this.selectedKeys = [obj.key]
        this.spinning = true
        fields({
          table:obj.key
        })
          .then(res => {
            this.fields = res.data
            this.spinning = false
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
