<template>
  <div class="app">
    
        <div>
          <Header />
        </div>


        <LoginForm />
        <RegisterForm />

        <div>
          <router-view></router-view>
        </div>
        <div>

        </div>
      
  </div>
</template>

<script>
import Header from './components/Header.vue';
import LoginForm from './components/forms/LoginForm.vue';
import RegisterForm from './components/forms/RegisterForm.vue';

export default {
  components: {
    Header,
    LoginForm,
    RegisterForm,
  }

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>