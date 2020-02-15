<template>
    <div class="loginForm card p-15 mb-5">
        <h2 class="mb-4">Change Password</h2>

        <div class="form-group">
            <label for="exampleInputEmail1">Password</label>
            <input type="password" v-model="password" class="form-control" >
        </div>

        <div class="form-group">
            <label for="exampleInputEmail1">New Password</label>
            <input type="password" v-model="newPassword" class="form-control" >
        </div>

        <div class="form-group">
            <label for="exampleInputEmail1">Confirm New Password</label>
            <input type="password" v-model="confirmNewPassword" class="form-control" >
        </div>

        <Loader v-if="loading"/>
        <a v-else @click.prevent="changePassword" class="btn btn-primary">Submit</a>
        <div v-if="errorMessage" class="error">{{errorMessage}}</div>
    </div>          
</template>

<script>
import Loader from './Loading'
import {
    reAuthenticateUser,
    isAuthenticateUser,
    updatePassword
    } from './auth'

export default {
    name:'updatePassword',
    components:{Loader},
    data(){
        return{
            password:'',
            newPassword:'',
            confirmNewPassword:'',
            loading : false,
            errorMessage:''
        }
    },
    methods:{
        changePassword(){
            let currentUser = {}

            if(!this.password||!this.newPassword||!this.confirmNewPassword){
                return this.errorMessage = "Please Fill All The Input"
            }

            if(this.newPassword !== this.confirmNewPassword){
                return this.errorMessage = "Password Did Not Matched"
            }

            this.loading      = true
            this.errorMessage = ''

            isAuthenticateUser()
            .then(user=>{
                currentUser = user
                return reAuthenticateUser(user,user.email,this.password)
            })
            .then(()=>{
                console.log('reAuthenticated successfully')
                return updatePassword(currentUser,this.newPassword)
            })
            .then(()=>{
                console.log('password updated successfully')
                this.loading            = false
                this.password           = ''
                this.newPassword        = ''
                this.confirmNewPassword = ''
            })
            .catch(err=>{
                console.log(err)
                this.loading = false
                this.errorMessage = err.message
            })
        }
    }
}
</script>

<style>

</style>