<template>
  <div class="editor_area">
      <div class="container">
          <div class="row">
              <Loading v-if="LoadingData"/>
              <div v-else class="col-md-8 offset-md-3 offset-1 col-11">
                  <div class="editor">

                      <div class="featured_image">
                          <input @change="previewImg" type="file" name="image" id="">
                          <img :src="imgUrl" alt="">
                      </div>

                      <div class="title text-left">
                          <input v-model="title" type="text" class="titleInput" placeholder="Enter Title">
                      </div>

                      <vue-editor 
                        @image-added="handleImageAdded"
                        useCustomImageHandler
                        v-model="content">
                      </vue-editor>

                      <div class="excerpt">
                          <label for="">Excerpt</label>
                          <textarea v-model="excerpt" name="" id="" cols="30" rows="5"></textarea>
                      </div>
                      
                      <a class="BUTTON card" @click.prevent="update">Update</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import { VueEditor } from "vue2-editor";
import {updatePost,uploadPhoto,getPost} from './auth'
import Loading from './Loading'
//import Loading from './Loading'

export default {
    name:"edit",
    components:{
        VueEditor,
        Loading
    },
    data(){
        return{
            content:"",
            title:"",
            LoadingData:false,
            imgUrl:'',
            imgFile :null,
            user : null,
            excerpt:''
        }
    },
    methods:{
        previewImg(event){
            this.imgUrl = URL.createObjectURL(event.target.files[0])
            this.imgFile = event.target.files[0]
        },
        update(){
            this.LoadingData = true
            
            if(!this.imgFile){

                return updatePost(this.$route.params.id,this.title,this.content,this.imgUrl,this.excerpt)
                .then(()=>{
                    this.LoadingData = false
                    alert('post updated successfully')
                })
                .catch(err=>{
                    console.log(err)
                    this.LoadingData = false
                    alert("error post not updated")
                })

            }else{

                uploadPhoto(this.imgFile)
                .then(url => {
                    this.imgUrl = url
                    return updatePost(this.$route.params.id,this.title,this.content,url)
                })
                .then((res)=>{
                    console.log(res)
                    this.LoadingData = false
                    alert('post updated successfully')
                })
                .catch(err=>{
                    console.log(err)
                    this.LoadingData = false
                    alert("error post not updated")
                })
            }
            
        },
        handleImageAdded(file, Editor, cursorLocation, resetUploader){
            console.log(file)
            uploadPhoto(file)
            .then(url=>{
                Editor.insertEmbed(cursorLocation, "image", url);
                resetUploader();
            })
        },
    },
    created(){
        this.LoadingData = true
        getPost(this.$route.params.id)
        .then(post=>{
            console.log(post)
            this.LoadingData = false
            this.title       = post.title
            this.content     = post.content
            this.imgUrl      = post.featuredImage,
            this.excerpt     = post.excerpt
        })

    }
}
</script>

<style>
.editor_area{
    padding:30px 0
}
</style>