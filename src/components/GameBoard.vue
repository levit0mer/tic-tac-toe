<template>
  <div class="board-container">
    <template
      :v-if="board.length"
      class="row"
      v-for="(row, rowIndex) in board"
      :key="rowIndex"
    >
      <div
        class="cell"
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        @click="makeMove(rowIndex, cellIndex)"
      >
        <transition name="fade-in-down">
          <span v-if="cell !== 'EMPTY'">{{ cell }}</span>
        </transition>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    board: Array,
  },
  emits: ["onMakeMove"],
  methods: {
    makeMove(row: number, col: number): void {
      this.$emit("onMakeMove", row, col, true);
    },
  },
});
</script>

<style lang="scss" scoped>
.board-container {
  background-color: lighten($vue-green, 10%);
  border-radius: 16px;
  width: 300px;
  height: 300px;
  box-shadow: 0px 0px 25px 5px rgba(51, 51, 51, 0.2);
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  overflow: hidden;
  & .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    transition: background-color 0.2s ease;
    cursor: pointer;
    &:hover {
      background-color: lighten($vue-green, 20%);
    }

    &:not(:nth-child(7)):not(:nth-child(8)):not(:nth-child(9)) {
      border-bottom: 2px solid darken($vue-green, 2%);
    }
    &:not(:nth-child(3)):not(:nth-child(6)):not(:nth-child(9)) {
      border-right: 2px solid darken($vue-green, 2%);
    }
  }

  @include for-mobile-up {
    width: 350px;
    height: 350px;
    & .cell {
      font-size: 5rem;
    }
  }

  @include for-tablet-up {
    width: 400px;
    height: 400px;
    & .cell {
      font-size: 6rem;
    }
  }
}
</style>
