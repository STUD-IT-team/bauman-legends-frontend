<style scoped lang="stylus">
.root-register
  width 100%
  height 100%

  .form
    margin-top 200px
    margin-left auto
    margin-right auto
    padding 0 20px
    width 100%
    max-width 500px

    label
      display inline-block
      margin-bottom 15px
      width 50%

    input
      display inline-block
      width 50%
      padding 5px 7px

    button.submit
      display block
      width 100%
      margin-top 20px
      padding 10px
      cursor pointer

</style>

<template>
  <div class="root-register">
    <FormWithErrors
      :fields="fields"
      @success="register"
    ></FormWithErrors>
  </div>
</template>

<script>
import FormWithErrors from "../components/FormWithErrors.vue";


export default {
  components: {FormWithErrors},
  data() {
    return {
      fields: {
        name: {
          name: 'Имя',
          type: 'text',
          placeholder: 'Иванов Иван Иванович',
          validationRegExp: /^\w+ \w+( \w+)?$/,
        },
        group: {
          name: 'Учебная группа',
          type: 'text',
          placeholder: 'ХХх-ххБ',
          validationRegExp: /^\w\w?\d-\d\d\w?$/,
          prettifyResult: (str) => str.toUpperCase(),
        },
        tg:{
          name: 'Telegram',
          type: 'text',
          placeholder: '@legends_bmstu',
          validationRegExp: /^((https:\/\/t\.me\/)|@)?\w{5,}$/,
          prettifyResult: (str) => '@' + str.replace('https://t.me/', '').replace('@', ''),
        },
        vk: {
          name: 'VK',
          type: 'text',
          placeholder: 'https://vk.com/legends_bmstu',
          validationRegExp: /^(https:\/\/vk\.com\/)?\w+$/,
          prettifyResult: (str) => str.replace('https://vk.com/', ''),
        },
        email: {
          name: 'Email',
          type: 'text',
          placeholder: 'legends@bmstu.ru',
          validationRegExp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
        telephone: {
          name: 'Телефон',
          type: 'text',
          placeholder: '8-(123)-456-78-90',
          validationRegExp: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        }
      }
    }
  },

  methods: {
    register(data) {
      this.$api.sendRegisterData(data);
    }
  }
}
</script>

