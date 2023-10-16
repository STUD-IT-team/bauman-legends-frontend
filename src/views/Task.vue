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


.root-task
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

    .box
      background-color colorBg
      border-radius borderRadiusM
      padding 20px
      margin 10px 0
      text-align left
      align-content left
      font-medium()
      color colorText1
      .task-header
        font-large()
        font-bold()
        display flex
        .title
          color colorText1
          flex 1
        .pts-value
        .pts
          color colorEmp1
        .pts-value
          margin-right 10px
      .info-block
        display flex
        justify-content space-between
        font-small()
        color colorText5
        margin-bottom 10px
        .info
          flex 1
        .pts-possible
          white-space nowrap

      .task-description
        font-medium()
        color colorText1

      .answer-block
        margin-top 10px
        .QR-button
          button()
          margin 10px auto
          padding 10px 20px
</style>

<template>
  <div class="root-task">
    <header class="navbar">
      <span>{{ taskData.typeName }}</span>
<!--      <span>00:04:20</span>-->
    </header>

    <div class="main-content">
      <div class="box">
        <div class="task-header">
          <div class="title">{{ taskData.title }}</div>
          <vue3autocounter
            ref='counter'
            class="pts-value"
            :startAmount='prevTaskPoints'
            :endAmount='totalTaskPoints'
            :duration='1'
            prefix=''
            suffix=''
            separator=''
            decimalSeparator=','
            :decimals='0'
            autoinit
          ></vue3autocounter>
          <span class="pts">баллов</span>
        </div>
        <div class="info-block">
          <div class="info">Баллы убывают со временем и при использовании подсказки</div>
          <div class="pts-possible">из {{ taskData.maxPoints }}</div>
        </div>

        <div class="task-description">{{ taskData.text }}</div>

        <div class="answer-block">
          <FormWithErrors
            ref="formAnswer"
            v-if="taskData.typeId === TaskTypeIds.online"
            :fields="formItems"
            :loading="loading"
            submit-text="Отправить"
            @success="(data) => sendTextAnswer(data.answer)"
          ></FormWithErrors>

          <DragNDropLoader v-else-if="taskData.typeId === TaskTypeIds.photo"
                           class="image-loader"
                           @load="updateAvatar"
                           :crop-size="cropSize"
                           :compress-size="compressSize"
          >
            <button class="upload-photo">Загрузить фото</button>
          </DragNDropLoader>

          <button v-else-if="taskData.typeId === TaskTypeIds.tripToNOC || taskData.typeId === TaskTypeIds.withActor" class="QR-button" @click="openQR()">Сканировать QR-код</button>
        </div>
      </div>
      <button class="hint-button" @click="showHint()">Подсказка</button>
    </div>
  </div>
</template>


<script>
import vue3autocounter from 'vue3-autocounter';
import CircleLoading from "../components/CircleLoading.vue";
import FormWithErrors from "../components/FormWithErrors.vue";
import DragNDropLoader from "../components/DragNDropLoader.vue";
import ImageUploader from "../utils/imageUploader";


export default {
  components: {FormWithErrors, CircleLoading, vue3autocounter, DragNDropLoader},

  data() {
    return {
      formItems: {
        answer: {
          title: 'Поле для ввода ответа',
          name: 'answer',
          placeholder: 'Ваш ответ'
        }
      },

      taskData: {
        title: undefined,
        text: undefined,
        typeId: undefined,
        typeName: undefined,
        minPoints: undefined,
        maxPoints: undefined,
        timeAllotted: undefined,
        timeStarted: undefined,
        hintsTaken: [], // [{title, text, pointsPenalty}, ...]
      },
      prevTaskPoints: 0,
      totalTaskPoints: 0,

      TaskTypeIds: {
        online: 0,
        photo: 1,
        tripToNOC: 2,
        withActor: 3,
      },

      ImageUploader: new ImageUploader(this.$popups, this.$api.uploadImage, IMAGE_ACHIEVEMENT_MAX_RES, IMAGE_MAX_RES),
      updatingTotalPointsInterval: undefined,
      loading: false,
    }
  },

  mounted() {
    this.getTask();
    this.updatingTotalPointsInterval = setInterval(this.updateTotalTaskPoints, 1000);
  },
  unmounted() {
    clearInterval(this.updatingTotalPointsInterval);
  },

  methods: {
    async getTask() {
      const {data, code, ok} = this.$api.getTask();
      if (!ok) {
        this.$popups.error("Ошибка", "Не удалось получить задание");
        this.$router.push({name: 'profile'});
        return;
      }
      this.taskData.title = String(data.title);
      this.taskData.text = String(data.text);
      this.taskData.typeId = Number(data.typeId);
      this.taskData.typeName = String(data.typeName);
      this.taskData.minPoints = Number(data.minPoints);
      this.taskData.maxPoints = Number(data.maxPoints);
      this.taskData.timeAllotted = Number(data.timeAllotted);
      this.taskData.timeStarted = new Date(data.timeStarted);
      this.taskData.hintsTaken = data.hintsTaken;
    },

    async sendTextAnswer(answer) {
      const {data, code, ok} = this.$api.answerTask(answer);
      if (!ok) {
        this.$refs.formAnswer.setError(this.formItems.answer, 'Ответ неверен');
        return;
      }
      this.$popups.success('Верно!', `Начислено ${this.totalTaskPoints}`);
      this.$router.push({name: 'profile'});
    },

    updateTotalTaskPoints() {
      const totalHintsPointsPenalty = this.taskData.hintsTaken.reduce((penalty, hint) => penalty + hint.pointsPenalty, 0);
      const secondsGone = Number((new Date()) - this.taskData.timeStarted) / 1000;
      const possiblePoints = (this.taskData.maxPoints - this.taskData.minPoints);
      const pointsGone = (secondsGone / this.taskData.timeAllotted) * possiblePoints;
      const timePoints = possiblePoints - pointsGone;
      this.prevTaskPoints = this.totalTaskPoints;
      this.totalTaskPoints = totalHintsPointsPenalty + timePoints;
    },

    async updateAvatar(dataURL) {
      // this.loading = true;
      const imageId = await this.ImageUploader.upload(dataURL);
      // this.loading = false;
      if (imageId === undefined)
        return;

      const res = await this.deleteAvatar();

      this.achievement.imageid = imageId;
      await this.saveAvatar();
    },
  }
}
</script>
