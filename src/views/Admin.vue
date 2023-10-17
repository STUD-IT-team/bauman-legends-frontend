<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/utils.styl'


.root-admin
  .main-content
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    margin 10px
    text-align left
    align-content left
    font-medium()
    color colorText1
    display grid
    grid-auto-rows auto
    grid-template-columns 2fr 2fr 2fr 1fr
    grid-gap 5px
    align-items stretch
    justify-items stretch
    .header
      display flex
      align-items center
      justify-content center
      text-align center
    .answer
      display contents
      > *
        word-wrap anywhere
        centered-flex-container()
        flex-direction column
        border-radius borderRadiusM
        background mix(colorBgDark, transparent, 50%)
        &:not(img)
          padding 5px
      &.error
        > *
          background mix(mix(colorBgDark, colorError, 70%), transparent, 50%)
      &.success
        > *
          background mix(mix(colorBgDark, colorSuccess, 70%), transparent, 50%)
      img
        object-fit contain
        transition all 0.2s ease
        max-height 150px
        &.selected
          max-height unset
          width calc(100% - 20px)
          height calc(100vh - 20px)
          centered-absolute-transform()
          position fixed
          box-shadow 0 0 15px 10px black
        &:not(.selected):hover
          cursor pointer
          filter brightness(1.2)
      .task-cell
        cursor pointer
        transition all 0.2s ease
        .task-title
          color colorEmp1
        .task-type-name
          color colorText3
          font-small()
        .team-title
          color colorEmp3
        &:hover
          filter brightness(1.4)
      .time-gotten
        font-small()
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
    .confirm-button
      button()
      padding 5px 5px
      margin 5px
      font-small()
</style>

<template>
  <div class="root-admin">
    <Header>
      <router-link :to="{name: 'profile'}">&lt; В профиль</router-link>
      <span>Админская</span>
    </Header>

    <div class="main-content">
      <span class="header">Команда + Задача + время</span>
      <span class="header">Ответ</span>
      <span class="header">Ответ-картинка</span>
      <span class="header">Результат оценки</span>

      <div class="answer" v-for="answer in answers" :class="{success: answer.isConfirmed === true, error: answer.isConfirmed === false}">
        <div @click="$modals.alert(answer.taskTitle, answer.taskDescription)" class="task-cell">
          <div class="team-title">{{ answer.teamTitle }}</div>
          <div class="task-type-name">{{ answer.taskTypeName }}:</div>
          <div class="task-title">{{ answer.taskTitle }}</div>
          <div class="time-gotten">{{ answer.timeGotten.toLocaleString() }}</div>
        </div>
        <div>
          <div class="answerText">{{ answer.answerText }}</div>
        </div>
        <img :src="answer.answerImageBase64" alt="" :class="{selected: answer._imgSelected}" @click="answer._imgSelected = !answer._imgSelected">
        <div>
          <select class="dropdown" v-model="answer._confirmation">
              <option :value="null" selected>-</option>
              <option :value="true">Правильно</option>
              <option :value="false">Не верно</option>
          </select>
          <button class="confirm-button" v-if="answer._confirmation !== answer.isConfirmed" @click="confirmAnswer(answer)">Сохранить</button>
        </div>
      </div>
    </div>


  </div>
</template>


<script>
import CircleLoading from "../components/CircleLoading.vue";
import Header from "../components/Header.vue";
import {AnswerTypeIds} from "../utils/constants";


export default {
  components: {Header, CircleLoading},
  data() {
    return {
      answers: [],
      AnswerTypeIds: AnswerTypeIds,
      selectedAnswerToInfo: undefined,

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
      this.answers = data.answers.map(answer => ({
        answerId: String(answer.answerId),
        taskId: String(answer.taskId),
        taskTitle: String(answer.taskTitle),
        teamId: String(answer.teamId),
        teamTitle: String(answer.teamTitle),
        taskDescription: String(answer.taskDescription),
        taskTypeId: Number(answer.taskTypeId),
        taskTypeName: String(answer.taskTypeName),
        answerText: answer.answerText ? String(answer.answerText) : null,
        answerImageBase64: String(answer.answerImageBase64),
        timeGotten: new Date(answer.timeGotten),
        additionalPoints: Number(answer.additionalPoints),
        taskAnswerTypeId: Number(answer.taskAnswerTypeId),
        isConfirmed: answer.isConfirmed,
        _confirmation: answer.isConfirmed,
      }));
    },
    confirmAnswer(answer) {
      this.loading = true;
      const {ok} = this.$api.adminSetAnswerConfirmation(answer.answerId, answer._confirmation);
      this.loading = false;
      if (!ok) {
        this.$popups.error("Ошибка", "Не удалось изменить статус ответа");
        return;
      }
      answer.isConfirmed = answer._confirmation;
    },

    copyToClipboard(str, description) {
      navigator.clipboard.writeText(str);
      this.$popups.success("Скопировано", `${description} скопировано в буфер обмена`)
    }
  }
}
</script>
