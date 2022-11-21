<template>
  <!-- 个人信息 -->
  <div class="info-body">
    <div class="info-avatar">
      <img src="../assets/img/ava.jpeg" alt="" />
      <br />
      <h1>Buckie</h1>
      <hr />
    </div>
    <div class="info-text">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          我是一个前端小白，如有问题请多指教
        </div>
        <div class="text">
          <div class="web">
            <p style="float: left">个人介绍：</p>
            <br />
            <p class="content">
               本人是一个普通二本、计算机科学与技术专业的学生。初入大学的时候十分迷茫，不知道应该学什么，以后的应该做什么，所以平时平平淡淡，自己成绩也还可以，但是自己的水平不太行。而学校对学生的培养主要是Java方向。从刚接触前端开始我就有着很大的兴趣，但是我还是浑浑噩噩，后面的有一天，突然开窍，毅然的选择前端方向，慢慢的学习HTML，CSS，JavaScript，Vue全家桶，微信小程序等等。希望能达到前端的门槛吧。
            </p>
          </div>
          <hr />
          <div class="blog">
            <p style="float: left">博客介绍：</p>
            <br />
            <p class="content">
               学了Vue有一段时间了，一直想做一个vue项目练练手，但是由于课程比较多，每天的课程基本排满，还有很多的课程作业，只有找空余时间学学前端知识，课程结束后还要进行毕业设计的开题。等忙完了后，跟着老师，做了一个音乐类小程序，但是老师的内容当然不能满足我，我又去添加了很多我想要的功能，让小程序功能更加完善，完事后再来进行博客的书写。
            </p>
            <br />
            <p class="content" style="text-indent:5em">
              整个博客前后端开发加起来用了十几天,前端采用了<b
                >Vue2 + VueX + VueRouter + ElementUi</b
              >,后端使用的是<b>Express + Mongoose</b>
            </p>
            <br />
          </div>
          <hr />
          <div class="info">
            <p style="float: left">联系我：</p>
            <br />
            <div class="link-icon">
              <li>
                <el-tooltip
                  effect="light"
                  class="item"
                  content="我的Githubヾ(≧▽≦*)o"
                  placement="bottom"
                >
                  <a href="" target="_blank"
                    ><img src="../assets/img/github.png" alt=""
                  /></a>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip
                  effect="light"
                  class="item"
                  content="我的知乎ヾ(≧▽≦*)o"
                  placement="bottom"
                >
                  <a
                    href=""
                    target="_blank"
                    ><img src="../assets/img/zhihu.png" alt=""
                  /></a>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip
                  effect="light"
                  class="item"
                  content="我的B站ヾ(≧▽≦*)o"
                  placement="bottom"
                >
                  <a href="" target="_blank"
                    ><img src="../assets/img/Bili.png" alt=""
                  /></a>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip
                  effect="light"
                  class="item"
                  content="我的微博ヾ(≧▽≦*)o"
                  placement="bottom"
                >
                  <a href="" target="_blank"
                    ><img src="../assets/img/weibo.png" alt=""
                  /></a>
                </el-tooltip>
              </li>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped>
.info-body {
  width: 100%;
  height: 100%;
}
.info-avatar {
  background-image: url("../assets/img/Nabaci3.jpeg");
  overflow: hidden;
  background-size: cover;
}
.info-avatar > img {
  margin-top: 100px;
  width: 180px;
  border-radius: 180px;
  border: 2px solid rgb(65, 226, 247);
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
.info-avatar > h1 {
  text-align: center;
}
.info-text {
  text-align: center;
  margin-top: 50px;
}
.box-card {
  z-index: 1 !important;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 30px;
  margin-bottom: -150px;
  width: 1000px;
  height: 800px;
}
.clearfix {
  font-size: 25px;
}
.text {
  font-size: 18px;
  font-family: "Courier New", Courier, monospace;
}
.content{
  flex-wrap: wrap;
  text-align: left;
}
.web {
  margin-bottom: 10px;
}
.blog {
  margin-top: 10px;
  margin-bottom: 30px;
}
.info {
  margin-top: 30px;
}
.link-icon {
  position: absolute;
  left: 50%;
  top: 78%;
  transform: translate(-50%);
}
.link-icon > li {
  float: left;
  list-style-type: none;
}
.link-icon > li > a > img {
  padding-top: 10px;
  margin-left: 30px;
  margin-top: 20px;
  width: 50px;
  height: 50px;
}
</style>
