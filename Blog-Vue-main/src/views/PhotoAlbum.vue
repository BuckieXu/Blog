<template>
  <div class="photocontent">
    <div class="waterfull">
      <div class="v-waterfall-content" id="v-waterfall">
          <div
          v-for="(img, index) in waterfallList"
          :key="index"
          class="v-waterfall-item"
          :style="{top:img.top+10+'px',left:img.left+10+'px',width:waterfallImgWidth+'px',height:img.height}"
        >
          <img :src="img.src" alt />
        </div>      
        <!-- <br style="clear:both;"/> -->
      </div>
    </div>
    <el-button type="primary" @click="getMore" class="more"  :style="{ display:this.isshow == true ? 'block' : 'none' }">点击获取更多</el-button>
  </div>
</template>

<script>
export default {
  name: "v-waterfall",
  data() {
    return {
      waterfallList: [],
      imgArr: [
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%8813/63438823_p0.jpg",
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%889/0072Vf1pgy1foxkf55zbij31kw0w0e55.jpg",
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/%E7%BC%98%E4%B9%8B%E7%A9%BA%E7%AB%96%E5%B1%8F%E7%B3%BB%E5%88%971/wallhaven-e77878.jpg",
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/%E9%A3%8E%E6%99%AF%E7%B3%BB%E5%88%974/8354793_1.jpg",
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/P%E7%AB%99%E7%B3%BB%E5%88%971/78361210_p0.jpg",
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/%E7%89%A9%E8%AF%AD%E7%B3%BB%E5%88%971/pixiv%207527495%20%E3%81%B2%E3%81%9F%E3%81%8E%E3%81%95%E3%82%93%EF%BD%9E_kobapyon.jpg",
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/%E7%89%A9%E8%AF%AD%E7%B3%BB%E5%88%972/38421572_p0.jpg",
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/P%E7%AB%99%E7%B3%BB%E5%88%972/36393711_p0.jpg",
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/P%E7%AB%99%E7%B3%BB%E5%88%972/51285626_p0.png",
        "https://api.r10086.com/%E5%9B%BE%E5%8C%85/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%881/90214-106.jpg"

      ],
      imgList: [],
      // waterfallImgWidth: 100,
      waterfallImgWidth: 370, // 每个盒子的宽度
      // waterfallImgCol: 5,// 瀑布流的列数
      waterfallImgCol: 4, // 瀑布流的列数
      waterfallImgRight: 10, // 每个盒子的右padding
      waterfallImgBottom: 10, // 每个盒子的下padding
      waterfallDeviationHeight: [],
      imgdata: [],
      thisindex: 1,
      isshow:true
    };
  },
  created() {
    // 触发入口
    this.changeImg();
   
  },
  mounted() {
    this.getALLImg();
    this.calculationWidth();
    // this.getMore();
    
  },
  methods: {
    //计算每个图片的宽度或者是列数
    calculationWidth() {
      let domWidth = document.getElementById("v-waterfall").offsetWidth;
      if (!this.waterfallImgWidth && this.waterfallImgCol) {
        this.waterfallImgWidth =
          (domWidth - this.waterfallImgRight * this.waterfallImgCol) /
          this.waterfallImgCol;
      } else if (this.waterfallImgWidth && !this.waterfallImgCol) {
        this.waterfallImgCol = Math.floor(
          domWidth / (this.waterfallImgWidth + this.waterfallImgRight)
        );
      }
      //初始化偏移高度数组
      this.waterfallDeviationHeight = new Array(this.waterfallImgCol);
      for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
        this.waterfallDeviationHeight[i] = 0;
      }
      this.imgPreloading();
    },
    //图片预加载
    imgPreloading() {
      for (let i = 0; i < this.imgList.length; i++) {
        let aImg = new Image();
        aImg.src = this.imgList[i];
        aImg.onload = aImg.onerror = e => {
          let imgData = {};
          imgData.height = (this.waterfallImgWidth / aImg.width) * aImg.height;
          imgData.src = this.imgList[i];
          this.waterfallList.push(imgData);
          this.rankImg(imgData);
        };
      }
    },
    //瀑布流布局
    rankImg(imgData) {
      let {
        waterfallImgWidth,
        waterfallImgRight,
        waterfallImgBottom,
        waterfallDeviationHeight,
        waterfallImgCol
      } = this;
      let minIndex = this.filterMin();
      imgData.top = waterfallDeviationHeight[minIndex];
      imgData.left = minIndex * (waterfallImgRight + waterfallImgWidth);
      waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom;
    },
    /**
     * 找到最短的列并返回下标
     * @returns {number} 下标
     */
    filterMin() {
      const min = Math.min.apply(null, this.waterfallDeviationHeight);
      return this.waterfallDeviationHeight.indexOf(min);
    },
    changeImg() {
      for (let i = 0; i < this.imgArr.length; i++) {
        // this.imgList.push(this.imgArr[Math.round(Math.random() * 8)]);// 图片随机显示
        this.imgList.push(this.imgArr[i]);
      }
    },
    // 加载更多
    getMore() {

        for (var i = (this.thisindex - 1) * 40; i < this.thisindex * 40; i++) {
        this.imgArr.push(this.imgdata[i].ImgLink);
      }
      // for (let i =0; i <this.imgdata.length; i++) {
      //   this.imgArr.push(this.imgdata[i].ImgLink);
      //   if (i >= this.imgdata.length) {
      //     break;
      //   }
      // }
      // 
      this.imgList=[]
      for (let i = 0; i < this.imgArr.length; i++) {
        // this.imgList.push(this.imgArr[Math.round(Math.random() * 8)]);// 图片随机显示
        this.imgList.push(this.imgArr[i]);
      }
      // 将更多图片加入到列表中
      // 重新渲染列表显示新的图片列表在后面
      this.calculationWidth();
      this.thisindex++;
      // 将更多的图片放入Arr中
      if(this.imgList.length>this.imgdata.length){
        this.isshow=false;
      }
    
    },
    // 获取图片
    getALLImg() {
      this.$http
        .get("img/getimg")
        .then(res => {
          this.imgdata = res.data;
        })
        .catch(err => {
          this.isShow = true;
          this.$message({
            message: "请求超时，请稍后重试",
            type: "error",
            offset: 100
          });
          console.log(err);
        });
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.photocontent {
  position: relative;
  width: 100%;
  height: 100%;
  height: auto;
  /* overflow: hidden; */
}
.waterfull {
  width: 100%;
  height: 100%;
  clear: both;
}
.v-waterfall-content {
  /* 主要 */
  width: 100%;
  height: 100%;
  overflow: hidden;
  clear: both;
}

.v-waterfall-item {
  /* 主要 */
  float: left;
  position: absolute;
  
}

.v-waterfall-item img {
  /* 主要 */
  /* width: auto;height: auto; */
  width: 100%;
  height: auto;
  /* 次要 */
  border-radius: 6px;
}
.more {
  position: fixed;
  background-color: blue;
  width: 120px;
  height: 50px;
  bottom: 0;
  right: 0px;
}
</style>

