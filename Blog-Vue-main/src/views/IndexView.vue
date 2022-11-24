<template>
  <!-- 主页面 -->
  <div>
    <div class="welShow">
      <!--轮播图区域 -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../assets/img/bg1.png" alt />
          </div>
          <div class="swiper-slide">
            <img src="../assets/img/bg2.png" alt />
          </div>
          <div class="swiper-slide">
            <img src="../assets/img/bg3.png" alt />
          </div>
          <div class="swiper-slide">
            <img src="../assets/img/bg7.png" alt />
          </div>
          <div class="swiper-slide">
            <img src="../assets/img/bg5.png" alt />
          </div>
          <div class="swiper-slide">
            <img src="../assets/img/bg6.png" alt />
          </div>
        </div>
      </div>
      <img class="avatar" src="../assets/img/9086df31395ae8736bf1d512ccf73d9d0a18e240.jpg" />
      <br />
      <div class="webName">
        <p class="webNameContain">欢迎来到Buckie博客</p>
      </div>
      <br />
      <div class="link-icon">
        <li>
          <el-tooltip effect="light" class="item" content="我的Githubヾ(≧▽≦*)o" placement="bottom">
            <el-button type="text">
              <a href="https://github.com/BuckieXu">
                <img class="linkIconImg" src="../assets/img/github.png" alt />
              </a>
            </el-button>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip effect="light" class="item" content="我的QQヾ(≧▽≦*)o" placement="bottom">
            <el-button type="text" @click="open">
              <img
                class="linkIconImg"
                src="https://ts1.cn.mm.bing.net/th/id/R-C.0a5ecb2c5836a635b72c983f0687223c?rik=c8CPosrP8agD0A&riu=http%3a%2f%2fd.lanrentuku.com%2fdown%2fpng%2f1510%2fweixin-qq-icon%2fqq.png&ehk=9oMfrJg0%2b8caFrNwGkaPBtHE62uBI28KH55GJq8pf%2bA%3d&risl=&pid=ImgRaw&r=0"
                alt
              />
            </el-button>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip effect="light" class="item" content="我的微信ヾ(≧▽≦*)o" placement="bottom">
            <el-button type="text" @click="open">
              <img
                class="linkIconImg"
                src="https://ts1.cn.mm.bing.net/th/id/R-C.b4ae3496473df0a158d5b4927d3b74c1?rik=xVW%2fOYSozCCcrQ&riu=http%3a%2f%2fimages.shejidaren.com%2fwp-content%2fuploads%2f2020%2f03%2funnamed-file.png&ehk=N5w8ATecXx%2b1KWZ3xQORVtoIQU0Ijxz8%2bo6viRr14%2fE%3d&risl=&pid=ImgRaw&r=0"
                alt
              />
            </el-button>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip effect="light" class="item" content="我的邮箱ヾ(≧▽≦*)o" placement="bottom">
            <el-button type="text" @click="open">
              <img
                class="linkIconImg"
                src="https://ts1.cn.mm.bing.net/th/id/R-C.8d1b237d1102a1bc81dd4327323a7cc3?rik=Biy3mbcoYlXAZg&riu=http%3a%2f%2fis4.mzstatic.com%2fimage%2fthumb%2fPurple71%2fv4%2fe2%2fcf%2f2f%2fe2cf2fe4-a977-71fd-9b0c-afc40e074bc1%2fsource%2f512x512bb.png&ehk=DZrwEQzhZ1D%2b%2bAZmLTEbrufpVN365ng21m0zQkTiNyI%3d&risl=&pid=ImgRaw&r=0"
                alt
              />
            </el-button>
          </el-tooltip>
        </li>
      </div>
      <!-- <a href="#nva" class="el-icon-arrow-down"></a> -->
    </div>
    <div class="pageShow">
      <el-container>
        <el-header class="navigation" id="header">
          <el-menu router class="el-menu-demo" mode="horizontal">
            <router-link to="/admin-login">
              <img class="logo" src="../assets/img/1000.jpg" alt />
            </router-link>
            <el-menu-item class="el-icon-s-home" index="/index">首页</el-menu-item>
            <el-menu-item class="el-icon-s-operation" index="/category">分类</el-menu-item>
            <el-menu-item class="el-icon-picture" index="/photoalbum">相册</el-menu-item>
            <!-- <el-menu-item class="el-icon-s-custom" index="/friendchain">友链</el-menu-item> -->
            <el-menu-item class="el-icon-bangzhu" index="/resource">资源</el-menu-item>
            <el-menu-item class="el-icon-chat-dot-round" index="/message">留言板</el-menu-item>
            <el-menu-item class="el-icon-info" index="/info">关于</el-menu-item>
            <el-input
              class="search"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="search"
            ></el-input>
            <el-button class="searchBtn" type="primary" size="small" @click="Search">搜索</el-button>
          </el-menu>
        </el-header>
        <el-container>
          <div class="body">
            <img class="allbg" src="../assets/img/allbg.png" alt />
            <div class="body-contain">
              <div class="left">
                <!-- 没有找到文章展示 -->
                <div class="SearchText" v-show="isSearch">
                  <b>未找到搜索文章</b>
                  <br />
                  <el-button type="primary" size="default" @click="returnIndex">返回文章列表</el-button>
                </div>
                <div class="el-icon-loading loding" v-show="isShow"></div>
                <el-table v-show="isShow" v-loading="isShow" style="width: 100%"></el-table>
                <!-- 文章展示 -->
                <div
                  v-for="a in article.slice(
                  (currentPage1 - 1) * pageSize,
                  currentPage1 * pageSize
                )"
                  :key="a.id"
                  class="posts"
                >
                  <img class="posts-img" :src="a.src" alt />
                  <p class="posts-title" @click="articleVist(a._id)">{{ a.title }}</p>
                  <p class="posts-body">{{a.describe}}</p>
                  <div class="post-msg">
                    <p class="el-icon-time posts-time">{{ a.time }}</p>
                    <p></p>
                    <p class="posts-article el-icon-s-promotion" @click="articleVist(a._id)">阅读全文</p>
                  </div>
                </div>
                <!-- 分页器 -->
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
              <!-- 右边部分 -->
              <div class="right">
                <!-- 右边个人板块 -->
                <div class="PersonMsg">
                  <div class="head">
                    <img src="../assets/img/ava.jpeg" alt />
                    <p class="PersonName">Buckie</p>
                  </div>
                  <div class="PerSonResume">
                    <p>简介:</p>
                    <div class="ResumeMsg">本人是一个在校大学生，如有任何疑问可以向我的邮箱投递信息</div>
                  </div>
                  <div class="infoOthers">
                    <p>码龄：1年</p>
                    <p>访客：100人</p>
                    <p>文章：{{this.total}}篇</p>
                    <p>标签：{{this.tagNum}}条</p>
                    <p>邮箱：1070447668@qq.com</p>
                  </div>
                </div>
                <!-- 新闻模块 -->
                <div class="newMsg">
                  <div class="newMsgTitle">
                    <i class="iconfont icon-remen"></i>
                    <h2>今日热点新闻</h2>
                  </div>
                  <ul class="newMsgList">
                    <li v-for="(item,index) in MsgList" :key="index">
                      <span class="newNum">{{index+1}}</span>
                      <a :href="item.url">{{item.showname}}</a>
                    </li>
                  </ul>
                </div>
                <!-- 签名 -->
                <div class="SignContainter" @click="drawer = true">
                  <!-- 主文案 -->
                  <p class="MainText">{{sign.Main}}</p>
                  <!-- 副文案 -->
                  <p class="viceText">{{sign.vice}}</p>
                </div>
                <el-drawer
                  title="我是标题"
                  :visible.sync="drawer"
                  :direction="direction"
                  :before-close="handleClose"
                >
                  <el-form ref="form" :model="sign" label-width="80px">
                    <el-form-item label="主文案">
                      <el-input v-model="sign.Main"></el-input>
                    </el-form-item>
                    <el-form-item label="副文案">
                      <el-input v-model="sign.vice"></el-input>
                    </el-form-item>
                  </el-form>
                </el-drawer>
              </div>
            </div>
          </div>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import FooterVue from "../components/FooterVue";
