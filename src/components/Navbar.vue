<template>

    <nav ref="menu" class="card text-center">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="https://images-na.ssl-images-amazon.com/images/I/61np1wbr9pL.png" alt="">
            </a>
        
            <ul class="mt-2 mt-lg-0">
                <li v-for="(item,i) in items" :key="i" class="nav-item active">
                    <router-link 
                    class="nav-link"
                    :to="item.path">
                        {{item.name}}
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>


</template>

<script>

export default {
    name:"Navbar",
    components: {
        
    },
    created(){
        window.addEventListener('scroll',()=>{
            const menu = this.$refs.menu
            if(pageYOffset > 0){
                menu.nextElementSibling.style.marginTop = `${menu.clientHeight}px`
                menu.classList.add('fixed')
            }else{
                menu.nextElementSibling.style.marginTop = `0px`
                menu.classList.remove('fixed')
            }
        })
    },
    data(){
        return{
            isFixed:true,
            items:[
                {name:"Home",path:"/"},
                {name:"blog",path:"/blog"},
                {name:"Login",path:"/login"},
                {name:"Register",path:"/register"},
            ]
        }
    }
}
</script>

<style>

</style>