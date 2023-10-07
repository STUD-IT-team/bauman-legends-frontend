<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

bg = colorBgDark

.root-register
  width 100%
  padding 20px
  .form
    max-width 600px
    margin 20px auto
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    padding-top 10px
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
      <FormWithErrors
        ref="form"
        :fields="fields"
        submitText="Зарегистрироваться"
        @success="register"
        :loading="loading"
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
import CircleLoading from "../components/CircleLoading.vue";


export default {
  components: {CircleLoading, FormWithErrors},
  data() {
    return {
      fields: {
        name: {
          title: 'ФИО',
          name: 'name',
          type: 'text',
          placeholder: 'Иванов Иван Иванович',
          validationRegExp: /^[а-я]+ [а-я]+( [а-я]+)?$/i,
        },
        group: {
          title: 'Учебная группа',
          name: 'group',
          type: 'text',
          placeholder: 'ОЭ2-11',
          validationRegExp: /^(иу|ибм|мт|см|бмт|рл|э|рк|фн|л|юр|сгн|вуц|гуимц|уц|фмоп|фоф|исот|ркт|ак|пс|рт|лт|оэ|оэп)\d\d?и?-1\d[АМБ]?$/i,
          prettifyResult: (str) => str.toUpperCase(),
        },
        tg:{
          title: 'Telegram',
          name: 'telegram',
          type: 'text',
          placeholder: '@legends_bmstu',
          validationRegExp: /^((https:\/\/)?(t\.me\/)|@)?\w{5,}$/,
          prettifyResult: (str) => '@' + str.replace('https://', '').replace('t.me/', '').replace('@', ''),
          info: 'В любом формате',
        },
        vk: {
          title: 'VK',
          name: 'vk',
          type: 'text',
          placeholder: 'vk.com/legends_bmstu',
          validationRegExp: /^(https:\/\/)?(vk\.com\/|@)?\w+$/,
          prettifyResult: (str) => str.replace('https://', '').replace('vk.com/', '').replace('@', ''),
          info: 'В любом формате',
        },
        email: {
          title: 'Электронная почта',
          name: 'email',
          type: 'text',
          placeholder: 'legends@bmstu.ru',
          validationRegExp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          prettifyResult: (str) => str.toLowerCase(),
        },
        phone: {
          title: 'Номер телефона',
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
      },
      loading: false,
    }
  },

  methods: {
    async register(data) {
      this.loading = true;
      const {ok} = await this.$api.register(data.name, data.group, data.tg, data.vk, data.email, data.phone, data.password, detectBrowser(), detectOS());
      this.loading = false;

      if (!ok) {
        this.$refs.form.setError([this.fields.email], 'На указанный email уже зарегестрирован аккаунт');
        return;
      }
      this.$store.dispatch('GET_USER');
      this.$router.push({name: 'profile'});
    }
  }
}
</script>

