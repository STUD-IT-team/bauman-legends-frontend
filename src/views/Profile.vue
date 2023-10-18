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

button-copy()
  button-edit()
  opacity 0.6
  transition all 0.2s ease
  img
    width 20px
    height 20px
  &:hover
    opacity 1

.root-profile
  hidden-scrollbar()
  width 100%

  .main-content
    padding 20px
    max-width 600px
    margin 0 auto
    .content-block
      padding-top 10px
      margin-top 10px
      @media({desktop})
        margin-top 20px
      //backdrop-filter blur(10px)
      background mix(colorBgLightMax, transparent, 70%)
      border-radius borderRadiusM
      .header
        font-large()
        font-bold()
        margin 0 20px 10px 20px
        color colorBg
      .info
        font-medium()
        margin-left 20px

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
              @media({desktop})
                margin-right 10px
            .team-id
              font-small()
              color colorText4
              display inline-block
              @media({mobile})
                display block
                font-small-extra()
            .copy-id-button
              button-copy()
              flex 1
              justify-content flex-start
              padding 0 10px
            .rename-team-button
              button-edit()

          .team-statistics
            font-small()
            color colorText4
            padding 0
            display block
            margin 5px 0 15px 0

          .team-members-info
            font-large()
            font-bold()
            margin 20px 0 5px 0

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
            @media({mobile})
              gap 10px
            .add-member-btn
              button()
              padding 5px 20px
              flex 1
              @media({mobile})
                font-small()
                padding 5px 10px 5px 2px
              img
                width 30px
                height 30px
                margin-right 10px
            .delete-team-btn
              button-danger()
              flex 0
              padding 5px 20px
              @media({mobile})
                font-small()
                padding 5px 10px

        &.user-block
          .user-name-row
          .data-row
            display flex
            flex-wrap wrap
            margin 10px 0
            .field
              @media(max-width: 400px)
                width 100%
              color colorBgLightExtra
            .data
              flex 1
              margin-left 10px
              color colorText1
            .button-edit
              button-edit()
              text-align right
          .user-name-row
            justify-content space-between
            .user-name-id-block
              margin 5px 0
              .user-name
                font-large()
                font-bold()
                @media({desktop})
                  margin-right 10px
              .user-id
                font-small()
                color colorText4
                display inline-block
                @media({mobile})
                  display block
                  font-small-extra()
            .copy-id-button
              button-copy()
              flex 1
              justify-content flex-start
              padding 0 10px

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
          &:disabled
           -webkit-appearance none
           -moz-appearance none
           text-indent 1px
           text-overflow ''
           &::-ms-expand
             display none

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

  .admin-page-button
    button-danger()
</style>

<template>
  <div class="root-profile">
    <Header with-points>
      <span>Профиль / главная</span>
    </Header>

    <div class="main-content">
      <div class="content-block">
        <header class="header">ДОСТУПНЫЕ ЗАДАНИЯ</header>
<!--        <div class="info">Задания станут доступны после начала основного этапа</div>-->
        <div class="tasks">
          <transition-group name="opacity">
            <button v-for="taskType in taskTypes" class="task-button" @click="takeTask(taskType.id)" :disabled="!taskType.isActive">{{ taskType.name }}</button>
          </transition-group>
        </div>
      </div>

      <div class="content-block">
        <header class="header">МОЯ КОМАНДА</header>
        <div class="info">Если в вашей команде меньше 5 человек, перед началом основного этапа вы будете объединены с другой командой</div>
