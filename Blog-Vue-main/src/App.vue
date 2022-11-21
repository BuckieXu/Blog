<template>
  <div class="appcontent">
    <div v-if="$route.meta.headerAlive">
      <HeaderVue></HeaderVue>
    </div>
    <BackTop></BackTop>

    <div id="v-content" v-bind:style="{ minHeight: Height + 'px'}">
      <router-view />
    </div>
    <div v-if="$route.meta.keepAlive">
      <FooterVue></FooterVue>
    </div>
  </div>
</template>

<script>
import BackTop from './components/BackTop'
import HeaderVue from './components/HeaderVue'
import FooterVue from './components/FooterVue'
export default {
  components: { HeaderVue, FooterVue, BackTop },
  data () {
    return {
      Height: 0
    }
  },
  mounted () {
    this.Height = document.documentElement.clientHeight+500
    window.onresize = () => { this.Height = document.documentElement.clientHeight+500}
  }

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.appcontent{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  margin-right: 0;
}

</style>
