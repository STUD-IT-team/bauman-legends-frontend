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

  .id
    color darkseagreen

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
  <div>
    <header class="header">
    </header>

    <main class="root">

      <div class="name"> Привет, {{ newUserData.name }}!</div>
      <div class="name"> твой ID#{{ newUserData.id }}</div>

<!--      команда, если есть-->
      <div v-if="ifUserInTeam" class="team">
        <div class="title"> Команда: {{ teamData.title }} </div>
        <div class="id"> ID#{{ teamData.id }}</div>
        <div> Участники:</div>
        <div v-for="member in sortedMembers" class="member">
          <div class="name">{{ member.name }}</div>

          <select @change="changeMemberRole(member.id, member.role, member)"
                  :disabled="member.role === TeamRoles.lead || !this.isUserTeamLead" v-model="member._newRole">
            <option v-if="member.role === TeamRoles.lead" :value="TeamRoles.lead">Капитан</option>
            <option :value="TeamRoles.subLead">Зам</option>
            <option :value="TeamRoles.member">Участник</option>
          </select>

          <div v-if="this.isUserTeamLead" class="buttons-for-lead">
            <button @click="deleteMemberFromTeam" class="del-user-btn"> Удалить участника</button>
          </div>

        </div>
        <div v-if="this.isUserTeamLead" class="buttons-for-lead">
          <button @click="addMemberToTeam" class="add-member-btn"> Добавить нового участника</button>
          <button @click="renameTeam" class="rename-team-btn"> Изменить название команды</button>
          <button @click="deleteTeam" class="delete-team-btn"> Удалить команду</button>
        </div>
      </div>
      <div v-else>
        <div class="team-invite"> Ты пока не состоишь в команде! </div>
        <button @click="createTeam"> Создать команду </button>
        <button @click="showJoinInstruction"> Присоединиться к команде </button>
      </div>

    </main>
    <footer>
      <router-link to="/">TO MAIN</router-link>
    </footer>
  </div>
</template>


<script>
import CircleLoading from "../components/CircleLoading.vue";


export default {
  components: {CircleLoading},
  data() {
    return {
      newUserData: {
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
        members: [], // 0 - regular /1 - vice /2 - lead {userID, roleID}
      },
      TeamRoles: {
        lead: 2,
        subLead: 1,
        member: 0,
      }
    }
  },

  mounted() {
    this.getCurTeam();
  },

  computed: {
    isUserTeamLead() {
      const idx = this.teamData.members.findIndex((member) => member.role === this.TeamRoles.lead && member.id === this.$user.id);
      return idx !== -1;
    },

    ifUserInTeam(){
      return Object.entries(this.teamData).length !== 0;
    },

    sortedMembers() {
      const comparator = (a, b) => {
        if (a.role < b.role) {
          return 1;
        } else if (a.role > b.role) {
          return -1;
        }
        if (a.name < b.name)
          return 1;
        return -1;
      }

      return this.teamData.members.slice().sort(comparator);
    },
  },

  methods: {
    async getCurTeam() {
      const {data: teamData, code, ok} = this.$api.getTeam();
      teamData.members.forEach(member => {
        member._newRole = member.role;
      });
      this.teamData = teamData;
    },

    showJoinInstruction() {
      alert('Сообщи капитану свой ID, чтобы он добавил тебя в команду');
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

    async addMemberToTeam() {
      const newUserId = await this.$modal.prompt('Добавить нового участника', 'Введите ID нового участника');
      if (!newUserId) {
        return;
      }
      this.loading = true;
      const {data: userData, ok} = await this.$api.addMember(newUserId);
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
