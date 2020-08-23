<template>
  <div>
    <keep-alive :include="whiteList" :exclude="exclude">
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      exclude:"",
      whiteList:[],
      isRouterAlive: true
    }
  },
  created(){
    window.APP_PAGE_ROOT = this
  },
  methods: {
    reload (e) {
      this.exclude = this.$route.matched[this.$route.matched.length-1].components.default.name
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
        this.exclude = ""
      })
    },
    //通知排除缓存
    whiteLists (e) {
      this.whiteList = []
      for (let i in e){
        this.whiteList.push(e[i].matched[e[i].matched.length-1].components.default.name)
      }
    }
  }

}
</script>
