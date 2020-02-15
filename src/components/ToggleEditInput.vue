<template>
    <li>
        <div v-if="!show">{{inputProps}}</div>
        <input @change="changeHandelar" @blur="disableEdit" type="text" v-model="inputProps" ref="input" :class="`form-control ${!show?'hide':''}`" >
        <i @click="enableEdit" class="fa fa-pencil" aria-hidden="true"></i>
    </li>  
</template>

<script>
export default {
    name:'toggleEditInput',
    props:['result','name','test'],
    data(){
        return{
            show:false,
        }
    },
    computed:{
        inputProps:{
            set(value){
                return value
            },
            get(){
                return this.result
            }
        }
    },
    methods:{
        changeHandelar(event){
            this.$emit('change',{
                inputValue : event.target.value,
                name       : this.name
            })
        },
        enableEdit(){
            this.show = true
            setTimeout(()=> this.$refs.input.focus(),100)
        },
        disableEdit(){
             this.show = false
        }
    }
}
</script>

<style>

</style>