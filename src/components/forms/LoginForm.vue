<template>
    <div class="rootDialog" v-if="isShow" @click="castHandler">
        <div @click.stop class="dialog_content">

            <form @submit.prevent="submitHendler">
                <div>
                    <div>Введіть E-mail</div>
                    <input type="text" name="email" :value="login" @input="(e) => setAuthLogin(e.target.value)">
                </div>
                <div>
                    <div>Введіть пароль</div>
                    <input type="password" name="password" :value="password"
                        @input="(e) => setAuthPassword(e.target.value)">
                </div>
                <button type="submit" name="sendBtn">Надіслати</button>
            </form>

        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
// import {email,required,minLength} from 'vuelidate/lib/validators'

export default {

    computed: {
        ...mapState({
            isShow: state => state.auth.isShowDialogLogin,

            login: state => state.auth.authObj.login,
            password: state => state.auth.authObj.password
        })
    },
    methods: {
        ...mapActions({
            loginAction: 'auth/login'
        }),

        ...mapMutations({
            setAuthLogin: 'auth/setAuthLogin',
            setAuthPassword: 'auth/setAuthPassword',
            setIsShowDialogLogin: 'auth/setIsShowDialogLogin'
        }),

        async submitHendler() {
            const log =await this.loginAction({ login: this.login, password: this.password })
            if (log) {
                this.$router.push('/rooms')
            }
        },

        castHandler() {
            this.setIsShowDialogLogin(false)
            this.setAuthLogin('')
            this.setAuthPassword('')
        }
    }
}
</script>

<style>
.rootDialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}

.dialog_content {
    margin: auto;
    background-color: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}

</style>