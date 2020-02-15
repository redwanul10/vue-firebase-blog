<template>
    <div class="singleBlog">
        <div class="container">
            <Loading v-if="LoadingData" space='true'/>
            <div v-else class="card">
                <div class="featuredImage">
                    <img :src="post.featuredImage" alt="">
                </div>
                <div class="col-md-10 offset-md-1">
                    <h1>{{post.title}}</h1>
                    <div class="content" v-html="post.content"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {getPost} from './auth'
import Loading from './Loading'
export default {
    name:'SingleBlogPost',
    components:{Loading},
    data(){
        return{
            post:{},
            LoadingData:true
        }
    },
    created(){
        getPost(this.$route.params.id)
        .then(blogPost=>{
            if(blogPost === null){
                this.$router.push('/404')
            }
            this.post = blogPost
            this.LoadingData = false
        })
    },
}
</script>

<style>

</style>