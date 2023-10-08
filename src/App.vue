<style lang="stylus" scoped>
@require '../src/styles/constants.styl'

/**
 Атрибут scoped позволяет определять стили, влияющие на html-элементы
 только в этом же компоненте, и ни в каких других.

 Атрибут lang говорит на каком препроцессоре мы пишем css. Я выбираю stylus.
 На stylus не нужны символы {};: вместо них важны отступы.
 И можно делать вложенные элементы, что является отличной заменой БЭМ.
 **/
.bg
  position fixed
  width 100%
  height 100%
  background colorBgLightMax
.background-text-image
  position fixed
  width 100%
  height 100%
  object-fit cover
  opacity 0.5
.bauman-image
  position fixed
  height 100%
  bottom -6%
  transform translateX(-8%)
  object-fit contain
  overflow visible
  opacity 1
.logo
  position fixed
  object-fit contain
  overflow visible
  right 0
  bottom 0
  justify-content right
  height 80px
  mix-blend-mode difference
  z-index 99999999
  pointer-events none

.wrapper
  width 100%
  min-height 100vh

.wrapper > *
    position absolute
    width 100%
    min-height 100vh
</style>

<template>
  <div class="bg"></div>
  <img class="background-text-image" src="../src/res/images/BackgroundPatternSmaller.png" alt="background">
  <img class="bauman-image" src="../src/res/images/Bauman.png" alt="Bauman">
  <img src="./res/images/Gerbs.png" class="logo" alt="crest">
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <transition name="scale-in">
        <component :is="Component"/>
      </transition>
    </router-view>
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
  overflow: hidden;
  animation: scale-in .2s ease;
}
.scale-in-leave-active {
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

  async mounted() {
    const global = getCurrentInstance().appContext.config.globalProperties;
    // Прописываем в глобавльные свойства частоиспользуемые компоненты, чтобы они были доступны из любых других компонентов
    global.$user = this.$store.state.user;
    global.$modals = this.$refs.modal;
    global.$popups = this.$refs.popups;
    global.$app = this; // это обычно не используется, но может пригодиться
    global.$api = new API();
  },
};
</script>
