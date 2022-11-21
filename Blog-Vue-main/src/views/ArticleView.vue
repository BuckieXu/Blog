<template>
  <!-- 文章显示页 -->
  <div class="articleview">
    <BackTop></BackTop>
    <div class="HeaderBaci">
      <h1>
        {{ article.title }}
        <p class="time">{{ article.time }}</p>
      </h1>
    </div>
    <div class="articlecontent">
      <img class="allbg" src="../assets/img/allbg.png" alt="">
      <div class="posts">
      <el-table v-show="isShow" v-loading="isShow" style="width: 100%"></el-table>
      <mavon-editor
        class="md"
        :ishljs="true"
        :boxShadow="false"
        :value="article.body"
        :subfield="prop.subfield"
        :navigation="true"
        previewBackground='#ffffff'
        :defaultOpen="prop.defaultOpen"
        :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
        codeStyle='tomorrow-night'
      />
      </div>
    </div>
    
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import BackTop from "../components/BackTop";
export default {
  components: { BackTop, VueMarkdown },
  data() {
    return {
      id: "",
      article: {},
      // title: '',
      // body: ''
      isShow:false,
      // 图片地址数组

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

  created() {
    window.scrollTo(0, 0);
    this.$http
      .get(`/articles/${this.$route.params.id}`)
      .then(res => {
        this.article = res.data;
        this.isShow = false;
        // console.log(this.article);
      })
      .catch(err => {
        this.isShow = true;
        console.log(err);
      });
  }
};
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.articleview{
  width: 100%;
  height: 100%;
  
}
.HeaderBaci {
  width: 100%;
  height:100px;
  /* background-size: cover; */
  display: block;
}
.HeaderBaci > h1 {
  padding-top: 0;
  padding-bottom: 20px; 
  padding-left: 12%;
  text-align: left;
  color: #fff;
  font-size: 40px;
}
.articlecontent{
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  
}
.allbg{
  width: 100%;
  height: 100%;
  z-index: -100;
  position: fixed;
  top: 0;
  left: 0;
}
.posts {
  text-align: center;
  border-radius: 30px;
  /* overflow: inherit; */
  display: block;
  width: 80%;
  height: auto !important;
  margin:0 auto;
}
.posts > h4 {
  margin-top: 30px;
}

.md {
  /* height: 1000vh; */
  z-index: 0;
  display: inline;
  background-color: red;

}
.time {
  font-size: 25px;
  color: #fff;
}
/* .v-note-wrapper {
  min-height: 3500px;
} */
.v-note-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
