<style scoped>
.flexbox {
  display: flex;
  width: 100%;
  height: 100%;
  background: indianred;
}
.flexbox .card {
  width: 150px;
  height: 230px;
}
.flexbox .card .title {
  font-size: 1.5em;
  font-weight: bold;
}
.flexbox .card .description {
  font-size: 0.8em;
  color: darkgray;
}
</style>

<template>
  <div class="root">
    <div class="title"> PROFILE PAGE</div>
    <div class="name">Rudy</div>
    <div class="email">r@mail.ru</div>

    <div v-if="cards.length > 5">CARD MORE 5</div>
    <div v-else>NOT ENOUGH</div>

    <div class="flexbox">
      <div v-for="card in cards" class="card">
        <div class="titlr">{{ card.name }}</div>
        <div class="description">{{ card.description }}</div>

      </div>
    </div>


  </div>
  <router-link to="/">TO MAIN</router-link>

  <CircleLoading v-if="loading"></CircleLoading>
</template>

<script>
import CircleLoading from "../components/CircleLoading.vue";


export default {
  components: {CircleLoading},
  data() {
    return {
      cards: [{name: 'rudy', description: 'cool'}]

      loading: false,
    }
  },

  methods: {
    async createTeam() {
      const teamName = await this.$modal.prompt('Название команды', 'Введите название новой команды');
      if (!teamName) {
        return;
      }
      this.loading = true;
      const {data: teamData, ok} = await this.$api.createTeam(teamName);
      this.loading = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось создать команду");
       }
      this.teamData = teamData;
    },

    async deleteTeam() {
      const res = await this.$modal.confirm('Удалить команду', 'Вы действительно хотите удалить команду? Отменить действие не получится!');
      if (!res) {
        return;
      }
      this.loading = true;
      const {ok} = await this.$api.deleteTeam();
      this.loading = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось удалить команду");
       }
      this.teamData = {};
    },

    async renameTeam() {
      const teamName = await this.$modal.prompt('Изменить название команды', 'Введите новое название новой команды', this.teamData.title);
      if (!teamName) {
        return;
      }
      this.loading = true;
      const {ok} = await this.$api.editTeam(teamName);
      this.loading = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось переименовать команду");
        return;
      }
      this.teamData.title = teamName;
    },

    async addMemberToTeam(userId) {
      this.loading = true;
      const {data: userData, ok} = await this.$api.addMember(userId);
      this.loading = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось добавить пользователя в команду");
        return;
      }
      this.teamData.members.push(userData);
    },

    async deleteMemberFromTeam(userIdxInList) {
      this.loading = true;
      const {ok} = await this.$api.deleteMember(this.teamData.members[userIdxInList].id);
      this.loading = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось удалить пользователя из команды");
        return;
      }
      this.teamData.members.splice(userIdxInList, 1);
    },

    async changeMemberRole(userId, roleId, userObject) {
      this.loading = true;
      const {ok} = await this.$api.setMemberRole(userId, roleId);
      this.loading = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось удалить пользователя из команды");
        return;
      }
      userObject.role = roleId;
      userObject._newRole = userObject.role;
    },
  }
}
</script>

