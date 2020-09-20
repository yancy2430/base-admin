<template>
    <page-header-wrapper>

        <div class="page-header-index-wide">
            <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
                <div class="account-settings-info-main" >
                    <div class="account-settings-info-left">
                        <a-menu
                                :style="{ border: '0'}"
                                type="inner"
                                @click="onOpenChange">
                            <a-menu-item v-for="item in categorys" :key="item.id">
                                {{item.name}}
                            </a-menu-item>
                        </a-menu>
                    </div>
                    <div class="account-settings-info-article">
                        <a-menu
                                :style="{ border: '0'}"
                                type="inner"
                        >
                            <a-menu-item v-for="item in categorys" :key="item.id">
                                {{item.name}}
                            </a-menu-item>
                        </a-menu>
                    </div>
                    <div class="account-settings-info-right">
                        <div class="account-settings-info-title">
                            <a-input size="large" placeholder="large size"/>
                        </div>
                        <mavon-editor style="box-shadow: none;" />
                    </div>
                </div>
            </a-card>
        </div>

    </page-header-wrapper>
</template>

<script>
  import { categorys } from 'tdeado-api/blogmanage'
  import mavonEditor from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: "articleList",
    components: {
      'mavon-editor': mavonEditor.mavonEditor
    },
    data(){
      return {
        categorys:[],
        openKeys: [],
        selectedKeys: []
      }
    },
    created () {
      categorys().then(res=>{
        this.categorys = res.data
      })
    },
    methods: {
      onOpenChange (openKeys) {
        console.log(openKeys.key)
      },
    },
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
            width: 160px;
        }
        .account-settings-info-article {
            border-right: 1px solid #e8e8e8;
            width: 260px;
        }

        .account-settings-info-right {
            flex: 1 1;
            padding: 8px 0px;

            .account-settings-info-title {
                color: rgba(0, 0, 0, .85);
                font-size: 20px;
                font-weight: 500;
                line-height: 28px;
                margin-bottom: 0px;
                border-bottom: 1px solid #f2f6fc;
            }

            .account-settings-info-view {
                padding-top: 12px;
            }
        }
    }
    .ant-input {
        height: 42px;
        padding: 4px 16px;
        border: 0;
    }
    .ant-input:focus {
        border-color: #40a9ff;
        border-right-width: 0px !important;
        outline: 0;
        box-shadow: 0 0 0 0px rgba(24, 144, 255, 0.2);
    }
</style>
