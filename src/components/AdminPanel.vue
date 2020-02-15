<template>
    <div :class="`adminPanel card ${adminPanel?'toggleAdminBar':''}`" 
    v-if="this.$route.path.indexOf('/dashboard') !== -1"
    >
    <div class="barIcon" @click="toggleAdminPanel">
        <i v-if="!adminPanel" class="fa fa-bars" aria-hidden="true"></i>
        <i v-else class="fa fa-times" aria-hidden="true"></i>
    </div>
    
    <div class="text-center m-b-5 user circle_border">
        <vue-initials-img :name="currentUser.displayName"/>
    </div>
    <ul class="list-group">
        <li class="list-group-item">
            <router-link to="/dashboard/posts"><i class="fa fa-pencil-square" aria-hidden="true"></i>Posts</router-link>
        </li>
        <li class="list-group-item">
            <router-link to="/dashboard/create"><i class="fa fa-plus-circle" aria-hidden="true"></i>Create</router-link>
        </li>
        <li class="list-group-item">
            <router-link to="/dashboard/account"><i class="fa fa-cog" aria-hidden="true"></i>Account</router-link>
        </li>
        <li class="list-group-item">
            <a href="" @click.prevent="logout" ><i class="fa fa-sign-out" aria-hidden="true"></i>Log Out</a>
        </li>
    </ul>
    </div>
</template>

<script>

import {logOutUser} from './auth'
import {EventBus} from '../main'

export default {
    name:'adminPanel',
    data(){
        return{
            adminPanel:false,
            currentUser:{}
        }
    },
    created(){
        EventBus.$on('loggedUser',user=> {
            console.log(user)
            this.currentUser = user
        })
    },
    methods:{
        logout(){
            logOutUser()
            .then(()=> {
                this.$router.push('/login')
            })
        },
        toggleAdminPanel(){
            this.adminPanel = !this.adminPanel
        }
    }
}
</script>

<style>

</style>