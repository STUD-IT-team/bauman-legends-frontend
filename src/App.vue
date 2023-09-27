

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"/>
  </router-view>
</template>


<script>
import {getCurrentInstance} from "vue";
import API from "~/api";


export default {
  mounted() {
    const global = getCurrentInstance().appContext.config.globalProperties;
    global.$api = new API();
  }
};
</script>
