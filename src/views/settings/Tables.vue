<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main" :class="{ 'mobile': isMobile }">
        <div class="account-settings-info-left">
          <a-menu
            :mode="isMobile ? 'horizontal' : 'inline'"
            :style="{ border: '0', width: isMobile ? '560px' : 'auto'}"
            :selectedKeys="selectedKeys"
            type="inner"
            @openChange="onOpenChange"
          >
            <a-menu-item v-for="item in tables" :key="item">
              {{ item }}
            </a-menu-item>

          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ $route.meta.title }}</span>
          </div>
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <div slot="title">
                  <a-row>
                    <a-col :span="24">
                      <a-input disabled style="width: 220px;margin-right: 20px" placeholder="字段名" />
                      <a-input style="width: 220px;margin-right: 20px" placeholder="字段中文名" :value="item.title" />
                      <a-select default-value="0" style="width: 120px;margin-right: 20px" placeholder="显示类型">
                        <a-select-option value="0">
                          不显示
                        </a-select-option>
                        <a-select-option value="lucy">
                          Lucy
                        </a-select-option>
                        <a-select-option value="disabled">
                          Disabled
                        </a-select-option>
                        <a-select-option value="Yiminghe">
                          yiminghe
                        </a-select-option>
                      </a-select>
                      <a-select default-value="0" style="width: 120px;margin-right: 20px" placeholder="查询类型">
                        <a-select-option value="0">
                          不可查询
                        </a-select-option>
                        <a-select-option value="lucy">
                          Lucy
                        </a-select-option>
                        <a-select-option value="disabled">
                          Disabled
                        </a-select-option>
                        <a-select-option value="Yiminghe">
                          yiminghe
                        </a-select-option>
                      </a-select>
                      <a-select default-value="0" style="width: 120px;margin-right: 20px" placeholder="编辑类型">
                        <a-select-option value="0">
                          不可编辑
                        </a-select-option>
                        <a-select-option value="lucy">
                          Lucy
                        </a-select-option>
                        <a-select-option value="disabled">
                          Disabled
                        </a-select-option>
                        <a-select-option value="Yiminghe">
                          yiminghe
                        </a-select-option>
                      </a-select>
                      <a-input-number style="margin-right: 20px;" placeholder="宽度" value="" :min="0" :max="100" />
                      <a-input-number style="margin-right: 20px;" placeholder="排序" value="" :min="0" :max="100" />
                    </a-col>
                  </a-row>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  import { RouteView } from '@/layouts'
  import { baseMixin } from '@/store/app-mixin'
  import { tables } from '@/api/baseData'
  import draggable from 'vuedraggable'

  const data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    }
  ]
  const plainOptions = ['搜索', '显示列', '编辑']
  const defaultCheckedList = ['Apple', 'Orange']
  export default {
    name: 'Tables',
    components: {
      RouteView,
      draggable
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
        data,
        // horizontal  inline
        mode: 'inline',

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
        tables: []
      }
    },
    created () {
      tables()
        .then(res => {
          this.tables = res.data
        })
    },
    mounted () {
      this.updateMenu()
    },
    methods: {
      onOpenChange (openKeys) {
        this.openKeys = openKeys
      },
      updateMenu () {
        const routes = this.$route.matched.concat()
        this.selectedKeys = [routes.pop().path]
      }
    },
    watch: {
      '$route' (val) {
        this.updateMenu()
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
