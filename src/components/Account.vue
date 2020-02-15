<template>
  <div class="accountPage space">
      <div class="container">
          <div class="row">
              <div class="col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-lg-3 offset-md-2 offset-1 col-11">
                  <Profile :user="{name,email}"/>
                  <UpdatePassForm/>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {isAuthenticateUser} from './auth'
import Profile from './Profile'
import UpdatePassForm from './UpdatePassForm'

export default {
    name:'account',
    components:{Profile,UpdatePassForm},
    data(){
        return{
            name:'',
            email:'',
        }
    },
    created(){
        isAuthenticateUser()
        .then((user)=>{
            this.name  = user.displayName,
            this.email = user.email
        })
        .catch(err=>{
            if(err === 'unAuthenticated user')
            this.$router.push('/login')
        })
    },
}
</script>

<style>

</style>