<!--        <div class="info">Создание команды станет доступно 14 октября</div>-->
        <transition name="opacity" mode="out-in">
          <CircleLoading v-if="loadingTeams"></CircleLoading>
          <div v-else-if="this.teamData.__gotten" class="box team-block">
            <div class="team-name-container">
              <span>
                <span class="team-name">{{ teamData.title }}</span>
                <span class="team-id">#{{ String(teamData.id || '').padStart(4, '0') }}</span>
              </span>
              <button class="copy-id-button" @click="copyToClipboard(teamData.id, 'ID команды')"><img src="../res/images/copy.svg" alt=""></button>

              <CircleLoading v-if="loadingTeamsSmall" size="30px" light></CircleLoading>
              <button v-else @click="renameTeam" class="rename-team-button">Изменить</button>
            </div>
            <p class="team-statistics">{{ teamData.points }} баллов</p>

            <p class="team-members-info">Состав команды:</p>
            <div class="user-row" v-for="(member, idx) in sortedMembers">
              <div class="name">{{ member.name }}</div>
              <select class="dropdown"
                      @change="changeMemberRole(member.id, member._newRole, member)"
                      :disabled="member.role === TeamRoles.lead || userRole !== TeamRoles.lead"
                      v-model="member._newRole"
              >
                <option v-if="member.role === TeamRoles.lead" :value="TeamRoles.lead">Капитан</option>
                <option :value="TeamRoles.subLead">Зам</option>
                <option :value="TeamRoles.member">Участник</option>
              </select>
              <button class="kick-member-btn" :class="{'hidden': member.role === TeamRoles.lead || (userRole === member.role)}" v-if="(userRole === TeamRoles.lead || userRole === TeamRoles.subLead)" @click="deleteMemberFromTeam(idx)"><img src="../res/images/trashbox.svg" alt="Исключить"></button>
            </div>

            <div v-if="userRole === TeamRoles.lead || userRole === TeamRoles.subLead" class="buttons-container">
              <button v-if="teamData.members.length <= 7" @click="addMemberToTeam()" class="add-member-btn"><img src="../res/images/plus.svg" alt="Добавить участника">Добавить участника</button>
              <button v-if="userRole === TeamRoles.lead" :disabled="teamData.members.length > 1" @click="deleteTeam" class="delete-team-btn">Удалить команду</button>
            </div>
          </div>
          <div v-else>
            <div class="buttons-create-team-container">
              <button @click="createTeam" class="create-team-button box">Создать команду</button>
              <button @click="showJoinInstruction" class="join-team-button box">Присоединиться к команде</button>
            </div>
          </div>
        </transition>
      </div>

      <router-link :to="{name: 'admin'}" class="admin-page-button">На админскую</router-link>

      <div class="content-block">
        <header class="header">ПРОФИЛЬ</header>
        <div class="box user-block">
          <div class="user-name-row">
            <div class="user-name-id-block">
              <div class="user-name">{{ $user.name }}</div>
              <div class="user-id">#{{ String($user.id || '').padStart(4, '0') }}</div>
            </div>
            <button class="copy-id-button" @click="copyToClipboard($user.id, 'Твоё ID')"><img src="../res/images/copy.svg" alt=""></button>

            <CircleLoading v-if="loadingProfile" size="30px" light></CircleLoading>
            <button v-else class="button-edit" @click="changeUserParam('name')">Изменить</button>
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
  </div>
</template>


<script>
import CircleLoading from "../components/CircleLoading.vue";
import {Validators} from "../utils/validators";
import Header from "../components/Header.vue";


