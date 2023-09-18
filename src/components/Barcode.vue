<style lang="stylus" scoped>
/**
   Этот компонент оставляю тут для примера того, как в идеале надо писать компоненты,
   И что вообще умеют компоненты во Vue.JS. Этот компонент в проекте не нужен.
 **/

@require '../styles/constants.styl'

.barcode
  --color white
  --color-bg transparent

  border 2px solid var(--color)
  border-radius 10px
  background var(--color-bg)
  padding 5px
  user-select none
  .cell
    fill var(--color)
  .data-text
    stroke none
    fill var(--color)
    font-family monospace
</style>

<template>
  <svg class="barcode"
       :viewBox="`0 0 ${totalWidth} ${totalHeight + (data ? totalHeight / 8 * 5 : 0)}`"
       :style="{
         '--color': color,
         '--color-bg': colorBg,
       }"
  >
    <rect class="cell"
          v-for="cell in cellsConfig"
          :x="cell[0]"
          :width="cell[1]"
          :y="0"
          :height="totalHeight"
    ></rect>

    <text class="data-text"
          :x="totalWidth / 2"
          :y="totalHeight"
          :font-size="totalHeight / 8 * 5"
          alignment-baseline="before-edge"
          dominant-baseline="text-before-edge"
          text-anchor="middle"
          :letter-spacing="totalWidth / (data?.length || 13) / 5"
    >{{ data }}</text>
  </svg>
</template>

<script>
const HEIGHT = 10;

export default {
  props: {
    cells: {
      type: Array,
      default: [
        [1, 1],
        [1, 2],
        [2, 1],
        [2, 2],
        [5, 2],
        [2, 2],
        [1, 2],
        [1, 2],
        [2, 1],
        [5, 2],
        [1, 2],
        [1, 1],
        [2, 1],
        [5, 1],
        [2, 1],
        [2, 2],
        [1, 1],
        [1, 0]
      ]
    },

    data: String,
    color: String,
    colorBg: String,
  },

  data() {
    return {
      cellsConfig: [],

      totalWidth: 0,
      totalHeight: 0,
    }
  },

  mounted() {
    this.generateCellsConfig();
  },

  methods: {
    generateCellsConfig() {
      let curX = 0;
      this.cells.forEach(cell => {
        this.cellsConfig.push([curX, cell[0]]);
        curX += cell[0] + cell[1];
      });

      this.totalWidth = curX;
      this.totalHeight = HEIGHT;
    }
  },

  watch: {
    cells(from, to) { this.generateCellsConfig(); }
  }
}
</script>

