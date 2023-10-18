<style lang="stylus" scoped>
@require '../styles/constants.styl'

video
  max-width 100%
</style>

<template>
  <div>
    <video ref="video"></video>
  </div>
</template>

<script>
import QrScanner from "qr-scanner";


export default {
  emits: ['scan'],

  props: {
  },

  data() {
    return {
      text: null,

      active: false,
      _scanner: null,
    };
  },

  mounted() {
    this._scanner = new QrScanner(this.$refs.video, (result) => {
      this.$emit('scan', result.data);
    }, {highlightScanRegion: true});
  },

  unmounted() {
    this._scanner.destroy();
  },

  methods: {
    start() {
      if (!this.active) {
        this._scanner.start().then(
            () => {},
            (error) => {
              this.$modal.alert("Не предоставлены права доступа к камере", "Настройте доступ к камере для этого сайта в браузере");
            }
        );
        this.active = true;
      }
    },

    stop() {
      this._scanner.stop();
      this.active = false;
    },
  }
};
</script>
