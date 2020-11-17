Vue.component('autorization-comp', {
    data() {
        return {
            name: '',
            pass: ''
        }
    },
    methods: {
        isLogin() {
            store.commit('userLogin', {name: this.name, pass: this.pass});
        }
    },
    template: `
        <div class="autorization">
            <div class="autorization__form">
                <h1 class="autorization__form_h1">вход в учетную запись</h1>
                <p class="autorization__form_text">имя:</p>
                <input class="autorization__form_name" v-model="name" placeholder="Петр Петров">
                <p class="autorization__form_text">пароль:</p>
                <input class="autorization__form_pass" v-model="pass" placeholder="img/petr-petrov.jpg">
                <button class="autorization__form_button" @click="isLogin">Войти</button>
                <p class="autorization__form_error" v-if="$store.state.autorization.errorLogin">неверные имя и пароль...</p>  
            </div>
        </div>
    `
});