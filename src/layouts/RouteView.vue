<template>
  <div>
    <keep-alive v-if="keepAlive">
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
      isRouterAlive: true
    }
  },
  created(){
    window.APP_PAGE_ROOT = this
  },
  methods: {
    reload (e) {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }

}
</script>
