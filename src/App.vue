<style lang="stylus" scoped>
@require '../src/styles/constants.styl'
@require '../src/styles/fonts.styl'
@require '../src/styles/utils.styl'

/**
 Атрибут scoped позволяет определять стили, влияющие на html-элементы
 только в этом же компоненте, и ни в каких других.

 Атрибут lang говорит на каком препроцессоре мы пишем css. Я выбираю stylus.
 На stylus не нужны символы {};: вместо них важны отступы.
 И можно делать вложенные элементы, что является отличной заменой БЭМ.
 **/

footer-height = 80px
footer-height-mobile = 55px
footer-height-small = 20px
footer-height-mobile-small = 30px

.background-text-image
  position fixed
  width 100%
  height 100%
  margin 0
  overflow hidden
  background-attachment fixed
  background-size cover
  background-repeat no-repeat
  object-fit cover
  opacity 0.5
  z-index -1
.bauman-image
  position fixed
  height 100%
  max-height 1000px
  max-width unset
  @media({mobile})
    max-height 600px
    &.small
      max-height 400px
  bottom -6%
  left unquote('max(calc(50% - 367px), 0px)')
  transform translateX(-14%)
  object-fit contain
  overflow visible
  opacity .7
  transition all 1s ease, opacity .5s ease
  pointer-events none
  &.transparent
    opacity 0
.logo
  position fixed
  object-fit contain
  overflow visible
  right 0
  bottom footer-height-small - 10px
  justify-content right
  height footer-height + 40px
  @media ({mobile})
    bottom footer-height-mobile-small - 10px
    height footer-height-mobile + 20px
  mix-blend-mode difference
  z-index 99999999
  pointer-events none
  transition all 0.2s ease
  &.small
    height footer-height
    bottom 0
    @media ({mobile})
      height footer-height-mobile

.all-page-wrapper
  width 100%
  min-height 100vh
  .content-wrapper
    width 100%
    min-height 100vh
    & > *
      //position absolute
      width 100%
      height 100%
      min-height 'calc(100vh - %s)' % footer-height
      margin-bottom footer-height
      @media({mobile})
        min-height 'calc(100vh - %s)' % footer-height-mobile
        margin-bottom footer-height-mobile

  .footer
    position fixed
    width 100%
    bottom 0
    height footer-height
    background colorBgDark
    transition all 0.2s ease
    padding 20px
    display flex
    gap 20px
    cursor pointer
    @media (max-width: 400px)
      flex-direction column

    @media ({mobile})
      padding-top 10px
      padding-bottom 10px
      height footer-height-mobile

    .title
      font-medium()
      color colorText3
      transition all 0.2s ease
      margin-bottom 5px
      @media ({mobile})
        margin-bottom 0
    .info
      font-small()
      color colorText4
      display flex
      align-items center
      gap 5px
      img
        width 20px
        height 20px

    &.small
      height footer-height-small
      padding-top 5px
      @media ({mobile})
        height footer-height-mobile-small
      .title
        color colorText5
        @media ({mobile})
          margin-bottom 10px
          font-small-extra()
      a
        pointer-events none

    @media ({desktop})
      &.small:hover
        height footer-height-small + 10px
      &:hover
        .title
          color colorText1
</style>

<template>
  <img class="background-text-image" src="../src/res/images/BackgroundPatternSmaller.png" alt="background">
  <img v-if="!isNoBaumanImage" class="bauman-image" src="../src/res/images/Bauman.png" alt="Bauman" :class="{small: isBaumanImageSmall, transparent: isBaumanTransparent}">
  <img src="./res/images/Gerbs.png" class="logo" alt="crest" :class="{small: isFooterShown}">
  <div class="all-page-wrapper">
    <div class="content-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="scale-in" duration="200"
          @after-enter="isBaumanTransparent = false"
          @before-leave="isBaumanTransparent = true"
        >
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
    <div class="footer" :class="{small: !isFooterShown}" @click="isFooterShown = !isFooterShown">
      <a href="https://vk.com/write-198373277" target="_blank">
        <div class="title">Техническая поддержка</div>
        <div class="info">
          <img src="../src/res/images/vk-logo.svg" alt="vk">Легенды Бауманки 2023
        </div>
      </a>
      <a>
        <div class="title">Сайт создан</div>
        <div class="info" style="gap: 0;">
          <img src="../src/res/images/vk-logo.svg" alt="tg" style="opacity: 0; max-width: 0;">
          IT-отделом СтудСовета
        </div>
      </a>
    </div>
  </div>

  <Modal ref="modal"></Modal>
  <Popups ref="popups"></Popups>
</template>


<style>
@keyframes scale-out {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
}
@keyframes scale-in {
  0% {
    transform: scale(1.05);
    opacity: 0;
  }
  25% {
    transform: scale(1.05);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.scale-in-enter-active {
  position: absolute;
  overflow: hidden;
  animation: scale-in .2s ease;
}
.scale-in-leave-active {
  position: absolute;
  overflow: hidden;
  animation: scale-out .2s ease;
}

.opacity-enter-active {
  animation: opacity .3s;
}
.opacity-leave-active {
  animation: opacity .3s reverse forwards;
}
@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<script>
import {getCurrentInstance} from "vue";
import Modal from "./components/vue-plugins/Modal.vue";
import Popups from "./components/vue-plugins/Popups.vue";
import API from "./utils/api";


export default {
  components: {Modal, Popups},

  data() {
    return {
      prevScrolledPos: 0,
      isFooterShown: false,
      isBaumanImageSmall: true,
      isNoBaumanImage: false,

      isBaumanTransparent: false,
    }
  },

  async mounted() {
    const global = getCurrentInstance().appContext.config.globalProperties;
    // Прописываем в глобавльные свойства частоиспользуемые компоненты, чтобы они были доступны из любых других компонентов
    global.$user = this.$store.state.user;
    global.$modals = this.$refs.modal;
    global.$popups = this.$refs.popups;
    global.$app = this; // это обычно не используется, но может пригодиться
    global.$api = new API();

    document.addEventListener('scroll', (event) => {
      if (window.scrollY < this.prevScrolledPos)
        this.isFooterShown = false;
      this.prevScrolledPos = window.scrollY;
    });
  },

  watch: {
    $route(to, from) {
      console.log(to.path)
      console.log(this.$router.resolve({name: 'login'}).fullPath)
      this.isBaumanImageSmall = !(
        to.path === this.$router.resolve({name: 'page404'}).fullPath ||
        to.path === this.$router.resolve({name: 'login'}).fullPath ||
        to.path === this.$router.resolve({name: 'register'}).fullPath ||
        to.path === this.$router.resolve({name: 'restorePassword'}).fullPath ||
        to.path === this.$router.resolve({name: 'changePassword'}).fullPath
      );
      this.isNoBaumanImage = (
        to.path === this.$router.resolve({name: 'admin'}).fullPath
      );
    }
  },
};
</script>
