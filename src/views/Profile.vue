<style lang="stylus" scoped>
.header
  height 150%
  background lightcyan

.name
  color cornflowerblue
  font-size 13

.team
  .title
    color darkseagreen
    font-size 20
    font-weight bold

  .member
    .leader
      color #51c49f
      font-weight bolder
    .name
      color #51c49f
    .role
      color violet

</style>

<template>
  <header class="header">
    <div> hello </div>
  </header>

  <main class="root">
    <div class="title"> PROFILE PAGE </div>

    <div class="name"> {{ userData.name }} </div>
    <div class="team">
      <div class="title"> {{teamData.title }} </div>
      <div v-for="member in sortedMembers" class="member">

        <div class="name">{{ userNameById(member.id) }}</div>
        <div class="role">{{ member.role }}</div>
      </div>
    </div>
    <CircleLoading v-if="loading"></CircleLoading>
  </main>
  <footer>
    <router-link to="/">TO MAIN</router-link>
  </footer>

</template>


<script>
import CircleLoading from "../components/CircleLoading.vue";


export default {
  components: {CircleLoading},
  data() {
    return {
      userData: {
        name: this.$user.name,
        group: this.$user.group,
        tg: this.$user.tg,
        vk: this.$user.vk,
        email: this.$user.email,
        telephone: this.$user.telephone,
      },
      loading: false,
      teamData: {
        id: undefined,
        title: undefined,
        members: [] // 0 - regular 1 - vice 2 - lead {userID, roleID}
      }
    }
  },

  async mounted() {
    await this.getCurTeam()
  },

  computed(){
    function sortedMember () {
      function comparator(a, b) {
        if (a.role < b.role)
          return -1;
        else if (a.role > b.role)
          return 1;
        else{
          if (userNameById(a.id) < userNameById((b.id)))
            return 1;
          else
            return -1;
        }
      }

      return this.teamData.members.slice().sort(comparator)
    }

    async function userNameById(id){
      const {data, code, ok} = await this.$api.getUserById(id)
      if (ok)
        return data.name
      else
        console.log("oops")
    }
  },

  methods: {
    async getCurTeam(){
      const {data: teamData, code, ok} = await this.$api.getTeam();
    },

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
