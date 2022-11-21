<template>
  <!-- 页脚组件 -->
  <div class="footercontain">
    <el-footer class="footer">
      <div class="buildtime">博客已运行&nbsp;&nbsp; 1天3小时3分钟23秒</div>
      <div class="blogName">@2022 &nbsp;&nbsp;&nbsp;Buckie的博客</div>
      <div>
        <a class="beian" href="http://beian.miit.gov.cn/" target="_blank"
          >还没有备案</a
        >
      </div>
    </el-footer>
  </div>
</template>

<script>
export default {
  created () {
  }

}
</script>

<style scoped>
.footercontain {
  text-align: center;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 100px;
  z-index: 9999;
  background-image:linear-gradient(to right,  rgba(170, 224, 238, 0.5) , rgba(130, 0, 222, 0.5));
  transition: 0.6s;
  overflow: hidden;
}
.footer{
  width: 100%;
  height: 100%;
}
.buildtime{
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.blogName{
   width: 100%;
   height: 30px;
   line-height: 30px;
}
 .beian {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
} 
</style>
