<template>
    <div class="card account">
        <div class="photo">
            <div class="user">
                <vue-initials-img :name="letterAvatar || user.name" />
            </div>
        </div>

        <ul>
            <TogggleEdit :result="name"  @change="updateData" name="name"/>
            <TogggleEdit :result="email" @change="updateData" name="email"/>
        </ul>
        
        <Loader v-if="loading"/>
        <a href="" @click.prevent="updateUserProfile" v-if="updateBtn && !loading" class="BUTTON card">Update Profile</a>
        <div v-if="errorMessage" class="error">{{errorMessage}}</div>
        
    </div>
</template>

<script>

import TogggleEdit from './ToggleEditInput'
import {updateProfile,isAuthenticateUser,updateLocalStorage} from './auth'
import Loader from './Loading'
import {EventBus} from '../main'

export default {
    name:'profile',
    props:['user'],
    components:{TogggleEdit,Loader},
    data(){
        return{
            name:"",
            email:"",
            updateBtn:false,
            loading:false,
            errorMessage:'',
            letterAvatar:null,
            uid: null
        }
    },
    methods:{
        enableEdit(type){
            this[type] = !this[type]
            setTimeout(()=>this.$refs[type].focus(),100)
        },
        updateData(value){
            this[value.name] = value.inputValue
            this.updateBtn  = true
        },
        updateUserProfile(){
            
            this.errorMessage = ''
            this.loading = true

            isAuthenticateUser()
            .then((user)=>{
                this.uid = user.uid
                return updateProfile(user,this.email,this.name)
            })
            .then(()=>{
                this.loading = false
                this.updateBtn = false
                this.letterAvatar = this.name
                
                EventBus.$emit('loggedUser',{displayName: this.name})
                updateLocalStorage(this.name,this.email,this.uid)
                alert('Profile Updated Successfully')
            })
            .catch(err=> {
                console.log(err)
                if(err.code === "auth/requires-recent-login"){
                    this.loading = false
                    this.errorMessage = "Please Re-Login to Update Email"
                }
            })
        }
    },
    watch:{
        user(value){
            this.name = value.name
            this.email = value.email
        }
    }
}
</script>

<style>

</style>