import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import IndexView from '../views/IndexView.vue'
import ArticleView from '../views/ArticleView.vue'
import adminLogin from '../views/admin/adminLogin.vue'
import adminReg from '../views/admin/adminReg.vue'
import adminArticle from '../views/admin/adminArticle.vue'
import CreateArticle from '../views/admin/CreateArticle.vue'
import ListArticle from '../views/admin/ListArticle.vue'
import EditArticle from '../views/admin/EditArticle.vue'
import MsgView from '../views/MsgView.vue'
import adminMessage from '../views/admin/adminMessage.vue'
import Info from '../views/InfoView.vue'
import FriendsChain from '../views/FriendsChain.vue'
import Category from '../views/Category.vue'
import PhotoAlbum from '../views/PhotoAlbum.vue'
import Resource from '../views/Resource.vue'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/index'
    }, {
      path: '/index',
      component: IndexView,
      meta: {
        headerAlive: false,
        keepAlive: true
      }
    }, {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        headerAlive: true,
        keepAlive: true
      }
    },{
      path: '/message',
      name: 'message',
      component: MsgView,
      meta: {
        headerAlive: true,
        keepAlive: true
      }
    }, {
      path: '/photoalbum',
      name: 'photoalbum',
      component: PhotoAlbum,
      meta: {
        headerAlive: true,
        keepAlive: false
      }
    }, {
      path: '/friendchain',
      name: 'friendchain',
      component: FriendsChain,
      meta: {
        headerAlive: true,
        keepAlive: true
      }
    }, {
      path: '/resource',
      name: 'resource',
      component: Resource,
      meta: {
        headerAlive: true,
        keepAlive: true
      }
    },{
      path: '/articleview/:id',
      component: ArticleView,
      meta: {
        headerAlive: true,
        keepAlive: false
      }
    }, {
      path: '/info',
      name: 'info',
      component: Info,
      meta: {
        headerAlive: true,
        keepAlive: true
      }
    }, {
      path: '/admin-login',
      name: 'login',
      component: adminLogin,
      meta: {
        keepAlive: false
      }
    }, {
      path: '/admin-reg',
      name: 'reg',
      component: adminReg,
      meta: {
        keepAlive: false
      }
    }, {
      path: '/admin-article',
      component: adminArticle,
      children: [{
        path: '',
        redirect: 'index'
      }, {
        path: 'create',
        name: 'create-article',
        component: CreateArticle
      }, {
        path: 'index',
        name: 'list-article',
        component: ListArticle
      }, {
        path: ':id/edit',
        name: 'edit-article',
        component: EditArticle
      }, {
        path: 'message',
        name: 'message',
        component: adminMessage
      }]
    }]
})
