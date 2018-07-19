<template>
  <div class="home-pc">
    <Header></Header>

    <div class="home-container">
      <div class="base-info home-flex-y-center" style="align-items: flex-start;">
        <div class="home-flex-x-start">
          <div class="title">标题</div>
          <div>my funny video</div>
        </div>

        <div class="home-flex-x-start">
          <div class="nick-name">昵称</div>
          <div>Topay</div>
        </div>

        <div class="add-resource home-flex-x-start">
          <div @click="addSource" class="add-btn home-btn">添加资源</div>
          <div>(6种资源类型)</div>
        </div>

        <div class="now-time home-flex-x-start">
          <div class="title">当前时间：</div>
          <div>2018-7-17 11:34:47</div>
        </div>

      </div>

      <div>
        <SourceItem></SourceItem>
      </div>

    </div>

  </div>
</template>

<script>
import Header from '@/components/HeaderPc.vue'
import SourceItem from './pc-components/source-item.vue'

//import $ from 'n-zepto'
import { mapState } from "vuex"
import { getList } from '@/api/test'

export default {
  name: 'Home',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'source' // 当前选中的tab
    ])

  },
  created () {

  },
  methods: {
    addSource () {
      const obj = {
        source_type: '',
        source_content: "",
        source_img: []
//        source_title: "",
//        source_img_url: ""
      }
      let arr = this.source
      arr.push(obj)

      this.$store.commit('updateSource', arr)

    }

  },
  async mounted () {
    console.log(this.fontSize)

    const dataList = await getList()
    console.log(dataList)

  },
  components: {
    Header,
    SourceItem
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .home-pc {
    font-family: Chalkduster;
    font-size: 14px;
    color: #335B89;

    .home-container {
      width: 1200px;
      margin: 0 auto;

      .base-info {
        position: relative;
        padding: 30px 0 30px 30px;
        & > div {
          margin-bottom: 30px;
          text-align: left;
          font-size: 18px;

          & > div {
            width: 760px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .title, .nick-name {
            width: 100px;
          }

          .add-btn {
            width: 108px;
            margin-right: 30px;
          }
        }
        & > .add-resource {
          margin-bottom: 0;
        }

        .now-time {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 265px;
          font-size: 14px;

          & > .title {
            width: 80px;
          }
          & > div {
            width: 180px;
          }
        }

        border-bottom: 1px solid #fff;

      }

      .real-content {





      }

    }

  }

</style>
