<style scoped>
/**
 Атрибут scoped позволяет определять стили, влияющие на html-элементы
 только в этом же компоненте, и ни в каких других
 **/

.wrapper {
  width: 100%;
  min-height: 100vh;
}
.wrapper > * {
    position: fixed;
    width: 100%;
    min-height: 100vh;
}
</style>

<template>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
<!--      <transition name="scale-in">-->
        <component :is="Component"/>
<!--      </transition>-->
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


export default {
  components: {Modal, Popups},

  mounted() {
    const global = getCurrentInstance().appContext.config.globalProperties;

    // Прописываем в глобавльные свойства частоиспользуемые компоненты, чтобы они были доступны из любых других компонентов
    global.$modal = this.$refs.modal;
    global.$popups = this.$refs.popups;
    global.$app = this;
  },
};
</script>
