<template>
    <div :class="`text-center loadingWrapper ${space?'space':''}`">
        <div class="spinner-border " role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    props:['space'],
    name:'loading',

}
</script>

<style>

</style>