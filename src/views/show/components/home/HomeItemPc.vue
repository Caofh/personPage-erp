<template>
  <div class="home-pc">
    <Header></Header>

    <div class="home-container">
      <div class="base-info home-flex-y-center" style="align-items: flex-start;">
        <div class="title-par home-flex-x-start">
          <div class="title">标题</div>
          <div v-if="!titleLimit" class="title-content">{{ title || '' }}</div>
          <div v-if="!titleLimit" @click="editTitle" class="edit home-btn">编辑</div>

          <div v-if="titleLimit" class="title-input"><input @ v-model="titleNext"></div>
          <div v-if="titleLimit" @click="cancelTitle" class="cancel home-btn">取消</div>
          <div v-if="titleLimit" @click="confirmTitle" class="confirm home-btn">确定</div>
        </div>

        <div class="home-flex-x-start">
          <div class="nick-name">昵称</div>
          <div>{{ nickname || '' }}</div>
        </div>

        <div class="add-resource home-flex-x-between">
          <div class="home-flex-x-start">
            <div @click="addSource" class="add-btn home-btn">添加资源</div>
            <div>(6种资源类型)</div>
          </div>

          <div v-if="source.length" class="btn-group home-flex-x-start">
            <div class="home-btn">预览</div>
            <div @click="submit" class="home-btn">提交</div>
          </div>
        </div>

        <div class="now-time home-flex-x-start">
          <div class="title">当前时间：</div>
          <div>{{ nowTimeFormat }}</div>
        </div>

      </div>

      <div class="real-content">
        <SourceItem></SourceItem>
      </div>

    </div>

    <Dialog :message="message"></Dialog>

  </div>
</template>

<script>
import Header from '@/components/HeaderPc.vue'
import SourceItem from './pc-components/source-item.vue'
import Dialog from '@/components/dialog.vue'

//import $ from 'jquery'
import { mapState } from "vuex"
import { updateResource } from '@/api/detail'
import moment from 'moment'

export default {
  name: 'Home',
  data () {
    return {
      title: 'my funny video', // 当前标题
      titleNext: '', // 临时存储title内容
      titleLimit: false, // 标题可变标识

      nickname: 'Topay', // 昵称

      nowTime: moment(),
      message: {} //  dialog弹窗数据
    }
  },
  computed: {
    ...mapState([
      'source' // 当前资源
    ]),
    nowTimeFormat () {
      return this.nowTime.format('YYYY-MM-DD hh:mm:ss')
    }

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
      arr.unshift(obj)

      this.$store.commit('updateSource', arr)

    },

    timeMove () {

      setInterval(() => {
        let time = moment()
        this.nowTime = time

      }, 1000)

    },
    editTitle () {
      this.titleNext = this.title
      this.titleLimit = true
    },
    confirmTitle () {
      this.title = this.titleNext
      this.titleLimit = false
    },
    cancelTitle () {
      this.titleNext = ''
      this.titleLimit = false
    },

    async submit () {
//      console.log(this.source)

      const title = this.title
      const user_id = 1
      const user_name = this.nickname
      const timestamp = this.nowTime.format('x')

      // 组织资源信息
      let source_data = []
      this.source.map((item) => {
        item.source_img.map((itemSon) => {
          let obj = {
            source_type: item.source_type,
            source_content: item.source_content,
            source_title: itemSon.source_title,
            source_img_url: itemSon.source_url
          }
          source_data.push(obj)

        })
      })

      const data = {
        title,
        user_id,
        user_name,
        timestamp,
        source_data
      }
//      console.log(data)

      try {
        const dataList = await updateResource(data)

        let option = {
          visiable: true,
          html: dataList.original.msg,
          btnType: 1,        //(2：二级确认弹窗；1：一级弹窗；‘’:无确认按钮(1.5秒自动取消)；3：无确认按钮(不会自动取消))
          size: 'small',     //弹窗的类型，共三种类型，small，medium，big三种，分本为小中大弹窗，宽度：350，800，1100.可选，默认为small.
        }
        this.message = option

      } catch (error) {

        let option = {
          visiable: true,
          html: error.message,
          btnType: 1,        //(2：二级确认弹窗；1：一级弹窗；‘’:无确认按钮(1.5秒自动取消)；3：无确认按钮(不会自动取消))
          size: 'small',     //弹窗的类型，共三种类型，small，medium，big三种，分本为小中大弹窗，宽度：350，800，1100.可选，默认为small.
        }
        this.message = option

      }

    }

  },
  mounted () {
    this.timeMove() // 当前时间倒计时

  },
  components: {
    Header,
    SourceItem,
    Dialog
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .home-pc {
    font-family: Chalkduster;
    font-size: 14px;
    color: #335B89;
    min-height: 1500px;
    background: #f0f0f0;

    .home-container {
      width: 1200px;
      margin: 0 auto;

      .base-info {
        position: relative;
        padding: 30px 0 30px 30px;
        height: 215px;

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

            -webkit-transition: all 0.3s ease-out;
            -moz-transition: all 0.3s ease-out;
            -ms-transition: all 0.3s ease-out;
            -o-transition: all 0.3s ease-out;
            transition: all 0.3s ease-out;

            &:hover {
              background: #D66008;
            }
          }
        }
        & > .add-resource {
          width: 1140px;
          margin-bottom: 0;

          .btn-group {
            width: 240px;

            .home-btn {
              width: 108px;
              margin-right: 10px;

              -webkit-transition: all 0.3s ease-out;
              -moz-transition: all 0.3s ease-out;
              -ms-transition: all 0.3s ease-out;
              -o-transition: all 0.3s ease-out;
              transition: all 0.3s ease-out;

              &:hover {
                background: #D66008;
              }
            }
            .home-btn:last-child {
              margin-right: 0;
            }
          }
        }

        & > .title-par {
          .title-content, .title-input {
            width: 300px;
          }
          .title-input {
            input {
              width: 280px;
              height: 30px;
              padding: 0 10px;
            }
          }

          .edit, .confirm, .cancel {
            width: 60px;
            height: 25px;
            line-height: 25px;
            margin-right: 10px;

            -webkit-transition: all 0.3s ease-out;
            -moz-transition: all 0.3s ease-out;
            -ms-transition: all 0.3s ease-out;
            -o-transition: all 0.3s ease-out;
            transition: all 0.3s ease-out;

            &:hover {
              background: #D66008;
            }
          }
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
