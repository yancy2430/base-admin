<template>
  <div>
    <a-form :form="form" layout="vertical" hide-required-mark>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单名称">
            <a-input type="hidden" v-model="form.id"></a-input>
            <a-input v-model="form.name" placeholder="请输入菜单名称">
              <div slot="prefix">
                <a-dropdown :trigger="['click']">
                  <a-icon type="user" @click="e => e.preventDefault()"/>
                  <div slot="overlay">
                    <div class="ant-dropdown-menu" style="padding: 10px;">
                      <div class="icons-list">
                        <a-icon type="home"/>
                        <a-icon type="setting" theme="filled"/>
                        <a-icon type="smile" theme="outlined"/>
                        <a-icon type="sync" spin/>
                        <a-icon type="smile" :rotate="180"/>
                        <a-icon type="loading"/>
                      </div>
                    </div>
                  </div>
                </a-dropdown>
              </div>
            </a-input>
            <a-input type="hidden" v-model="form.pid"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="唯一编码">
            <a-input
              v-model="form.code"
              placeholder="唯一字符串编码"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="菜单路径">
            <a-input
              v-model="form.path"
              placeholder="菜单全路径"
            />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="排序">
            <a-input
              v-model="form.sort"
              placeholder="菜单排序"
            />
          </a-form-item>
        </a-col>

      </a-row>
    </a-form>
    <menu-tree-btn-list v-model="form.btns"></menu-tree-btn-list>
    <div
      :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="visible = false">
        取消
      </a-button>
      <a-button type="primary" :loading="loginBtn" :disabled="loginBtn" @click="handleSubmit">
        提交
      </a-button>
    </div>
  </div>
</template>

<script>
  import { menu, saveMenu , delMenu} from '@/api/system'
  import MenuTreeBtnList from './MenuTreeBtnList'
  export default {
    name: 'MenuEdit',
    components: { MenuTreeBtnList },
    props:{
      menuId:Number
    },
    data () {
      return {
        addTitle: '顶级菜单',
        loginBtn:false,
        form: {
          btns: []
        },
      }
    },
    created(){
        this.getMenu(this.menuId)
    },
    watch:{
      menuId(id){
        this.getMenu(id)
      }
    },
    methods:{
      handleSubmit (e) {
        this.loginBtn = true
        saveMenu(this.form).then(res => {
          if (res.code===0){
            this.$emit('close', true)
          }
          this.loginBtn = false
        })
      },
      editItem(e,item){
        console.log(item)
        this.form = item;
        this.visible = true
      },
      getMenu(id){
        menu(id).then(res => {
          this.form = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>