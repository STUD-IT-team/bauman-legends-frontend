<style scoped>
.root-register {
  width: 100%;
  height: 100%;
}

.root-register .form {
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  width: 100%;
  max-width: 500px;
}

.root-register .form label {
  display: inline-block;
  margin-bottom: 15px;
  width: 50%;
}
.root-register .form input {
  display: inline-block;
  width: 50%;
  padding: 5px 7px;
}

.root-register .form button.submit {
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
}
</style>

<template>
  <div class="root-register">
    <div class="form">
      <label>Имя</label><input type="text" v-model="newUserData.name" placeholder="ФИО">
      <label>Учебная группа</label><input type="text" v-model="newUserData.name" placeholder="РК1-11Б">
      <label>Telegram</label><input type="text" v-model="newUserData.name" placeholder="https://t.me/xxxxxx">
      <label>VK</label><input type="text" v-model="newUserData.name" placeholder="https://vk.com/xxxxxx">
      <label>Email</label><input type="text" v-model="newUserData.name" placeholder="ххххх@xxx.xx">
      <label>Телефон</label><input type="text" v-model="newUserData.name" placeholder="Х-(ХХХ)-ХХХ-ХХ-ХХ">

      <button @click="register" class="submit">Отправить</button>
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
      },
    }
  },

  computed: {
  },

  async mounted() {
  },

  methods: {
    register() {
      console.log("VALIDATE AND SEND USER DATA");
      // api.sendRegisterData(this.newUserData);
    }
  }
}
</script>

