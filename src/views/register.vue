<style lang="stylus" scoped>

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
    <div class="form">
      <label>Имя</label><input type="text" v-model="newUserData.name" placeholder="ФИО">
      <label>Учебная группа</label><input type="text" v-model="newUserData.group" placeholder="РК1-11Б">
      <label>Telegram</label><input type="text" v-model="newUserData.tg" placeholder="https://t.me/xxxxxx">
      <label>VK</label><input type="text" v-model="newUserData.vk" placeholder="https://vk.com/xxxxxx">
      <label>Email</label><input type="text" v-model="newUserData.email" placeholder="ххххх@xxx.xx">
      <label>Телефон</label><input type="text" v-model="newUserData.telephone" placeholder="Х-(ХХХ)-ХХХ-ХХ-ХХ">
      <label>Пароль</label><input type="password" v-model="newUserData.password" placeholder="*****">

      <button :disabled="loading" @click="register" class="submit">
        <span v-if="!loading">Отправить</span>
        <span v-else>...</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUserData: {
        name: undefined,
        group: undefined,
        tg: undefined,
        vk: undefined,
        email: undefined,
        telephone: undefined,
        password: undefined,
      },
      loading: false,
    }
  },

  computed: {
  },

  async mounted() {
  },

  methods: {
    async register() {
      this.loading = true;
      const {data: userData, code, ok} = await this.$api.register(this.newUserData.name, this.newUserData.group, this.newUserData.tg, this.newUserData.vk, this.newUserData.email, this.newUserData.telephone, this.newUserData.password);
      this.loading = false;

      if (ok)
        this.$router.push({name: 'profile'})

      console.log("VALIDATE AND SEND USER DATA");
      // api.sendRegisterData(this.newUserData);
    }
  }
}
</script>

