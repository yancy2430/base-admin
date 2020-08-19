<template>
  <div :class="wrpCls">
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <span :class="prefixCls" ><a-icon type="reload" /></span>
    <select-lang :class="prefixCls" />
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
