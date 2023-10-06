<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

bg = colorBgDark

.root-register
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
    margin-top 20px
    text-align center
    font-large()
    font-bold()
    color colorText1
    .signin-link
      text-align left
      text-decoration none
    .signin-button
      button()
</style>

<template>
  <div class="root-register">
    <div class="form">
      РЕГИСТРАЦИЯ<br>
      <FormWithErrors :fields="fields"
                      submitText="Зарегистрироваться"
                      @success="register"
      ></FormWithErrors>
      <router-link class="signin-link" :to="{name: 'login'}">
        <button class="signin-button">Войти</button>
      </router-link>
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
        name: {
          name: 'name',
          type: 'text',
          placeholder: 'ФИО',
          validationRegExp: /^[а-я]+ [а-я]+( [а-я]+)?$/i,
        },
        group: {
          name: 'group',
          type: 'text',
          placeholder: 'Учебная группа',
          validationRegExp: /^(иу|ибм|мт|см|бмт|рл|э|рк|фн|л|юр|сгн|вуц|гуимц|фмоп|фоф|исот|ркт|ак|пс|рт|лт)\d\d?-1\d[СМБ]$/i,
          prettifyResult: (str) => str.toUpperCase(),
        },
        email: {
          name: 'email',
          type: 'text',
          placeholder: 'Электронная почта',
          validationRegExp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          prettifyResult: (str) => str.toLowerCase(),
        },
        phone: {
          name: 'phone',
          type: 'text',
          placeholder: 'Номер телефона',
          validationRegExp: /^((\+7)|8)[-\s.]?((\(\d\d\d\))|(\d\d\d))[-\s.]?\d\d\d[-\s.]?\d\d[-\s.]?\d\d$/,
          prettifyResult: (str) => str.replace('+7', '8').replace('-', '').replace('(', '').replace(')', ''),
        },
        tg:{
          name: 'telegram',
          type: 'text',
          placeholder: 'Ссылка на Telegram',
          validationRegExp: /^((https:\/\/t\.me\/)|@)?\w{5,}$/,
          prettifyResult: (str) => '@' + str.replace('https://t.me/', '').replace('@', ''),
          // info: 'В любом формате',
        },
        vk: {
          name: 'vk',
          type: 'text',
          placeholder: 'Ссылка на Вконтакте',
          validationRegExp: /^(https:\/\/vk\.com\/)?\w+$/,
          prettifyResult: (str) => str.replace('https://vk.com/', ''),
          // info: 'В любом формате',
        },
        password: {
          name: 'password',
          type: 'password',
          placeholder: 'Пароль',
          validationRegExp: /^.{6,}$/,
          // info: 'Минимум 6 символов'
        }
      }
    }
  },

  methods: {
    register(data) {
      this.$api.register(data.name, data.group, data.tg, data.vk, data.email, data.phone, data.password, detectBrowser(), detectOS());
    }
  }
}
</script>

