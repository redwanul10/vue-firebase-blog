<template>
  <div class="loginPage space">
      <div class="container">
          <div class="row">
              <div class="col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-lg-3 offset-md-2">
                  <div class="loginForm card p-15">
                    <h2 class="mb-4">Login</h2>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" v-model="email" class="form-control" >
                    </div>
                    
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" v-model="password" class="form-control" >
                    </div>

                    <Loader v-if="loading"/>
                    <a v-else @click="login" class="btn btn-primary">Submit</a>
                    <router-link class="text-right" to="/reset-password">Forgot Password?</router-link>
                    <div v-if="errorMessage" class="error">{{errorMessage}}</div>
                  </div>

                    <div v-if="loggedUserList.length > 0" class="card onTapLogin" mt-5>
                        <LoggedUsers v-on:tapToLogin="oneTapLogin" :users="loggedUserList"/>
                    </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import Loader from './Loading'
import {EventBus} from '../main'
import {isAuthenticateUser,loginUser,saveToLocalStorage} from './auth'
import LoggedUsers from './LoggedUsers'


export default {
    name:"login",
    components:{LoggedUsers,Loader},
    data(){
        return{
            loading:false,
            email:"",
            password:"",
            loggedUserList: JSON.parse(localStorage.getItem('users')) || [],
            errorMessage:''
        }
    },
    methods:{
        oneTapLogin(user){
            this.email = user.email
        },
        login(){

            if(!this.password || !this.email){
                this.errorMessage = "please fill all the input"
                this.loading      = false
                return
            }
            
            this.errorMessage = ''
            this.loading = true 

            loginUser(this.email,this.password)
            .then(res=>{
                saveToLocalStorage(res.user)
                this.Loading = false
                EventBus.$emit('loggedUser',res.user)
                this.$router.push('/dashboard/posts')
            })
            .catch(err=>{
                console.log(err)
                this.loading = false
                this.errorMessage = err.message
            })
        },
    },
    created(){
        isAuthenticateUser()
        .then((user)=>{
            EventBus.$emit('loggedUser',user)
            if(user)this.$router.push('/dashboard/posts')
        })
        .catch(err=>console.log(err))
    }
}
</script>

<style>

</style>