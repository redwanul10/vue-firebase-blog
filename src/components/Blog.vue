<template>
    <div class="blog_area text-left">
        <div class="container">
            <div class="row">

                <Loading v-if="LoadingData" space='true'/>
                
                <div v-else v-for="(post,i) in posts" :key="i" class="col-md-8 offset-md-2 ">
                    <div class=" card mb-3">
                        <img class="card-img-top" :src="post.featuredImage" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{post.title}}</h5>
                            <p class="card-text">{{post.excerpt}}</p>
                            <router-link class="btn btn-primary" :to="`/blog/${post.postId}`">
                            Read More
                            </router-link>
                            <div v-if="post.createdAt">
                                <time-ago long refresh :datetime="post.createdAt"></time-ago>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import {getPost} from './auth'
import Loading from './Loading'
import TimeAgo from 'vue2-timeago'

export default {
    name:"blog",
    components:{Loading,TimeAgo},
    data(){
        return{
            posts:'',
            id:0,
            LoadingData:true
        }
    },
    created(){
        getPost()
        .then(blogPost=>{
            this.posts = blogPost
            this.LoadingData = false
        })
    },
    
}
</script>

<style>

</style>