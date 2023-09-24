<style scoped>
.root-authorization {
  width: 100%;
  height: 100%;
}

.root-authorization .form {
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  width: 100%;
  max-width: 500px;
}

.root-authorization .form label {
  display: inline-block;
  margin-bottom: 15px;
  width: 50%;
}
.root-authorization .form input {
  display: inline-block;
  width: 50%;
  padding: 5px 7px;
}

.root-authorization .form button.submit {
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
}
</style>

<template>
  <div class="root-authorization">
    <div class="form">
      <label>Логин</label><input type="text" v-model="newLoginData.login" placeholder="user">
      <label>Пароль</label><input type="text" v-model="newLoginData.password" id="newLoginData.password" 
        :strength="strength" placeholder="*****"/>
      <!-- <VuePassword
            v-model="password1"
            id="password1"
            :strength="strength"
            type="text"
        /> -->
      <button @click="authorizate" class="submit">Отправить</button>
    </div>
  </div>
</template>

<script>
import VuePassword from 'vue-password';

export default {
    components: {
        VuePassword,
    },
  data() {
    return {
      newLoginData: {
        login: undefined,
        password: undefined,
      },
      strength: 0,
    }
  },

  computed: {
  },

  async mounted() {
  },

  methods: {
    authorizate() {
      console.log("VALIDATE AND SEND USER DATA");
      // api.sendRegisterData(this.newUserData);
    }
  }
}
</script>

