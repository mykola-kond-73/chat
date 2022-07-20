<template>
    <div class="root">
        <p class="p">{{error.message}}</p>
        <p class="p">{{error.code}}</p>
    </div>
</template>

<script>
import {ErrorProps} from '@/utils/errorPropsClass'

export default {
    props:{
        error:{
            type:ErrorProps,
            required:true,
            validater:(value)=>{
                if(
                    (value.message && typeof value.message =='string')&&
                    (value.code && typeof value.code=='number')
                    ) return true
                else return false
            }
        }
    }
}
</script>

<style scoped>
.root{
    margin: 7px;
}
.p{
    padding: 5px;


    color:darkred;
    font-weight: 500;
    font-style: italic;
}
</style>