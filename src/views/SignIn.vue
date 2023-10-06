<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

.root-signin
  width 100%
  height 100%
  .form
    width calc(100% - 40px)
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    padding-top 10px
    margin 20px
    text-align center
    font-large()
    font-bold()
    color colorText1
    .register-link
      text-decoration none
      text-align left
    .register-button
      button-submit()
    .signin-links
      display flex
      width 100%
      margin-top 20px
      font-small()
      text-decoration none
      justify-content space-between
      .signin-by-email-link
        color colorText1
        text-decoration none
      .restore-password-link
        color colorText1
        text-decoration none
</style>

<template>
  <div class="root-signin">
    <div class="form">
      ВХОД<br>
      <FormWithErrors
        ref="form"
        :fields="fields"
        submitText="Вход"
        @success="login"
      ></FormWithErrors>
      <router-link class="register-link" :to="{name: 'register'}">
        <button class="register-button">
          <CircleLoading v-if="loading"></CircleLoading>
          <span v-else>Зарегистрироваться</span>
        </button>
      </router-link>

      <div class="signin-links">
        <router-link class="signin-by-email-link" :to="{name: 'signInByEmail'}">Войти по почте</router-link>
        <router-link class="restore-password-link" :to="{name: 'restorePassword'}">Восстановить пароль</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FormWithErrors from "../components/FormWithErrors.vue";
import {detectBrowser, detectOS} from "../utils/utils";
import CircleLoading from "../components/CircleLoading.vue";


export default {
  components: {CircleLoading, FormWithErrors},
  data() {
    return {
      fields: {
        email: {
          title: 'Электронная почта',
          name: 'email',
          type: 'text',
          placeholder: 'legends@bmstu.ru',
          validationRegExp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
        password: {
          title: 'Пароль',
          name: 'password',
          type: 'password',
          placeholder: '●●●●●●',
          validationRegExp: /^.{6,}$/,
        }
      },
      loading: false,
    }
  },

  methods: {
    async login(data) {
      this.loading = true;
      const {ok} = await this.$api.login(data.email, data.password, detectBrowser(), detectOS());
      this.loading = false;

      if (!ok) {
        this.$refs.form.setError([this.fields.email, this.fields.password], 'Неверные email или пароль');
        return;
      }
      this.$store.dispatch('GET_USER');
      this.$router.push({name: 'profile'});
    }
  }
}
</script>

