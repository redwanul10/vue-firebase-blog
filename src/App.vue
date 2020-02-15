<template>
  <div id="app">
    <Navbar></Navbar>
      <div></div>
      <router-view></router-view>
    <AdminPanel/>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
import AdminPanel from './components/AdminPanel'
import './style.css'
import {isAuthenticateUser} from './components/auth'
import {EventBus} from './main'

export default {
  name: 'app',
  components: {
    Navbar,
    AdminPanel
  },
  created(){
    isAuthenticateUser()
    .then(user => {
      EventBus.$emit('loggedUser',user)
    })
    .catch(err=>console.log(err))
  }
}
</script>

<style>

</style>