import "../assets/iconfont/iconfont.css";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import axios from "axios";
export default {
  components: { FooterVue },
  data() {
    return {
      article: [],
      isShow: false, // 控制加载是否显示
      search: "",
      isSearch: false,
      currentPage1: 1,
      total: 1,
      pageSize: 6,
      tagNum: "",
      MsgList: [],
      value: new Date(),
      // 抽屉属性
      drawer: false,
      direction: "rtl",
      sign: {
        Main: "好事将至",
        vice: "两人若是长久时又岂在朝朝暮暮"
      }
    };
  },
  computed: {
    // 解析器配置
    prop() {
      const data = {
        subfield: false,
        defaultOpen: "preview",
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      };
      return data;
    }
  },
  methods: {
    nvaEvent() {
      window.addEventListener("scroll", function() {
        const header = document.getElementById("header");
        const opa = window.screen.availHeight - 150;
        header.classList.toggle("sticky", window.scrollY > opa);
      });
    },
    open() {
      this.$alert("敬请期待", "还未开发此内容", {
        confirmButtonText: "确定"
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${ action }`
        //   });
        // }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 进行搜索
    Search() {
      this.$http.get(`articles/search/${this.search}`).then(res => {
        if (res.data.length === 0) {
          this.$message({
            message: "文章不存在",
            type: "warning",
            offset: 10
          });
          this.isSearch = true;
          this.article = res.data;
        } else {
          this.isSearch = false;
          this.article = res.data;
        }
      });
    },
    returnIndex() {
      this.isSearch = false;
      this.getArticle();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      console.log(`当前页: ${val}`);
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
    // 获取bilibili热搜榜
    getNewMsg() {
      let _that = this;
      axios.get("https://tenapi.cn/bilihot").then(
        function(response) {
          _that.MsgList = response.data.list.splice(0, 10);
        },
        function(err) {
          console.log(err);
        }
      );
    },
    // 获取所有的标签
    getAllTag() {
      this.$http
        .get("/Tag/getAllTag")
        .then(res => {
          this.tagNum = res.data.length;
        })
        .catch(err => {
          this.$message({
            message: "请求超时，请稍后重试",
            type: "error",
            offset: 100
          });
          console.log(err);
        });
    }
  },
  created() {
    this.nvaEvent();
    this.getArticle();
    this.getNewMsg();
    this.getAllTag();
    // this.getAvatorImg();
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      autoplay: {
        delay: 10000
      }
    });
  }
};
</script>

<style scoped>
/* .welshow-navgation{
  width: 100%;
  height: 60px;
  min-width: 1000px;
  z-index: -1;
  backdrop-filter:initial;
} */

.swiper-container {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  margin: auto;
}
.swiper-wrapper {
  width: 100%;
  height: 100%;
}

.swiper-slide img {
  background-size: cover;
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
  color: black;
}
ul li {
  list-style: none;
}
.welShow {
  /* background-image: linear-gradient(to right, #dd3e54, #0083b0); */
  /* background-image: url(https://tenapi.cn/bing/); */
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
}
.avatar {
  display: inline;
  z-index: 101;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 200px;
  border-radius: 180px;
  border: 4px solid rgb(104, 195, 228);
}
.webName {
  padding-top: 10px;
  text-align: center;
  position: relative;
  top: -35%;
  z-index: 101;
}
@keyframes typing {
  0% {
    width: 0;
  }
  50% {
    width: 500px;
  }
  100% {
    width: 0px;
  }
}
.webNameContain {
  font-size: 7vh;
  text-decoration: none;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background-image: linear-gradient(to right, #dd3e54, #0083b0);
  -webkit-background-clip: text;
  color: transparent;
  width: 500px;
  /* overflow: hidden; */
  margin: auto;
  white-space: nowrap;
  animation: typing 8s linear;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.webName > a:hover {
  font-size: 50px;
  color: #85d6f1;
}
.link-icon {
  position: absolute;
  left: 50%;
  top: 78%;
  transform: translate(-50%);
  z-index: 101;
}
.link-icon > li {
  float: left;
  list-style-type: none;
}
.linkIconImg {
  padding-top: 10px;
  margin-left: 30px;
  margin-top: 20px;
  width: 50px;
  height: 50px;
}

.el-icon-arrow-down {
  cursor: pointer;
  font-size: 45px;
  color: #85d6f1;
  position: relative;
  top: 53%;
  left: 50%;
  transform: translate(-50%);
  animation-name: light;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.el-menu-demo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.6s;
}
header {
  opacity: 0;
  width: 100%;
}
.sticky {
  opacity: 1 !important;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-120px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes light {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}

.search {
  width: 15%;
  margin-right: 10px;
}
.searchBtn {
  margin-left: -80px;
}
.SearchText {
  font-size: 50px;
  margin-top: 200px;
}
.logo {
  position: relative;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: 2px solid #eee;
  text-decoration: none;
  font-size: 2em;
  letter-spacing: 2px;
  transition: 0.6s;
}

.el-menu-item {
  font-size: 17px;
}

.el-icon-arrow-down {
  text-decoration: none;
}
.navigation {
  width: 100%;
  position: fixed;
  z-index: 9999;
  top: 0;
}
.nva-avatar {
  margin-top: 5px;
}
.main-body {
  position: relative;
  left: 50%;
}
.allbg {
  width: 100vw;
  height: 100vh;
  z-index: -100;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
}
.body {
  /* background-color: #f0eeee; */
  min-height: 1000px;
  position: relative;
  overflow: hidden;
  text-overflow: clip;
  /* background-image:linear-gradient(to right, #dd3e54, #0083b0); */
}
.body-contain {
  display: flex;
  width: 100%;
}
.loding {
  margin: 30%;
  font-size: 50px;
}
.left {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  height: 100%;
  /* min-height: 1300px; */
  margin-left: 10%;
  margin-top: 20px;
}
.right {
  width: 30%;
  height: 100%;
  margin-top: 20px;
}
/* 文章展示 */
.posts {
  font-family: Optima-Regular, Optima, -apple-system, system-ui, Segoe UI,
    Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont,
    Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial;
  border-radius: 10px;
  box-sizing: border-box;
  background: var(--background-color);
  box-shadow: 5px 5px 5px #d8d3d3;
  transition-property: color, background, box-shadow, border-color, transform;
  transition-delay: 0s, 0s, 0s, 0s, 0s;
  transition-duration: 0.2s, 0.2s, 0.2s, 0.2s, 0.2s;
  transition-timing-function: ease, ease, ease, ease, linear;
  width: 40%;
  height: 400px;
  min-height: 300px;
  background-color: #ffffff;
  min-width: 300px;
  display: block;
  margin-left: 40px;
}
.posts:hover {
  transform: scaleX(1.015) scaleY(1.015);
  box-shadow: 2px 2px 10px rgb(175, 175, 175);
}
.posts-img {
  width: 100%;
  height: 56%;
  display: block;
}
.posts-title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 22px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
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
}
.post-msg {
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
  width: 100%;
  height: 30px;
}
/* 个人板块 */

.PersonMsg {
  width: 40%;
  height: 20%;
  min-height: 350px;
  min-width: 300px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  user-select: none;
}
.PersonMsg .head {
  width: 100%;
  display: flex;
  line-height: 60px;
}
.PersonMsg img {
  width: 20%;
  height: 20%;
  border-radius: 50%;
  left: 5%;
  top: 5%;
}
.PersonName {
  font-size: 22px;
  padding-left: 5%;
  flex-flow: wrap;
}
.PerSonResume {
  width: 100%;
  display: flex;
  margin-top: 5%;
}
.PerSonResume p {
  width: 20%;
  padding-left: 0;
  text-align: left;
}

.ResumeMsg {
  width: 80%;
  text-align: left;
  flex-wrap: wrap;
}
.infoOthers {
  text-align: left;
}
.infoOthers p {
  width: 100%;
  margin-top: 16px;
  flex-wrap: wrap;
}
/* 新闻版块 */
.newMsg {
  width: 20%;
  height: 28%;
  min-width: 300px;
  min-height: 500px;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  box-sizing: border-box;
  user-select: none;
}
.newMsgTitle {
  width: 100%;
  display: flex;
  line-height: 60px;
}
.newMsgTitle i {
  margin-right: 5%;
}
.newMsgTitle h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.newMsgList {
  width: 100%;
}
.newMsgList li {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.newNum {
  margin-right: 5%;
  font-size: 18px;
}
/* 签名部分 */
.SignContainter {
  width: 20%;
  height: 160px;
  min-width: 300px;
  background-color: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  background-image: url(https://api.r10086.com/%E5%9B%BE%E5%8C%85/%E9%A3%8E%E6%99%AF%E7%B3%BB%E5%88%972/15469478_12.jpg);
  opacity: 0.9;
  background-size: 100% 100%;
  margin-bottom: 20px;
}
.MainText {
  width: 25%;
  font-size: 30px;
  padding: 20px;
  padding-top: 10px;
  color: white;
  font-family: "宋体";
  user-select: none;
}
.viceText {
  width: 20%;
  height: 90%;
  font-size: 14px;
  color: skyblue;
  writing-mode: vertical-lr;
  margin: auto 10px;
  letter-spacing: 5px;
  user-select: none;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 1000;
}
</style>
