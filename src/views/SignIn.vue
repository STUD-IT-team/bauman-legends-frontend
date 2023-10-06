<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

.root-signin
  width 100%
  height 100%
  .form
    width calc(100% - 40px)
    margin auto
    background-color colorBg
    border-radius borderRadiusM
    padding-top 10px
    padding-left 20px
    padding-right 20px
    padding-bottom 20px
    margin 20px 20px
    text-align center
    font-large()
    font-bold()
    color colorText1
    .register-link
      text-decoration none
      text-align left
    .register-button
      button()
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
        :fields="fields"
        submitText="Вход"
        @success="signin"
      ></FormWithErrors>
      <router-link class="register-link" :to="{name: 'register'}">
        <button class="register-button">Зарегистрироваться</button>
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


export default {
  components: {FormWithErrors},
  data() {
    return {
      fields: {
        email: {
          name: 'email',
          type: 'text',
          placeholder: 'Почта',
          validationRegExp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
        password: {
          name: 'password',
          type: 'password',
          placeholder: 'Пароль',
          validationRegExp: /^.{6,}$/,
        }
      }
    }
  },

  methods: {
    signin(data) {
      this.$api.login(data.email, data.password, detectBrowser(), detectOS());
    }
  }
}
</script>

