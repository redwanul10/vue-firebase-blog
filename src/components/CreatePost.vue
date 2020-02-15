<template>
  <div class="editor_area">
      <div class="container">
          <div class="row">
              <div class="col-md-8 offset-md-3 offset-1 col-11">
                  <Loader v-if="loading"/>
                  <div v-else class="editor">

                      <div class="featured_image">
                          <input @change="displayImg" type="file" name="image" id="" value="choose image">
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
                      
                      <a class="BUTTON card" @click.prevent="post">Post</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import { VueEditor } from "vue2-editor";
import Loader from './Loading'
//import {Firebase} from '../FirebaseConfig'
import {createPost,uploadPhoto,isAuthenticateUser} from './auth'

export default {
    name:"createPost",
    components:{
        VueEditor,
        Loader
    },
    data(){
        return{
            imgUrl:'',
            content:"",
            title:"",
            loading:false,
            imgFile :null,
            user : null,
            excerpt:''
        }
    },
    created(){
        isAuthenticateUser()
        .then(currnetUser => this.user = currnetUser)
        .catch(()=>this.$router.push('/login'))
    },
    methods:{

        displayImg(event){
            this.imgUrl = URL.createObjectURL(event.target.files[0])
            this.imgFile = event.target.files[0]
        },
        post(){
            if(!this.title||!this.content||!this.imgFile||!this.excerpt){
                return alert('Please Fill All The Input')
            }
            console.log('start creating')
            this.loading = true 

            uploadPhoto(this.imgFile)
            .then(url => {
                this.imgUrl = url
                return createPost(this.title,this.content,this.imgUrl,this.user.uid,this.excerpt)
            })
            .then(()=>{
                this.imgUrl  = '',
                this.content = "",
                this.title   = "",
                this.excerpt = ""
                this.loading = false
                alert('posted created successfullly')
            })
            .catch(err=>{
                console.log(err)
                alert('error post not created')
            })
            
        },
        handleImageAdded(file, Editor, cursorLocation, resetUploader){
            console.log(file)
            uploadPhoto(file)
            .then(url=>{
                Editor.insertEmbed(cursorLocation, "image", url);
                resetUploader();
            })
        }
    }
}
</script>

<style>
.editor_area{
    padding:30px 0
}
</style>