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
        .image-preview
          width 100%
          object-fit scale-down
          background mix(colorBgDark, transparent, 80%)
          border-radius borderRadiusL
        .upload-photo
          button-no-fill()
          width 100%
          img
            width 25px
            height 25px
            margin-right 5px
        .QR-Scanner
          height 100%
          max-height 999px
          transition all 0.5s ease
          width 100%
          &.hidden
            max-height 0
            pointer-events none
            visibility hidden
            opacity 0
        .QR-result
          font-small()
          color colorText4
          margin-left 15%
          margin-bottom 3px
        .info
          font-medium()
          color colorText4
          margin-left 20px
          margin-bottom 3px
        .link-techsupport-button
        .QR-button
          button()
          align-items flex-end
          img
            width 25px
            height 25px
</style>

<template>
  <div class="root-task">
    <Header>
      <router-link :to="{name: 'profile'}">&lt; В профиль</router-link>
    </Header>
    <div class="main-content">
      <div class="box">
        <div class="task-header">
          <div class="title">{{ taskData.title }}</div>
          <vue3autocounter
            ref='counter'
            class="pts-value"
            :startAmount='0'
            :endAmount='taskData.maxPoints'
            :duration='2'
            prefix=''
            suffix=''
            separator=''
            decimalSeparator=','
            :decimals='0'
            autoinit
          ></vue3autocounter>
<!--            :startAmount='prevTaskPoints'-->
<!--            :endAmount='totalTaskPoints'-->
          <span class="pts">баллов</span>
        </div>
        <div class="info-block">
<!--          <div class="info">Баллы убывают со временем и при использовании подсказки</div>-->
          <div class="info">{{ taskData.typeName }}</div>
<!--          <div class="pts-possible">из {{ taskData.maxPoints }}</div>-->
        </div>

        <div class="task-description">
          <MarkdownRenderer :initial-text="taskData.text"></MarkdownRenderer>
        </div>

        <div class="answer-block">
          <DragNDropLoader v-if="taskData.answerTypeId === AnswerTypeIds.photo || taskData.answerTypeId === AnswerTypeIds.textPhoto"
                           class="image-loader"
                           @load="(imageDataUrl) => {answerImageDataURL = imageDataUrl}"
                           :crop-size="null"
                           :compress-size="IMAGES_MAX_RES"
          >
            <button class="upload-photo"><img src="../res/images/upload_file.svg" alt="">{{ answerImageDataURL ? 'Заменить другим' : 'Загрузить' }} фото</button>
          </DragNDropLoader>
          <transition name="opacity">
            <img v-if="answerImageDataURL" class="image-preview" :src="answerImageDataURL" alt="uploaded_image">
          </transition>

          <div v-if="taskData.answerTypeId === AnswerTypeIds.QR">
            <QRScanner ref="QRScanner" class="QR-Scanner" :class="{hidden: !isQRScannerOpened}" @scan="(data) => {stopQRScanner(); answerText = data}"></QRScanner>
            <div class="QR-result">Отсканировано: {{ answerText }}</div>
            <transition name="opacity" mode="out-in">
              <button v-if="!isQRScannerOpened" class="QR-button" @click="startQRScanner()">Сканировать QR-код</button>
              <button v-else class="QR-button" @click="stopQRScanner()">Закончить сканировать QR-код</button>
            </transition>
          </div>

          <FormWithErrors v-if="taskData.answerTypeId !== AnswerTypeIds.another"
                          ref="formAnswer"
                          :fields="(taskData.answerTypeId === AnswerTypeIds.text || taskData.answerTypeId === AnswerTypeIds.textPhoto) ? {answer: formItems.answer} : {}"
                          :loading="loading"
                          submit-text="Отправить"
                          @success="(data) => answer(data.answer)"
          ></FormWithErrors>

          <div v-if="taskData.answerTypeId === AnswerTypeIds.another">
            <div class="info">В качестве ответа необходимо прислать видео в сообщения группы легенд в VK. Не забудьте указать в сообщении ID команды</div>
            <a href="https://vk.com/write-198373277" target="_blank" class="link-techsupport-button"><img src="../res/images/external_link.svg" alt="">Отправить видео</a>
          </div>
        </div>
      </div>

<!--      <button class="hint-button" @click="showHint()">Подсказка</button>-->
    </div>
  </div>
