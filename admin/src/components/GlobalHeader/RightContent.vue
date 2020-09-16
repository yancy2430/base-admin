<template>
  <div :class="wrpCls">
    <a-row>
      <multi-tab class="multi-tab"></multi-tab>
      <div style="text-align: right;width: 180px;position: absolute;top: 0;right: 0;background: #fff;">
        <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
        <span :class="prefixCls" @click="reload" ><a-icon type="reload" /></span>
        <select-lang :class="prefixCls" />
      </div>
    </a-row>

  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  methods:{
    reload(){
      console.log("reload")
      window.APP_PAGE_ROOT.reload()
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {}
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    this.$store.dispatch('GetInfo').then((res) => {
        this.currentUser = res.data
    })
    // getAdminInfo().then(res=>{
    //   this.currentUser = {
    //     name: 'Serati Ma'
    //   }
    // })
    // setTimeout(() => {
    //   this.currentUser = {
    //     name: 'Serati Ma'
    //   }
    // }, 1500)
  }
}
</script>
