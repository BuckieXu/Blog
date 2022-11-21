<template>
  <!-- 导航栏组件 -->
  <el-header class="navigation" id="header">
    <el-menu router class="el-menu-demo" mode="horizontal">
      <router-link to="/admin-login">
        <img class="logo" src="../assets/img/1000.jpg" alt="" />
      </router-link>
      <el-menu-item class="el-icon-s-home nav" index="/index">首页</el-menu-item>
      <el-menu-item class="el-icon-s-operation nav" index="/category"
        >分类</el-menu-item
      >
      <el-menu-item class="el-icon-picture nav" index="/photoalbum"
        >相册</el-menu-item
      >
      <!-- <el-menu-item class="el-icon-s-custom" index="/friendchain"
        >友链</el-menu-item
       > -->
       <el-menu-item class="el-icon-bangzhu nav" index="/resource"
        >资源</el-menu-item
      >
      <el-menu-item class="el-icon-chat-dot-round nav" index="/message"
        >留言板</el-menu-item
      >
      <el-menu-item class="el-icon-info nav" index="/info">关于</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {

}
</script>

<style scoped>
.el-menu-demo {
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: ; */
  /* background-image: linear-gradient(to right, #dd3e54, #0083b0); */
  background-image:linear-gradient(to right,  rgba(170, 224, 238, 0.5) , rgba(130, 0, 222, 0.5));
  opacity: 0.7;
  transition: 0.6s;
}
.search {
  width: 20%;
}
.logo {
  position: relative;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 2em;
  letter-spacing: 2px;
  transition: 0.6s;
}

.el-menu-item {
  font-size: 17px;
}
#header {
  /* position: fixed; */
  padding: 0;
  position: relative;
}
.el-menu.el-menu--horizontal {
  border: none;
}
.el-menu--horizontal>.el-menu-item {
  color:#000
}
.nav{
  color: #fff;
}
</style>
