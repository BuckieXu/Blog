<template>
  <div class="ResourceView">
    <div class="addNavgationBox" v-show="isshow">
      <div class="addNavgation">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="资源类别">
            <el-select v-model="form.ResourceNo" placeholder="请选择资源类别">
              <el-option label="01-图片资源" value="01"></el-option>
              <el-option label="02-PPT模板" value="02"></el-option>
              <el-option label="03-JavaScript-特效" value="03"></el-option>
              <el-option label="04-web技术-优秀文章博客" value="04"></el-option>
              <el-option label="05-素材 · 工具" value="05"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网站logo">
            <el-input v-model="form.ResourceLogo"></el-input>
          </el-form-item>
          <el-form-item label="网站名称">
            <el-input v-model="form.ResourceName"></el-input>
          </el-form-item>
          <el-form-item label="网站URL">
            <el-input v-model="form.ResourceLink"></el-input>
          </el-form-item>
          <el-form-item label="进行描述">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>

          <el-form-item class="SubmitAndCancel">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="Cancel">完成</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <img class="allbg" src="../assets/img/allbg.png" alt />
    <!-- 操作按钮 -->
    <div class="handleResource">
      <el-button type="success" plain class="handle" @click="addNavgation">添加导航</el-button>
      <el-button type="success" plain class="handle" @click="edit">编辑网址</el-button>
    </div>
    <!-- 每一类资源盒子 -->
    <div class="ResourceTypeBox" v-for="(Item,index) in resource" :key="index">
      <div class="ResourceTypeName">
        <img src="../assets/img/icontype.png" alt />
        <p>{{Type[index]}}</p>
      </div>
      <div class="ResourcePlay">
        <!-- 资源列表 -->
        <ul class="ResourceList">
          <li class="ResourceItem" v-for="resdata in Item" :key="resdata._id">
            <img :src="resdata.ResourceLogo" alt />
            <div class="resourceName">
              <a class :href="resdata.ResourceLink">{{resdata.ResourceName}}</a>
              <button class="delete" v-show="isdelete" @click="deleteNavgation(resdata._id)">删除</button>
              <p>{{resdata.describe}}</p>
              <ul class="ResourceIcon">
                <li>分享</li>
                <li>高清</li>
                <li>动漫</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ResourceType: [],
      resource: [],
      Type: [
        "图片资源",
        "PPT模板",
        "JavaScript-特效",
        "web技术-优秀文章博客",
        "素材 · 工具"
      ],
      isshow: false,
      isdelete: false,
      pageLocation:'',
      form: {
        ResourceNo: "",
        ResourceLogo: "",
        ResourceName: "",
        ResourceLink: "",
        describe: "",
        isDelete: false
      }
    };
  },
  mounted() {
    this.getAllResType();
  },
  methods: {
    // 获取所有资源类型
    getAllResType() {
      this.$http
        .get("/resource/getAllResType")
        .then(res => {
          this.ResourceType = res.data;
          let result = this.ResourceType;
          for (var i in result) {
            this.getResourceByType(result[i].ResourceNo);
          }
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
    getResourceByType(ResourceNo) {
      // 通过类型获取资源
      this.$http
        .get(`/resource/getAllResourceByNo/${ResourceNo}`)
        .then(res => {
          this.resource.push(res.data);
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
    onSubmit() {
      // 向服务器发起请求，添加资源
      this.$http
        .post("/addResource", this.form)
        .then(res => {
          this.$message({
            message: "资源添加成功",
            type: "success"
          });
          this.resource=[]
          this.getAllResType();
          console.log(res);
        })
        .catch(err => {
          this.$message({
            message: "请求超时，请稍后重试",
            type: "error",
            offset: 100
          });
          console.log(err);
        });
        this.isshow=false
        this.Move()
    },
    // //停止页面滚动
    stopMove() {
      let scrollTop = window.scrollY; //滚动的高度；
      // console.log(scrollTop)
      this.pageLocation = scrollTop;
      document.body.style.position = "fixed";
      document.body.style.top = "-" + scrollTop + "px";
    },
    // //开启页面滚动
    Move() {
      document.body.style.position = "static";
      window.scrollTo(0, this.pageLocation);
    },

    addNavgation() {
      this.isshow = true;
      this.stopMove()
    },
    Cancel() {
      this.isshow = false;
      this.Move()
    },
    // 点击编辑网址
    edit() {
      this.isdelete = true;
    },
    // 点击删除
    deleteNavgation(id) {
      this.$http
        .delete(`/resource/deleteResource/${id}`)
        .then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.resource=[]
          this.getAllResType();
          // this.$router.push("/resource");
          // console.log(res);
        })
        .catch(err => {
          this.$message({
            message: "请求超时，请稍后重试",
            type: "error",
            offset: 100
          });
          console.log(err);
        });
      this.isdelete = false;
    }
  }
};
</script>

<style>
.addNavgationBox {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-image: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.addNavgation {
  background: white;
  width: 30%;
  height: 50%;
  top: 30%;
  left: 35%;
  padding: 20px;
}
.SubmitAndCancel {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
/* 删除按钮 */

.handleResource {
  width: 100%;
  padding: 20px 40px;
}
ul li {
  list-style: none;
}
a {
  text-decoration: none;
}
.ResourceView {
  width: 100%;
  height: 100%;
  margin-top: 0;
}
.ResourceTypeBox {
  padding: 0 40px;
  width: 100%;
  padding: 10px 20px;
}
.ResourceTypeName {
  width: 100%;
  display: flex;
  height: 40px;
  justify-content: flex-start;
}
.ResourceTypeName img {
  width: 60px;
  height: 100%;
  border-radius: 20px;
  color: aliceblue;
}
.ResourceTypeName p {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  margin-left: 10px;
  color: white;
}
.ResourcePlay {
  width: 100%;
  margin-top: 10px;
}
.ResourceList {
  width: 100%;
  display: flex;
  /* justify-content: space-arou/nd; */
  flex-wrap: wrap;
}
.ResourceItem {
  background-color: azure;
  width: 18%;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  margin-left: 16px;
  margin-top: 10px;
  min-width: 200px;
  min-height: 100px;
  /* background-color: black; */
  opacity: 0.8;
}
.delete {
  width: 40px;
  height: 20px;
  background: red;
  color: white;
  border: none;
  float: right;
}
.ResourceItem img {
  width: 20%;
  height: 50%;
  border-radius: 50%;
  margin-top: 5%;
  margin-left: 5%;
  background-size: 50% 50%;
}
.resourceName {
  width: 60%;
  height: 100%;
  padding: 5px;
  margin-left: 10px;
}
.resourceName a {
  height: 30%;
  font-size: 16px;
  font-weight: bolder;
}
.resourceName p {
  width: 100%;
  height: 40%;
  flex-flow: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  font-size: 12px;
  line-height: 20px;
}
.ResourceIcon {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 20%;
  margin-top: 5%;
}
.ResourceIcon li {
  width: 25%;
  height: 100%;
  font-size: 12px;
  background-color: blanchedalmond;
  text-align: center;
  border-radius: 30%;
  line-height: 20px;
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
</style>