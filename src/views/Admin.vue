<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/utils.styl'


</style>

<template>
  <div class="root-admin">
    <Header>
      <router-link :to="{name: 'profile'}">&lt; В профиль</router-link>
      <span>Админская</span>
    </Header>

    <div class="main-content">
      <div class="answer" v-for="answer in answers"></div>
    </div>
  </div>
</template>


<script>
import CircleLoading from "../components/CircleLoading.vue";
import Header from "../components/Header.vue";


export default {
  components: {Header, CircleLoading},
  data() {
    return {
      answers: [],

      loading: false,
    }
  },
  mounted() {
    this.getAnswers();
  },

  methods: {
    async getAnswers() {
      const {data, code, ok} = await this.$api.getAdminUsersAnswers();
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось получить ответы");
        return;
      }
    },
    copyToClipboard(str, description) {
      navigator.clipboard.writeText(str);
      this.$popups.success("Скопировано", `${description} скопировано в буфер обмена`)
    }
  }
}
</script>
