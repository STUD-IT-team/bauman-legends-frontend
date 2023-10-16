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

}
</script>

<style scoped>

.header {
  /* стили для .header */
}

.tasks {
  /* стили для .tasks */
}

.task-button {
  /* стили для .task-button */
}
</style>