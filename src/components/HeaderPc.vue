<template>
  <div class="header-pc">
    <div class="header-main home-flex-x-between">
      <div class="title-logo">颖秀工作台</div>

      <div class="logout home-btn" @click="logout">退出登录</div>
    </div>
  </div>
</template>

<script>
  import cookie from 'component-cookie'

export default {
  name: 'HeaderPc',
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    logout () {
      cookie('person-token', '')

      window.location.href = './show.html#/'
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/css/base";

  .header-pc {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #fff;
    .header-main {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      padding: 0 30px;
      font-size: 18px;
      font-weight: bold;

      .title-logo {
        color: #f71;
        font-size: 20px;
      }

      .logout {
        width: 80px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>
