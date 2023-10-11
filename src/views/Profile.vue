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
  hidden-scrollbar()
  width 100%
  height 100%

  .navbar
    width 100%
    background-color colorBg
    padding 10px
    font-large()
    color colorText1
    display flex
    justify-content space-between

  .main-content
    padding 20px
    max-width 600px
    margin 0 auto
    .header
      font-large()
      font-bold()
      margin 20px 20px 10px 20px
      color colorBg

    .tasks
      padding 0
      margin 0
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
      margin 10px 0
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
            box-sizing border-box
            cursor pointer
            centered-flex-container()
            width 40px
            img
              width 30px
              height 30px
            &.hidden
              pointer-events none
              img
                visibility hidden

        .buttons-container
          display flex
          margin-top 20px
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
        .data-row
          display flex
          margin 10px 0
          .user-name
            font-large()
            font-bold()
            margin 5px 0
          .field
            color colorBgLightExtra
          .data
            flex 1
            margin-left 10px
            color colorText1
          .button-edit
            button-edit()
        .buttons-row
          display flex
          justify-content space-between
          align-items center

          .change-password
          .logout-button
            button()
            margin 0
            width unset
            color colorEmp1
            background colorBg
            padding 10px 20px
          .logout-button
            color colorError

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

    .buttons-create-team-container
      display flex
      gap 5px
      .create-team-button
      .join-team-button
        centered-flex-container()
        flex 1
        padding 10px 5px
        text-align center
        margin 0
        cursor pointer
</style>

<template>
  <div class="root-profile">
    <header class="navbar">
      <span>Профиль / Главная</span>
<!--      <span>00:04:20</span>-->
    </header>

    <div class="main-content">

      <header class="header">ДОСТУПНЫЕ ЗАДАНИЯ</header>
      <div class="tasks">
        <button class="task-button">Онлайн-задание</button>
        <button class="task-button">Фото-задание</button>
        <button class="task-button">Путешествие в НОЦ</button>
        <button class="task-button">Задание с актёром</button>
      </div>

      <header class="header">МОЯ КОМАНДА</header>
      <div v-if="this.teamData.__gotten" class="box team-block">
        <div class="team-name-container">
          <span>
            <span class="team-name">{{ teamData.title }}</span>
            <span class="team-id">#{{ String(teamData.id || '').padStart(4, '0') }}</span>
          </span>

          <button @click="renameTeam" class="rename-team-button">Изменить</button>
        </div>
        <p class="team-statistics">{{ teamData.rating }} баллов, {{ teamData.place }} место</p>

        <p class="team-members-info">Состав команды:</p>
        <div class="user-row" v-for="(member, idx) in teamData.members">
          <div class="name">{{ member.name }}</div>
          <select class="dropdown"
                  @change="changeMemberRole(member.id, member.role, member)"
                  :disabled="member.role === TeamRoles.lead || userRole !== TeamRoles.lead"
                  v-model="member._newRole"
          >
            <option v-if="member.role === TeamRoles.lead" :value="TeamRoles.lead">Капитан</option>
            <option :value="TeamRoles.subLead">Зам</option>
            <option :value="TeamRoles.member">Участник</option>
          </select>
          <button class="kick-member-btn" :class="{'hidden': member.role === TeamRoles.lead}" v-if="(userRole === TeamRoles.lead || userRole === TeamRoles.subLead)" @click="deleteMemberFromTeam(idx)"><img src="../res/images/trashbox.svg" alt="Исключить"></button>
        </div>

        <div class="buttons-container">
          <button @click="addMemberToTeam" class="add-member-btn">
            <img src="../res/images/plus.svg" alt="Добавить участника">Добавить участника</button>
          <button @click="deleteTeam" class="delete-team-btn">Удалить команду</button>
        </div>
      </div>
      <div v-else>
        <div class="buttons-create-team-container">
          <button @click="createTeam" class="create-team-button box">Создать команду</button>
          <button @click="showJoinInstruction" class="join-team-button box">Присоединиться к команде</button>
        </div>
      </div>

      <header class="header">ПРОФИЛЬ</header>
      <div class="box user-block">
        <div class="data-row">
          <div class="user-name">{{ $user.name }}</div>
          <div class="data"></div>
          <button class="button-edit" @click="changeUserParam('name')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Группа:</div>
          <div class="data">{{ $user.group }}</div>
          <button class="button-edit" @click="changeUserParam('group')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Email:</div>
          <div class="data">{{ $user.email }}</div>
          <button class="button-edit" @click="changeUserParam('email')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Telegram:</div>
          <div class="data">@{{ $user.tg }}</div>
          <button class="button-edit" @click="changeUserParam('telegram', 'tg')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Вконтакте:</div>
          <div class="data">vk.com/{{ $user.vk }}</div>
          <button class="button-edit" @click="changeUserParam('vk')">Изменить</button>
        </div>
        <div class="data-row">
          <div class="field">Номер телефона:</div>
          <div class="data">{{ $user.phone }}</div>
          <button class="button-edit" @click="changeUserParam('phone_number', 'phone')">Изменить</button>
        </div>

        <div class="buttons-row">
          <router-link :to="{name: 'changePassword'}">
            <button class="change-password">Сменить пароль</button>
          </router-link>

          <button class="logout-button" @click="logout">Выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CircleLoading from "../components/CircleLoading.vue";