</template>


<script>
import vue3autocounter from 'vue3-autocounter';
import CircleLoading from "../components/CircleLoading.vue";
import FormWithErrors from "../components/FormWithErrors.vue";
import DragNDropLoader from "../components/DragNDropLoader.vue";
import ImageUploader from "../utils/imageUploader";
import {AnswerTypeIds, HTTP, IMAGES_MAX_RES} from "../utils/constants";
import QRScanner from "../components/QRScanner.vue";
import MarkdownRenderer from "../components/Markdown/MarkdownRenderer.vue";
import Header from "../components/Header.vue";


export default {
  components: {Header, MarkdownRenderer, QRScanner, FormWithErrors, CircleLoading, vue3autocounter, DragNDropLoader},

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
        answerTypeId: undefined,
      },
      prevTaskPoints: 0,
      totalTaskPoints: 0,

      AnswerTypeIds: AnswerTypeIds,
      isQRScannerOpened: true,
      answerText: undefined,

      answerImageDataURL: undefined,
      ImageUploader: new ImageUploader(this.$popups, this.$api.uploadImage, null, IMAGES_MAX_RES),
      updatingTotalPointsInterval: undefined,
      loading: false,

      IMAGES_MAX_RES: IMAGES_MAX_RES,
    }
  },

  async mounted() {
    setTimeout(() => this.isQRScannerOpened = false, 1000);
    await this.getTask();
    this.$store.dispatch('SET_TASK', {
      points: this.taskData.maxPoints,
      timeFinish: Number(new Date(this.taskData.timeStarted)) / 1000 + this.taskData.timeAllotted,
    });
    // this.updateTotalTaskPoints();
    this.updatingTotalPointsInterval = setInterval(this.updateTotalTaskPoints, 1000);
  },
  unmounted() {
    clearInterval(this.updatingTotalPointsInterval);
  },

  methods: {
    async getTask() {
      const {data, code, ok} = await this.$api.getTask();
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
      this.taskData.answerTypeId = Number(data.answerTypeId);
    },

    // async sendTextAnswer(answer) {
    //   const {data, code, ok} = this.$api.answerTask(answer);
    //   if (!ok) {
    //     this.$refs.formAnswer.setError(this.formItems.answer, 'Ответ неверен');
    //     return;
    //   }
    //   this.$popups.success('Верно!', `Начислено ${this.totalTaskPoints}`);
    //   this.$router.push({name: 'profile'});
    // },

    updateTotalTaskPoints() {
      const totalHintsPointsPenalty = this.taskData.hintsTaken.reduce((penalty, hint) => penalty + hint.pointsPenalty, 0);
      const secondsGone = Number((new Date()) - this.taskData.timeStarted) / 1000;
      const possibleDiffPoints = (this.taskData.maxPoints - this.taskData.minPoints);
      const pointsGone = (secondsGone / this.taskData.timeAllotted) * possibleDiffPoints;
      const timePoints = this.taskData.minPoints + possibleDiffPoints - pointsGone;
      this.prevTaskPoints = this.totalTaskPoints;
      this.totalTaskPoints = totalHintsPointsPenalty + timePoints;
    },

    async answer(answerText=null) {
      let imageUrl = null;
      if (this.answerImageDataURL) {
        this.loading = true;
        imageUrl = await this.ImageUploader.upload(this.answerImageDataURL);
        this.loading = false;
        if (!imageUrl) {
          return;
        }
      }
      if (this.answerText) {
        answerText = this.answerText;
      }

      this.loading = true;
      const {data: answerData, code, ok} = await this.$api.answerTask(answerText, imageUrl);
      this.loading = false;
      if (code === HTTP.GONE) {
        this.$popups.alert("Срок задачи истек", "Ответ отправлен после истечения срока и засчитан как неверный");
      } else if (!ok) {
        this.$popups.error("Незвестная ошибка", "Не удалось загрузить ответ");
        return;
      }
      this.$popups.success("Ответ принят", "Баллы будут начислены после проверки ответа модераторами");
      this.$router.push({name: 'profile'});
    },
    startQRScanner() {
      this.isQRScannerOpened = true;
      this.$refs.QRScanner.start();
    },
    stopQRScanner() {
      this.isQRScannerOpened = false;
      this.$refs.QRScanner.stop();
    }
  }
}
</script>
