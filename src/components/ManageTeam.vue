<template>
  <header class="header">МОЯ КОМАНДА</header>
  <div class="info">Если в вашей команде меньше 5 человек, перед началом основного этапа вы будете объединены с другой командой</div>
  <!--        <div class="info">Создание команды станет доступно 14 октября</div>-->
  <transition name="opacity" mode="out-in">
    <CircleLoading v-if="loading"></CircleLoading>
    <div v-else-if="this.teamData.__gotten" class="box team-block">
      <div class="team-name-container">
              <span>
                <span class="team-name">{{ teamData.title }}</span>
                <span class="team-id">#{{ String(teamData.id || '').padStart(4, '0') }}</span>
              </span>
        <button class="copy-id-button" @click="copyToClipboard(teamData.id, 'ID команды')"><img src="../res/images/copy.svg" alt=""></button>
        <button @click="renameTeam" class="rename-team-button">Изменить</button>
      </div>
      <!--            <p class="team-statistics">{{ teamData.rating }} баллов, {{ teamData.place }} место</p>-->

      <p class="team-members-info">Состав команды:</p>
      <div class="user-row" v-for="(member, idx) in teamData.members">
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
</template>

<script>
import CircleLoading from "~/components/CircleLoading.vue";
import {Validators} from "../utils/validators";

export default {
  name: 'TeamManagement',
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
        lead: 3,
        subLead: 2,
        member: 1,
      },

      TEAM_MEMBERS_COUNT_LIMIT: 8,

      loading: false,
    }
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.getCurTeam();
  },

  methods: {
    async getCurTeam() {
      this.loading = true;
      const {data: teamData, code, ok} = await this.$api.getTeam();
      this.loading = false;
      teamData?.members?.forEach(member => {
        member._newRole = member.role;
      });
      if (!ok || Object.entries(teamData).length === 0) {
        this.teamData.__gotten = false;
        return;
      }
      this.teamData.id = teamData.team_id;
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
      const {ok} = await this.$api.createTeam(teamName);
      this.loading = false;
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
      const {ok} = await this.$api.addMember(newUserId);
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
      const {ok} = await this.$api.deleteMember(this.teamData.members[userIdxInList].id);
      if (!ok) {
        this.$popups.error("Неизвестная ошибка", "Не удалось удалить пользователя из команды");
        return;
      }
      this.teamData.members.splice(userIdxInList, 1);
    },

    async changeMemberRole(userId, roleId, userObject) {
      console.log(roleId, userObject)
      const {ok} = await this.$api.setMemberRole(userId, roleId);
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
      const {ok} = await this.$api.editProfile(newUserData.name, newUserData.group, newUserData.telegram, newUserData.vk, newUserData.email, newUserData.phone_number);
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
    },

    copyToClipboard(str, description) {
      navigator.clipboard.writeText(str);
      this.$popups.success("Скопировано", `${description} скопировано в буфер обмена`)
    }
  }
}
</script>

<style scoped lang="stylus">

@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/utils.styl'

.header
  font-large()
  font-bold()
  margin 0 20px 10px 20px
  color colorBg

.info
  font-medium()
  margin-left 20px

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
</style>