export default {
  components: {Header, CircleLoading},
  data() {
    return {
      teamData: {
        id: undefined,
        title: undefined,
        members: [],
        points: undefined,
        __gotten: false,
      },
      taskTypes: [],
      TeamRoles: {
        lead: 3,
        subLead: 2,
        member: 1,
      },

      TEAM_MEMBERS_COUNT_LIMIT: 8,

      loadingTaskTypes: false,
      loadingTeams: false,
      loadingTeamsSmall: false,
      loadingProfile: false,
      updatingTaskTypesInterval: undefined,
    }
  },
  created() {
    this.loadingTeams = true;
  },
  mounted() {
    this.getCurTeam();
    this.getTaskTypes();
    this.getTask();
    this.updatingTaskTypesInterval = setInterval(this.getTaskTypes, 5000);
  },
  unmounted() {
    clearInterval(this.updatingTaskTypesInterval);
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
    async getTask() {
      const {data, code, ok} = await this.$api.getTask();
      if (!ok) {
        this.$store.dispatch('DELETE_TASK');
        return;
      }
      this.$store.dispatch('SET_TASK', {
        points: data.maxPoints,
      });
    },
    async getCurTeam() {
      this.loadingTeams = true;
      const {data: teamData, code, ok} = await this.$api.getTeam();
      this.loadingTeams = false;
      teamData?.members?.forEach(member => {
        member._newRole = member.role;
      });
      if (!ok || Object.entries(teamData).length === 0) {
        this.$store.dispatch('DELETE_TEAM');
        this.teamData.__gotten = false;
        return;
      }
      this.teamData.id = teamData.team_id;
      this.teamData.title = teamData.title;
      this.teamData.members = teamData.members;
      this.teamData.points = teamData.points;
      this.teamData.__gotten = true;
      this.$store.dispatch('SET_TEAM', this.teamData);
    },
    async getTaskTypes() {
      this.loadingTaskTypes = true;
      const {data, code, ok} = await this.$api.getTaskTypes();
      this.loadingTaskTypes = false;
      if (!ok) {
        this.$popups.error("Ошибка", "Не удалось получить список возможных типов заданий", 1000);
        return;
      }
      this.taskTypes = data.taskTypes;
    },
    async takeTask(taskTypeId) {
      this.loadingTaskTypes = true;
      const {data, code, ok} = await this.$api.takeTask(taskTypeId);
      this.loadingTaskTypes = false;
      if (!ok) {
        this.$popups.error("Незивестная ошибка", "Не удалось взять задание");
        return;
      }

      this.$router.push({name: 'task'});
    },

    showJoinInstruction() {
      this.$modals.alert('Сообщи капитану свой ID, чтобы он добавил тебя в команду');
    },

    async createTeam() {
      const teamName = await this.$modals.prompt('Название команды', 'Введите название новой команды');
      if (!teamName) {
        return;
      }
      this.loadingTeams = true;
      const {ok} = await this.$api.createTeam(teamName);
      this.loadingTeams = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось создать команду");
      }
      this.getCurTeam();
    },

    async deleteTeam() {
      const res = await this.$modals.confirm('Удалить команду', 'Вы действительно хотите удалить команду? Отменить действие не получится!');
      if (!res) {
        return;
      }
      this.loadingTeams = true;
      const {ok} = await this.$api.deleteTeam();
      this.loadingTeams = false;
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
      this.loadingTeams = true;
      const {ok} = await this.$api.editTeam(teamName);
      this.loadingTeams = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось переименовать команду");
        return;
      }
      this.teamData.title = teamName;
    },

    async addMemberToTeam(overrideDescription, defaultValue) {
      let newUserId = await this.$modals.prompt('Добавить нового участника', overrideDescription || 'Введите ID нового участника', defaultValue);
      if (!newUserId) {
        return;
      }
      if (!Validators.id.validate(newUserId)) {
        this.addMemberToTeam('Неверный формат', newUserId);
        return;
      }
      newUserId = Validators.id.prettifyResult(newUserId);
      this.loadingTeamsSmall = true;
      const {ok} = await this.$api.addMember(newUserId);
      this.loadingTeamsSmall = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось добавить пользователя в команду");
        return;
      }
      this.getCurTeam();
    },

    async deleteMemberFromTeam(userIdxInList) {
      const res = await this.$modals.confirm('Удалить участника', `Вы уверены, что хотите удалить участника "${this.teamData.members[userIdxInList].name}"?`);
      if (!res) {
        return;
      }
      this.loadingTeamsSmall = true;
      const {ok} = await this.$api.deleteMember(this.teamData.members[userIdxInList].id);
      this.loadingTeamsSmall = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось удалить пользователя из команды");
        return;
      }
      this.teamData.members.splice(userIdxInList, 1);
    },

    async changeMemberRole(userId, roleId, userObject) {
      this.loadingTeamsSmall = true;
      const {ok} = await this.$api.setMemberRole(userId, roleId);
      this.loadingTeamsSmall = false;
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось удалить пользователя из команды");
        return;
      }
      userObject.role = roleId;
      userObject._newRole = userObject.role;
    },

    async changeUserParam(fieldName, fieldNameUser=fieldName, overrideHavingValue=null) {
      const newUserData = {
        name: this.$user.name,
        group: this.$user.group,
        telegram: this.$user.tg,
        vk: this.$user.vk,
        email: this.$user.email,
        phone_number: this.$user.phone,
      };
      const inputValue = await this.$modals.prompt(overrideHavingValue ? "Неверный формат" : "Изменить значение поля", "Введите новое значение", overrideHavingValue || newUserData[fieldName]);
      if (!inputValue) {
        return;
      }
      if (!Validators[fieldNameUser].validate(inputValue)) {
        this.changeUserParam(fieldName, fieldNameUser, inputValue);
        return;
      }

      newUserData[fieldName] = Validators[fieldNameUser].prettifyResult(inputValue);
      this.loadingProfile = true;
      const {ok} = await this.$api.editProfile(newUserData.name, newUserData.group, newUserData.telegram, newUserData.vk, newUserData.email, newUserData.phone_number);
      this.loadingProfile = false;
      if (!ok) {
        this.$popups.error(`Не удалось изменить значение поля ${fieldName}`);
        return;
      }
      this.$user[fieldNameUser] = newUserData[fieldName];
    },

    async logout() {
      this.loadingProfile = true;
      const {data, code, ok} = await this.$api.logout();
      this.loadingProfile = true;

      if (!ok) {
        this.$popups.error('Не получилось выйти из аккаунта', 'Неизвестная ошибка');
        return;
      }
      this.$store.dispatch("DELETE_USER");
      this.$router.push({name: "login"});
    },

    copyToClipboard(str, description) {
      navigator.clipboard.writeText(str);
      this.$popups.success("Скопировано", `${description} скопировано в буфер обмена`)
    }
  }
}
</script>
