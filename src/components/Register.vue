<template>
  <div class="register">
      <div class="container">
          <div class="row">
              <div class="col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-lg-3 offset-md-2">
                  <div class="registerForm card p-15">
                      <h2 class="mb-4">Register</h2>
                      
                     <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" v-model="name" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" v-model="email" class="form-control" >
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" v-model="password" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" v-model="confirmPassword" class="form-control">
                    </div>

                    <Loader v-if="loading"/>
                    <a v-else @click="register" class="btn btn-primary">Submit</a>
                    <div v-if="errorMessage" class="error">{{errorMessage}}</div>
                  
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

//import {Firebase} from '../FirebaseConfig'
import {registerUser} from './auth'
import Loader from './Loading'

export default {
    name:"register",
    components:{Loader},
    data(){
        return{
            email:"",
            password:"",
            confirmPassword:"",
            name:"",
            loading:false,
            errorMessage:''
        }
    },
    methods:{
        register(){
            this.errorMessage = ''

            if(!this.email || !this.password || !this.confirmPassword || !this.name){
                this.errorMessage = "please fill all the input"
                this.loading      = false
                return
            }

            if(this.password !== this.confirmPassword){
                this.errorMessage = "password did not matched"
                this.loading      = false
                return
            }

            this.loading = true

            registerUser(this.name,this.email,this.password)
            .then(()=>{
                console.log("user register successfully")
                this.loading = false
                this.$router.push('/dashboard/posts')
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