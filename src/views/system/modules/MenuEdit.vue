<template>
  <div>
    <a-form :form="form" layout="vertical" hide-required-mark>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单名称">
            <a-input type="hidden" v-if="menuPid" v-model="form.pid"></a-input>
            <a-input type="hidden" v-else v-model="form.id"></a-input>
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
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="访问路径">
            <a-input v-model="form.path" placeholder="访问路径" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="选择组件">
            <a-select show-search v-model="form.component">
              <a-select-option :value="item.replace('./','/').replace('.vue','')" v-for="(item,index) in paths" :key="index">
                {{item.replace("./","/").replace(".vue","")}}
              </a-select-option>
            </a-select>
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
  const requireComponents = require.context('@/views', true, /\.vue/);
  // 打印结果
  // 遍历出每个组件的路径
  requireComponents.keys().forEach(fileName => {
    // 组件实例
    const reqCom = requireComponents(fileName)
    // 截取路径作为组件名
    console.log(reqCom)
  })
  export default {
    name: 'MenuEdit',
    components: { MenuTreeBtnList },
    props:{
      menuId:Number,
      menuPid:Number
    },
    data () {
      return {
        paths:["/RouteView"].concat(requireComponents.keys()),
        addTitle: '顶级菜单',
        loginBtn:false,
        form: {
          btns: []
        },
      }
    },
    created(){
      if (this.menuPid!==undefined){
        this.form={
          pid:this.menuPid,
          btns: []
        }
      }else {
        this.getMenu(this.menuId)
      }
    },
    watch:{
      menuPid(menuPid){
        console.log("menuPid",menuPid)
        if (menuPid!==undefined){
          this.form={
            pid:menuPid,
            btns: []
          }
        }
      },
      menuId(id){
        console.log("id",id)
        if (this.menuId!==undefined){
          this.getMenu(id)
        }
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