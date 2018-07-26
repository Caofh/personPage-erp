<template>
  <div>
    <component :is="currentView"></component>
  </div>

</template>

<script>
  import { mapState } from "vuex"
  import Pc from '../components/Login/LoginPc.vue'
  import Moblie from '../components/Login/LoginMobile.vue'

  export default {
    name: 'Login',
    data(){
      return {
        currentView : null,
        resizeTimer : null
      }
    },
    computed: {
      ...mapState([
        'source' // 当前选中的tab
      ])
    },
    created () {
      this.checkView();
      this.setCurrentView();
    },
    watch: {

    },
    mounted () {

    },
    methods: {
      checkView(){
        this.resizeTimer = null;
        window.addEventListener('resize',()=>{
          if (this.resizeTimer) {
            clearTimeout(this.resizeTimer)
          }
          this.resizeTimer = setTimeout(()=>{
            this.setCurrentView()
          }, 100);
        })
      },
      setCurrentView(){
        let clientWidth = document.documentElement.clientWidth;
        this.currentView = clientWidth <= 750 ? Moblie : Pc;
      }
    }

  }

</script>

<style lang="scss">
  @import "../../../assets/css/base";

  body {
    /*background: #f0f0f0;*/
  }

</style>
