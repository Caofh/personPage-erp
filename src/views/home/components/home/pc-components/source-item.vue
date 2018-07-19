<template>
  <div class="source-item-par">
    <div v-for="(item, index) in source" class="source-item">
      <div class="choose home-flex-x-start">
        <div class="choose-type">
          <select v-model="item.source_type" @change="change(item)">
            <option value="">请选择资源类型</option>
            <option value="1">轮播</option>
            <option value="2">专题</option>
            <option value="3">左图右文案</option>
            <option value="4">右图左文案</option>
            <option value="5">横排三张图</option>
            <option value="6">横排两图瀑布流</option>
          </select>
        </div>
        <div class="show-control home-img"><img src="../../../assets/img/down.png"></div>

      </div>

      <div v-if="item.source_type == 1" class="source source-carousel">
        <div class="carousel-content">
          <div v-for="itemSon in item.source_img" class="carousel-item">
            <div class="img home-img">
              <img :src="itemSon.source_url || ''">
            </div>
            <div class="context">
              <input type="text" placeholder="标题" v-model="itemSon.source_title">
            </div>

          </div>


          <div class="add-img">
            <input @change="uploadFile" :data-index="index" type="file">
          </div>

        </div>

      </div>

      <div v-if="item.source_type == 2" class="source source-subject">
        <div class="subject-content home-flex-x-between">
          <div class="img home-img">
            <img src="../../../assets/img/demo.jpg">

            <div v-if="false" class="add-img"></div>
          </div>

          <div class="context">
            <textarea placeholder="write something"  v-model="item.source_content"></textarea>
          </div>

        </div>
      </div>

      <div v-if="item.source_type == 3" class="source source-left-img">
        <div class="subject-content home-flex-x-between">
          <div class="img home-img">
            <img src="../../../assets/img/demo.jpg">

            <div v-if="false" class="add-img"></div>
          </div>

          <div class="context">
            <textarea placeholder="write something" v-model="item.source_content"></textarea>
          </div>

        </div>
      </div>

      <div v-if="item.source_type == 4" class="source source-right-img">
        <div class="subject-content home-flex-x-between">
          <div class="context">
            <textarea placeholder="write something" v-model="item.source_content"></textarea>
          </div>

          <div class="img home-img">
            <img src="../../../assets/img/demo.jpg">

            <div v-if="false" class="add-img"></div>
          </div>

        </div>
      </div>

      <div v-if="item.source_type == 5" class="source source-three">
        <div class="subject-content">
          <div class="img-group">
            <div class="img home-img">
              <img src="../../../assets/img/demo.jpg">
            </div>
            <div class="img home-img">
              <img src="../../../assets/img/demo.jpg">
            </div>
            <div class="img home-img">
              <img src="../../../assets/img/demo.jpg">
            </div>

            <div v-if="false" class="add-img"></div>
          </div>

          <div class="context">
            <textarea placeholder="write something" v-model="item.source_content"></textarea>
          </div>

        </div>
      </div>

      <div v-if="item.source_type == 6" class="source source-two-waterfall">
        <div class="waterfall-content">
          <div class="carousel-item">
            <div class="img home-img">
              <img src="../../../assets/img/demo.jpg">
            </div>
            <div class="context">
              <input type="text" placeholder="标题">
            </div>

          </div>

          <div class="add-img"></div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
//import $ from 'n-zepto'
import { mapState } from "vuex"
import { uploadImg } from '../../../../../api/home'