export default {
  components: {CircleLoading},
  data() {
    return {
      teamData: {
        id: undefined,
        title: undefined,
        members: [],
        __gotten: false,
      },
      TeamRoles: {
        lead: 2,
        subLead: 1,
        member: 0,
      },

      loading: false,
    }
  },

  mounted() {
    this.getCurTeam();
  },

  computed: {
    userRole() {
      const userInTeam = this.teamData.members.find((member) => member.id === this.$user.id);
      return userInTeam?.role;
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
      teamData?.members?.forEach(member => {
        member._newRole = member.role;
      });
      if (!ok || Object.entries(teamData).length === 0) {
        this.teamData.__gotten = false;
        return;
      }
      this.teamData.id = teamData.id;
      this.teamData.title = teamData.title;
      this.teamData.members = teamData.members;
      this.teamData.__gotten = true;
    },

    showJoinInstruction() {
      this.$modals.alert('Сообщи капитану свой ID, чтобы он добавил тебя в команду');
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
      const res = await this.$modals.confirm('Удалить участника', `Вы уверены, что хотите удалить участника "${this.teamData.members[userIdxInList].name}"?`);
      if (!res) {
        return;
      }
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

    async changeUserParam(fieldName, fieldNameUser=fieldName) {
      const newUserData = {
        name: this.$user.name,
        group: this.$user.group,
        telegram: this.$user.tg,
        vk: this.$user.vk,
        email: this.$user.email,
        phone_number: this.$user.phone,
      };
      newUserData[fieldName] = await this.$modals.prompt("Изменить значение поля", "Введите новое значение", newUserData[fieldName]);
      if (!newUserData[fieldName]) {
        return;
      }

      this.loading = true;
      const {ok} = await this.$api.editProfile(newUserData.name, newUserData.group, newUserData.telegram, newUserData.vk, newUserData.email, newUserData.phone_number);
      this.loading = false;
      if (!ok) {
        this.$popups.error(`Не удалось изменить значение поля ${fieldName}`);
        return;
      }
      this.$user[fieldNameUser] = newUserData[fieldName];
    },

    async logout() {
      this.loading = true;
      const {data, code, ok} = await this.$api.logout();
      this.loading = true;

      if (!ok) {
        this.$popups.error('Не получилось выйти из аккаунта', 'Неизвестная ошибка');
        return;
      }
      this.$store.dispatch("DELETE_USER");
      this.$router.push({name: "login"});
    }
  }
}
</script>
