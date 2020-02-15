<template>
  <div class="author_posts space">
      <div class="container">
          <div class="row">

            <Loading v-if="LoadingData"/>
            
            <div v-if="noBlogPosts" class="text-center full_width">
                <h2 class="small_size">You Have No Posts</h2>
            </div>

            <div v-if="posts.length > 0" class="col-md-8 col-sm-10 offset-md-2 offset-1">
                <div class="text-center">
                    <h2 class="small_size">Your Posts</h2>
                </div>
                <table id="customers">
                    <!-- Table Heading -->
                    <tr>
                        <th>no</th>
                        <th>title</th>
                        <th>id</th>
                        <th></th>
                    </tr>
                    <!-- Table Content -->
                    <tr v-for="(post,i) in posts" v-bind:key="i" >
                        <td>{{i+1}}</td>
                        <td>{{post.title}}</td>
                        <td>{{post.postId}}</td>
                        <td class="edit">
                            <router-link :to="`/dashboard/edit/${post.postId}`" >
                                Edit
                            </router-link>
                            <a @click.prevent="DeletePost(post.postId)" href="">Delete</a>
                        </td>
                    </tr>
                </table>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import {getPost,isAuthenticateUser,deletePost} from './auth'
import Loading from './Loading'

export default {
    name:'authorPost',
    components:{Loading},
    data(){
        return{
            posts:[],
            LoadingData:false,
            emtyPost:false
        }
    },
    computed:{
        noBlogPosts(){
            if((this.emtyPost || this.posts.length === 0) && !this.LoadingData){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        DeletePost(id){
            
            deletePost(id)
            .then(()=>{
                const newPosts = this.posts.filter(post=> post.postId !== id)
                this.posts = newPosts
                alert("post deleted successfully")
            })
            .catch(err=>{
                console.log(err)
                alert("error post not deleted")
            })
        }
    },
    created(){
        this.LoadingData = true

        isAuthenticateUser()
        .then(user => {
            return getPost(user.uid,'byAuthor')
        })
        .then(posts => {
            this.LoadingData = false
            this.posts = posts
            if(posts.length === 0) this.emtyPost = true
        })
        .catch(err=>{
            console.log(err)
            if(err === 'unAuthenticated user'){
                this.$router.push('/login')
            }
        })
       
    }
}
</script>

<style>

</style>