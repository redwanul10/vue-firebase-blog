<template>
    <div class="loggedUsers text-center">
        <div class="row">
            <div class="col-md-3 col-3" v-for="(user,i) in users" :key="i"  >
                <div @click="selectForOneTapLogin(user)" class="user">
                    <img v-if="user.photo" :src="user.photo" alt="">
                    <vue-initials-img 
                    v-else
                    :name="user.name" 
                    v-title="user.name"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"loggedUsers",
    props:['users'],
    methods:{
        selectForOneTapLogin(user){
            console.log(user)
            this.$emit('tapToLogin',user)
        }
    }
}
</script>

<style>

</style>