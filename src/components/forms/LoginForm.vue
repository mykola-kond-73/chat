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
                <div v-if="error">
                    <Error :error="error" />
                </div>
                <Load v-if="!isDoneLogin" />
                <button v-else type="submit" name="sendBtn">Надіслати</button>
            </form>

        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Error from '../errors/Error.vue';
import Load from '../Load.vue';
// import {email,required,minLength} from 'vuelidate/lib/validators'

export default {
    components: { Error, Load },

    computed: {
        ...mapState({
            isShow: state => state.auth.isShowDialogLogin,
            isDoneLogin: state => state.auth.isDoneLogin,
            login: state => state.auth.authObj.login,
            password: state => state.auth.authObj.password,
            error: state => state.error.loginError
        })
    },
    methods: {
        ...mapActions({
            loginAction: "auth/login"
        }),
        ...mapMutations({
            setAuthLogin: "auth/setAuthLogin",
            setAuthPassword: "auth/setAuthPassword",
            setIsShowDialogLogin: "auth/setIsShowDialogLogin",

            setLoginError: 'error/setLoginError'
        }),
        async submitHendler() {
            const log = await this.loginAction({ login: this.login, password: this.password });
            if (log) {
                this.$router.push("/rooms");
            }
        },
        castHandler() {
            this.setIsShowDialogLogin(false);
            this.setAuthLogin("");
            this.setAuthPassword("");
            this.setLoginError(null)
        }
    },
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