export default {
  name: 'Home',
  data () {
    return {
      /*
        {
          "title": "my funny video",
          "user_id": "1",
          "user_name": "Topay",
          "timestamp": "1531452424821",
          "source_data": [
              {
                  "source_type": "6",
                  "source_content": "随便输入点的内容吧",
                  "source_title": "没有",
                  "source_img_url": "http://118.190.207.166:8000/personPage/images/img_1.jpeg"
              },
              {
                  "source_type": "6",
                  "source_content": "随便输入点的内容吧1",
                  "source_title": "没有1",
                  "source_img_url": "http://118.190.207.166:8000/personPage/images/img_1.jpeg"
              }
          ]
        }
      */

    }
  },
  computed: {
    ...mapState([
      'source' // 当前选中的tab
    ])
  },
  props: [],
  created () {

  },
  methods: {
    change (item) {
      // 清空单项的其他数据
      item.source_content = ''
      item.source_img = []
    },

    async uploadFile (e) {
//      console.log(e)

      // 当前数据索引
      const count = e.target.getAttribute("data-index")
      console.log(count)

      // 文件
      const file = e.target.files[0]
      // 文件类型
      let file_type = file.type.split('/')[0]

      let formData = new FormData()
      formData.append('file', file)

      try {
        const dataList = await uploadImg(formData, file_type)

        // 更新dom
        let imgObj = {
          source_url: dataList.target_path || '',
          source_title: ''
        }
        let arr = this.source
        arr[count].source_img.push(imgObj)

        this.$store.commit('updateSource', arr)

//        console.log(dataList)
//        console.log(this.source)

      } catch (error) {
        console.log(error)

      }




    }

  },
  mounted () {
    console.log('123', this.source)

  },
  watch: {
    'source': {
      handler(val, oldVal) {

        console.log(val)


      },
      deep: true
    }






  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../../../../assets/css/base";

  .source-item-par {
    padding-top: 40px;
    .source-item {
      margin-bottom: 40px;
      padding-bottom: 80px;
      border-bottom: 1px solid #fff;

      .choose {
        margin-bottom: 40px;
        .choose-type {
          select {
            width: 250px;
            height: 36px;
            background: #D8D8D8;
            border-radius: 4px;
            border: none;
            margin-right: 35px;
            font-size: 16px;
            color: #fff;
          }
        }

        .show-control {
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
      }

      /*轮播内容样式*/
      .source-carousel {
        .carousel-content {
          overflow: hidden;
          .carousel-item {
            float: left;
            margin-right: 80px;

            .img {
              width: 220px;
              height: 145px;
              margin-bottom: 25px;
            }
            .context {
              width: 220px;
              height: 36px;
              input {
                width: 100%;
                height: 36px;
                line-height: 36px;
                background-color: #fff;
                border: none;
                border-radius: 4px;
                padding: 0 10px;
                color: #000;
                font-size: 16px;
              }
            }
          }

          .add-img {
            float: left;
            width: 120px;
            height: 120px;
            background: url(../../../assets/img/addImg.png) no-repeat center / 100% 100%;
            cursor: pointer;

            [type='file'] {
              width: 100%;
              height: 100%;
              opacity: 0;
              line-height: 300px;
              cursor: pointer;
            }
          }

        }

      }

      /*专题内容样式*/
      .source-subject {
        .subject-content {
          .img {
            width: 370px;
            height: 240px;
          }

          .context {
            width: 480px;
            height: 145px;
            margin-right: 105px;
            textarea {
              width: 480px;
              height: 145px;
              border: none;
              padding: 15px;
              resize: none;
              background: #fff;
              color: #000;
              font-size: 16px;
              font-weight: bold;
            }
          }

        }

      }

      /*左图右内容样式*/
      .source-left-img {
        .subject-content {
          .img {
            width: 230px;
            height: 305px;
            margin-left: 45px;
          }

          .context {
            width: 480px;
            height: 145px;
            margin-right: 105px;
            textarea {
              width: 480px;
              height: 145px;
              border: none;
              padding: 15px;
              resize: none;
              background: #fff;
              color: #000;
              font-size: 16px;
              font-weight: bold;
            }
          }

        }

      }

      /*右图左内容样式*/
      .source-right-img {
        .subject-content {
          .context {
            width: 480px;
            height: 145px;
            textarea {
              width: 480px;
              height: 145px;
              border: none;
              padding: 15px;
              resize: none;
              background: #fff;
              color: #000;
              font-size: 16px;
              font-weight: bold;
            }
          }

          .img {
            width: 230px;
            height: 305px;
            margin-right: 80px;
          }

        }

      }

      /*横排三张图样式*/
      .source-three {
        .subject-content {
          .img-group {
            margin-bottom: 70px;
            overflow: hidden;

            .img {
              float: left;
              width: 186px;
              height: 245px;
              margin-right: 100px;
            }
          }

          .context {
            width: 480px;
            height: 145px;
            textarea {
              width: 480px;
              height: 145px;
              border: none;
              padding: 15px;
              resize: none;
              background: #fff;
              color: #000;
              font-size: 16px;
              font-weight: bold;
            }
          }

        }

      }

      /*横排两张瀑布流样式*/
      .source-two-waterfall {
        .waterfall-content {
          overflow: hidden;
          .carousel-item {
            float: left;
            margin-right: 80px;

            .img {
              width: 175px;
              height: 220px;
              margin-bottom: 25px;
            }
            .context {
              width: 175px;
              height: 36px;
              input {
                width: 100%;
                height: 36px;
                line-height: 36px;
                background-color: #fff;
                border: none;
                border-radius: 4px;
                padding: 0 10px;
                color: #000;
                font-size: 16px;
              }
            }
          }

          .add-img {
            float: left;
            width: 120px;
            height: 120px;
            background: url(../../../assets/img/addImg.png) no-repeat center / 100% 100%;
            cursor: pointer;
          }

        }

      }

    }

  }

</style>
