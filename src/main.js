import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import CreatePost from './components/CreatePost'
import Edit from './components/Edit'
import Blog from './components/Blog'
import Home from './components/Home'
import NotFound from './components/404'
//import AdminPanel from './components/AdminPanel'
import AuthorPosts from './components/AuthorPosts.vue'
import Dashboard from './components/Dashboard.vue'
import SingleBlogPost from './components/SingleBlogPost.vue'
import ResetPassword from './components/ResetPassword.vue'
import Account from './components/Account.vue'
import VueInitialsImg from 'vue-initials-img';
import VTitle from 'v-title';
import 'v-title/lib/element-ui';

Vue.config.productionTip = false
Vue.use(vueRouter)
Vue.use(VueInitialsImg);
Vue.use(VTitle);

export const EventBus = new Vue();


const router = new vueRouter({
  mode:'history',
  routes:[
    {path:'*',component:NotFound},
    {path:'/',component:Home},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/reset-password',component:ResetPassword},
    {path:'/dashboard',component:Dashboard,
    children:[
      {path:'posts',component:AuthorPosts},
      {path:'create',component:CreatePost},
      {path:'edit/:id',component:Edit},
      {path:'account',component:Account}
    ]
    },
    {path:'/blog',component:Blog},
    {path:'/blog/:id',component:SingleBlogPost}
  ]
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
