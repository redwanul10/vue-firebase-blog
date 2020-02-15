<template>
  <div class="resetPasswordPage space">
      <div class="container">
          <div class="row">
              <div class="col-md-4 offset-md-4">
                  <div class="loginForm card p-15">

                    <h2 class="mb-4">Reset Password</h2>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" v-model="email" class="form-control" >
                    </div>
                    
                    <Loader v-if="loading"/>
                    <a v-else @click="sendResetLink" class="btn btn-primary">Submit</a>
                    <div v-if="errorMessage" class="error">{{errorMessage}}</div>
                  </div>
                  
                </div>
          </div>
      </div>
  </div>
</template>

<script>

import Loader from './Loading'
import {resetPassword} from './auth'

export default {
    name:"resetPassword",
    components:{Loader},
    data(){
        return{
            loading:false,
            email:"",
            errorMessage:''
        }
    },
    methods:{
        sendResetLink(){
            console.log('link sending')
            this.errorMessage = ""
            if(!this.email) return this.errorMessage = "Please Enter Your Email Address"
            this.loading = true
            resetPassword(this.email)
            .then(()=>{
                console.log('password reset link sended')
                this.loading = false
                this.email = ''
                window.alert('password reset link sended')
            })
            .catch(err=>{
                console.log(err)
                this.loading = false
                this.errorMessage = err.message
            })
        }
    },
}
</script>

<style>

</style>