<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/utils.styl'


button-edit()
  content "Изменить"
  button()
  width auto
  margin 0
  padding 0
  background colorBg
  font-small-extra()
  color colorBgLightExtra


.root-profile
  width 100%
  height 100%

  .navbar
    width 100%
    margin-bottom 20px
    background-color colorBg
    padding 10px
    font-large()
    color colorText1
    display flex
    justify-content space-between

  .header
    font-large()
    font-bold()
    margin 10px 20px
    color colorBg

  .tasks
    padding 0
    margin 0 20px
    display grid
    grid-template-columns 1fr 1fr
    grid-auto-rows 1fr
    column-gap 5px
    row-gap 5px

    .task-button
      button()
      border-radius 8px
      background colorBg
      color colorText1
      width 100%
      height 100%

  .box
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    padding-top 10px
    margin 10px 20px
    text-align left
    align-content left
    font-medium()
    color colorText1

    &.team-block
      .team-name-container
        display flex
        justify-content space-between
        align-items center
        .team-name
          font-large()
          font-bold()
        .team-id
          font-medium()
          color colorText3
          margin 0
          padding 0 10px
          display inline-block
        .rename-team-button
          button-edit()

      .team-statistics
        font-small()
        color colorText3
        padding 0
        display block
        margin 5px 0 15px 0

      .team-members-info
        font-large()
        font-bold()

      .user-row
        display flex
        margin-top 5px
        .name
          flex 1
          margin auto

        .kick-member-btn
          all unset
          cursor pointer
          centered-flex-container()
          width 40px
          img
            width 30px
            height 30px

      .buttons-container
        display flex
        margin-top 15px
        gap 20px
        .add-member-btn
          button()
          padding 5px 20px
          flex 1
          img
            width 30px
            height 30px
            margin-right 10px
        .delete-team-btn
          button-danger()
          flex 0
          padding 5px 20px

    &.user-block
      .user-name
        margin 5px 0

      .data-row
        display flex
        margin 10px 0

        .field
          color colorBgLightExtra
        .data
          flex 1
          margin-left 10px
          color colorText1
        .button-edit
          button-edit()

      .change-password
        button()
        margin 0
        width 50%
        color colorEmp2
        background colorBg

    .dropdown
      width auto
      background colorBg
      text-small()
      color colorText1
      display inline-block
      padding 2px 10px
      margin 0
      border colorBgLightExtra solid 1px
      border-radius 8px
</style>

<template>
  <div class="root-profile">
    <header class="navbar">
      <span>Профиль/Главная</span>
      <span>00:04:20</span>
    </header>

    <header class="header">ДОСТУПНЫЕ ЗАДАНИЯ</header>
    <div class="tasks">
      <button class="task-button">Онлайн-задание</button>
      <button class="task-button">Фото-задание</button>
      <button class="task-button">Путешествие в НОЦ</button>
      <button class="task-button">Задание с актёром</button>
    </div>

    <header class="header">МОЯ КОМАНДА</header>
    <div class="box team-block">
      <div  v-if="ifUserInTeam">
        <div class="team-name-container">
          <span>
            <span class="team-name">{{ teamData.title }}</span>
            <span class="team-id">#{{ String(teamData.id || '').padStart(4, '0') }}</span>
          </span>

          <button @click="renameTeam" class="rename-team-button">Изменить</button>
        </div>
        <p class="team-statistics">{{ teamData.rating }} баллов, {{ teamData.place }} место</p>

        <p class="team-members-info">Состав команды:</p>
        <div class="user-row" v-for="member in teamData.members">
          <div class="name">{{ member.name }}</div>
          <select class="dropdown"
                  @change="changeMemberRole(member.id, member.role, member)"
                  :disabled="member.role === TeamRoles.lead || !this.isUserTeamLead"
                  v-model="member._newRole"
          >
            <option v-if="member.role === TeamRoles.lead" :value="TeamRoles.lead">Капитан</option>
            <option :value="TeamRoles.subLead">Зам</option>
            <option :value="TeamRoles.member">Участник</option>
          </select>
          <button class="kick-member-btn" v-if="this.isUserTeamLead || true" @click="deleteMemberFromTeam"><img src="../res/images/trashbox.svg" alt="Исключить"></button>
        </div>

        <div class="buttons-container">
          <button @click="addMemberToTeam" class="add-member-btn">
            <img src="../res/images/plus.svg" alt="Добавить участника">Добавить участника</button>
          <button @click="deleteTeam" class="delete-team-btn">Удалить команду</button>
        </div>
      </div>

      <div v-else>
        <div class="team-invite">Ты пока не состоишь в команде!</div>
        <button @click="createTeam">Создать команду</button>
        <button @click="showJoinInstruction">Присоединиться к команде</button>
      </div>
    </div>

    <header class="header">ПРОФИЛЬ</header>
    <div class="box user-block">
      <div class="user-name">ФАМИЛИЯ ИМЯ ОТЧЕСТВО</div>
      <div class="data-row">
        <div class="field">Группа:</div>
        <div class="data">ИУ4-72б</div>
        <button class="button-edit">Изменить</button>
      </div>
      <div class="data-row">
        <div class="field">Email:</div>
        <div class="data">my_mail@mail.com</div>
        <button class="button-edit">Изменить</button>
      </div>
      <div class="data-row">
        <div class="field">Telegram:</div>
        <div class="data">@OneVVTG</div>
        <button class="button-edit">Изменить</button>
      </div>
      <div class="data-row">
        <div class="field">Вконтакте:</div>
        <div class="data">vk.com/onevvvk</div>
        <button class="button-edit">Изменить</button>
      </div>
      <div class="data-row">
        <div class="field">Номер телефона:</div>
        <div class="data">8-800-555-35-35</div>
        <button class="button-edit">Изменить</button>
      </div>

      <button class="change-password">Сменить пароль</button>

    </div>
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
        members: [],
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

    ifUserInTeam() {
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
      const teamName = await this.$modals.prompt('Название команды', 'Введите название новой команды');
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
      const res = await this.$modals.confirm('Удалить команду', 'Вы действительно хотите удалить команду? Отменить действие не получится!');
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
      const teamName = await this.$modals.prompt('Изменить название команды', 'Введите новое название новой команды', this.teamData.title);
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
      const newUserId = await this.$modals.prompt('Добавить нового участника', 'Введите ID нового участника');
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
