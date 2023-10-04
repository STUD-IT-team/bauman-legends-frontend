<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

bg = colorBgDark

.root-register
  width 100%
  height 100%
  .form
    border-radius borderRadiusL
    padding-left 20px
    padding-right 20px
    padding-bottom 20px
    margin 20px 20px
    background bg
    .signin-link
      text-align left
    .signin-button
      button-submit()
</style>

<template>
  <div class="root-register">
    <div class="form">
      <FormWithErrors :fields="fields"
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
          title: 'Имя',
          name: 'name',
          type: 'text',
          placeholder: 'Иванов Иван Иванович',
          validationRegExp: /^[а-я]+ [а-я]+( [а-я]+)?$/i,
        },
        group: {
          title: 'Учебная группа',
          name: 'group',
          type: 'text',
          placeholder: 'ХХх-ххХ',
          validationRegExp: /^(иу|ибм|мт|см|бмт|рл|э|рк|фн|л|юр|сгн|вуц|гуимц|фмоп|фоф|исот|ркт|ак|пс|рт|лт)\d\d?-1\d[СМБ]$/i,
          prettifyResult: (str) => str.toUpperCase(),
        },
        tg:{
          title: 'Telegram',
          name: 'telegram',
          type: 'text',
          placeholder: '@legends_bmstu',
          validationRegExp: /^((https:\/\/t\.me\/)|@)?\w{5,}$/,
          prettifyResult: (str) => '@' + str.replace('https://t.me/', '').replace('@', ''),
          info: 'В любом формате',
        },
        vk: {
          title: 'VK',
          name: 'vk',
          type: 'text',
          placeholder: 'https://vk.com/legends_bmstu',
          validationRegExp: /^(https:\/\/vk\.com\/)?\w+$/,
          prettifyResult: (str) => str.replace('https://vk.com/', ''),
          info: 'В любом формате',
        },
        email: {
          title: 'E-mail',
          name: 'email',
          type: 'text',
          placeholder: 'legends@bmstu.ru',
          validationRegExp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          prettifyResult: (str) => str.toLowerCase(),
        },
        phone: {
          title: 'Телефон',
          name: 'phone',
          type: 'text',
          placeholder: '8-(123)-456-78-90',
          validationRegExp: /^((\+7)|8)[-\s.]?((\(\d\d\d\))|(\d\d\d))[-\s.]?\d\d\d[-\s.]?\d\d[-\s.]?\d\d$/,
          prettifyResult: (str) => str.replace('+7', '8').replace('-', '').replace('(', '').replace(')', ''),
        },
        password: {
          title: 'Пароль',
          name: 'password',
          type: 'password',
          placeholder: '●●●●●●',
          validationRegExp: /^.{6,}$/,
          info: 'Минимум 6 символов'
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

