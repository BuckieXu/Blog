<template>
  <div class="category">
    <img class="bgimg" src="../assets/img/allbg.png" alt />
    <!-- 标签展示 -->
    <div class="categoryContain">
      <!-- 头部区域 -->
      <div class="header">
        <div class="headertitle">
          <h2>分类</h2>
        </div>
        <div class="statistics">
          共计
          <span>{{article.length}}</span>篇博客
        </div>
      </div>
      <!--标签部分  -->
      <div class="tagarea">
        <div class="tagboard" :style="randomRgb(tagItem)" @click="getArticle()">
        <a>全部</a>
        <div class="tagboardNum">{{total}}</div>
      </div>
        <div
          class="tagboard"
          v-for="(tagItem,index) in tag"
          :style="randomRgb(tagItem)"
          :key="index"
          @click="getMsgByTagName(index)"
        >
          <a>{{tagName[tagItem.class]}}</a>
          <div class="tagboardNum">{{tagItem.num}}</div>
        </div>
      </div>    
    </div>
    <!-- 下面文章展示部分 -->
    <div class="articlecontent">
      <div
        class="posts"
        v-for="articleItem in article.slice(
                  (currentPage1 - 1) * pageSize,
                  currentPage1 * pageSize
                )"
        :key="articleItem._id"
      >
        <img class="posts-img" :src="articleItem.src" alt />
        <p class="posts-title" @click="articleVist(articleItem._id)">{{articleItem.title}}</p>
        <div class="posts-body">
          <p>{{articleItem.describe}}</p>
        </div>
        <div class="articleargu">
          <p class="el-icon-time posts-time">{{articleItem.time}}</p>
          <p class="posts-article el-icon-s-promotion" @click="articleVist(articleItem._id)">阅读全文</p>
        </div>
      </div>
      <!-- 下方分页器 -->
    </div>
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next, jumper "
        :total="total"
        :current-Page="currentPage1"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: [],
      article: [],
      isSearch: false,
      currentPage1: 1,
      total: 1,
      pageSize: 6,
      tagName: [
        "",
        "前端",
        "项目",
        "Vue",
        "Node.js",
        "Java",
        "微信小程序",
        "随记",
        "HTML",
        "MarkDown"
      ]
    };
  },
  methods: {
    //  获取所有标签信息方法
    getAllTag() {
      this.$http
        .get("/Tag/getAllTag")
        .then(res => {
          this.tag = res.data;
          // console.log(this.tag);
        })
        .catch(err => {
          this.$message({
            message: "请求超时，请稍后重试",
            type: "error",
            offset: 100
          });
          console.log(err);
        });
    },
    getMsgByTagName(index) {
      // 获取标签属性
      const classNum = this.tag[index].class;
      // 通过class获取文章数据
      this.$http.get(`/articles/getarticlesByClass/${classNum}`).then(res => {
        this.article = res.data;
        this.title = this.article.length;
      });
    },
    articleVist(id) {
      this.$router.push(`articleview/${id}`);
      // this.$store.commit("ID", id);
    },
    // 获取所有文章信息
    getArticle() {
      this.$http
        .get("articles")
        .then(res => {
          this.article = res.data;
          this.total = this.article.length;
          // console.log(this.article);
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
    },
    //随机产生颜色
    // 循环遍历不同背景色
    randomRgb(tagItem) {
      let R = Math.floor(Math.random() * 130 + 110);
      let G = Math.floor(Math.random() * 130 + 70);
      let B = Math.floor(Math.random() * 130 + 110);
      return {
        background: "rgb(" + R + "," + G + "," + B + ")"
      };
    },

    // returnIndex() {
    //   this.isSearch = false;
    //   this.getArticle();
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      console.log(`当前页: ${val}`);
    }
  },
  mounted() {
    this.getAllTag();
    this.getArticle();
  }
};
</script>

<style>
.bgimg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -100;
}
.category {
  width: 100%;
  height: calc(100%);
}
.categoryContain {
  width: 80%;
  min-width: 400px;
  position: relative;
  top: 40px;
  left: 10%;
  border: 0.5px solid #54c0b0;
  border-radius: 4px;
  /* border-style: none; */
}
/* header部分 */
.header {
  width: calc(100%+2px);
  background-color: #54c0b0;
  height: 60px;
  justify-content: space-between;
  display: flex;
  line-height: 60px;
  border-bottom: 1px solid #54c0b0;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}
.headertitle {
  padding-left: 20px;
}
.headertitle h2 {
  color: #c94d53;
}
.statistics {
  width: 30%;
  height: 100%;
  font-size: 16px;
  text-align: right;
  padding-right: 40px;
}
.statistics span {
  font-size: 22px;
  color: #c94d53;
}
/* 标签部分 */
.tagarea {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: white;
  padding: 10px 0;
}

.tagboard {
  margin-left: 15px;
  width: 18%;
  height: 40px;
  border: 1px solid #a8acab;
  border-radius: 5px;
  display: flex;
  line-height: 40px;
  margin-top: 10px;
}
@media screen and (max-width: 1100px) {
  .tagboard {
    margin-left: 10px;
    width: 18%;
    min-width: 100px;
    height: 40px;
    border: 1px solid #a8acab;
    border-radius: 5px;
    display: flex;
    line-height: 40px;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tagboardNum {
    display: none;
  }
}
.tagboard a {
  text-decoration: none;
  padding-left: 10px;
  width: 74%;
  text-align: center;
}
.tagboardNum {
  width: 26%;
  text-align: center;
}
/* 下面文章展示部分 */
.articlecontent {
  width: 82%;
  margin-left: 10%;
  border-radius: 10px;
  margin-bottom: 0px;
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
}

.posts {
  font-family: Optima-Regular, Optima, -apple-system, system-ui, Segoe UI,
    Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont,
    Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial;
  position: relative;
  border-radius: 10px;
  box-sizing: border-box;
  background: var(--background-color);
  margin-bottom: 38px;
  transition-property: color, background, box-shadow, border-color, transform;
  transition-delay: 0s, 0s, 0s, 0s, 0s;
  transition-duration: 0.2s, 0.2s, 0.2s, 0.2s, 0.2s;
  transition-timing-function: ease, ease, ease, ease, linear;
  width: 30%;
  height: 400px;
  min-width: 350px;
  background-color: #ffffff;
  text-align: left;
  margin-left: 2%;
  flex-wrap: wrap;
}
.md {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 23px;
  max-height: 46px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.posts-img {
  width: 100%;
  height: 60%;
  border-radius: 5px;
}
.posts-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
.posts-title > a {
  text-decoration: none;
  color: var(--default-text-color);
}
.posts-title:hover {
  color: #0083b0;
}
.posts-body {
  width: 80%;
  height: 60px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  padding: 0 10%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  flex-wrap: wrap;

  /* display: -webkit-box; */
  /* -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; */
}
.articleargu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #d8d3d3;
}
.posts-time {
  margin-left: 10px;
  font-size: 15.5px;
  height: 100%;
  line-height: 60px;
}
.posts-article {
  margin-right: 10px;
  cursor: pointer;
  text-decoration: none;
  color: rgb(114, 112, 112);
  height: 100%;
  line-height: 60px;
}
.body {
  height: 100%;
  width: 100%;
  text-align: center;
  justify-content: center;
  position: relative;
}
.block {
  display: block;
  width: 100%;
  margin-bottom: 40px;
  text-align: center;
  /* margin: 20px auto; */
}
</style>