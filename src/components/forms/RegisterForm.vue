<template>
    <div class="rootDialog" v-if="isShow" @click="castHandler">
        <div @click.stop class="dialog_content">

            <form @submit.prevent="submitHendler">
                <div>
                    <div>Введіть E-mail</div>
                    <input type="text" name="email" :value="email" @input="(e) => setRegisterEmail(e.target.value)">
                </div>

                <div>
                    <div>Введіть ім'я</div>
                    <input type="text" name="username" :value="name" @input="(e) => setRegisterName(e.target.value)">
                </div>

                <div>
                    <div>Введіть пароль</div>
                    <input type="password" name="password" :value="password"
                        @input="(e) => setRegisterPassword(e.target.value)">
                </div>
                <div>
                    <div>Повторіть пароль</div>
                    <input type="password" name="repeatPassword" :value="repeatPassword"
                        @input="(e) => setRepeatPassword(e.target.value)">
                </div>
                <div v-if="error">
                    <Error :error="error" />
                </div>
                <Load v-if="!isDoneRegister" />
                <button v-else type="submit" name="sendBtn">Зареєструватися</button>
            </form>

        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Error from '../errors/Error.vue';
import Load from '../Load.vue';

export default {
    components: { Error, Load },
    data() {
        return {
            repeatPassword: ''
        }
    },
    computed: {
        ...mapState({
            isShow: state => state.auth.isSchowDialogRegister,

            email: state => state.auth.registerObj.email,
            name: state => state.auth.registerObj.name,
            password: state => state.auth.registerObj.password,

            isDoneRegister: state => state.auth.isDoneRegister,
            error: state => state.error.registerError
        })
    },
    methods: {
        ...mapActions({
            register: 'auth/register'
        }),

        ...mapMutations({
            setRegisterEmail: 'auth/setRegisterEmail',
            setRegisterName: 'auth/setRegisterName',
            setRegisterPassword: 'auth/setRegisterPassword',
            setIsShowDialogRegister: 'auth/setIsShowDialogRegister',

            setRegisterError: 'error/setRegisterError'
        }),

        submitHendler() {
            if (this.password == this.repeatPassword) {
                this.register({
                    email: this.email,
                    name: this.name,
                    password: this.password
                })
            } else {
                console.log('паролі не співпадають')
            }
            this.repeatPassword = ''
        },

        castHandler() {
            this.setIsShowDialogRegister(false)
            this.setRegisterEmail('')
            this.setRegisterName('')
            this.setRegisterPassword('')
            this.repeatPassword = ''
            this.setRegisterError(null)
        },

        setRepeatPassword(data) {
            this.repeatPassword = data
        },
    }
}
</script>

<style scoped>
</style>