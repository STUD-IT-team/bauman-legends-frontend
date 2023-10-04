<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

border = 1px solid colorBorder

.root-signin
  width 100%
  height 100%
  .form
    border border
    border-radius borderRadiusL
    padding-left 20px
    padding-right 20px
    padding-bottom 20px
    margin 20px 20px
    .register-link
      text-align left
    .register-button
      button-submit()
    .signin-links
      display flex
      width 100%
      justify-content space-between
      .signin-by-email-link
      .restore-password-link
        font-small-extra()
</style>

<template>
  <div class="root-signin">
    <div class="form">
      <FormWithErrors
        :fields="fields"
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
          title: 'E-mail',
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

