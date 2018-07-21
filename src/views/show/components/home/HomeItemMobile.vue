<template>
  <div class="home-mobile">
    请在PC端打开!😁
  </div>
</template>

<script>
import '@/assets/js/m.js'

export default {
  name: 'Home',
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  },
  mounted () {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../../../assets/css/pr2rem';

  .home-mobile {
    font-size: pr(35);
    text-align: center;
    margin-top: pr(10);

    .title {
      font-size: pr(50);
      font-weight: bold;
    }
    img {
      width: pr(750);
    }
    .f71 {
      color: #f71;
    }
  }

</style>
