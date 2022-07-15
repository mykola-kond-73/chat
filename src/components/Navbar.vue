<template>
    <nav class="nav">
        <router-link to="/" class="router">Home</router-link>
        <router-link to="rooms" class="router">Dialogs</router-link>
    </nav>
</template>

<script>
export default {
}
</script>

<style>
.nav{
    padding: 15px;
}
.router{
    margin: 15px;
    color:white;
    text-decoration: none;
}

</style>