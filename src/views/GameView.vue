<template>
  <div class="game-view-wrapper">
    <div class="game-info">
      <span
        class="human-player"
        :class="{ 'active-player': currentPlayer === humanPlayer }"
        >{{ humanPlayerName }}</span
      >
      <span
        class="computer-player"
        :class="{ 'active-player': currentPlayer === computerPlayer }"
        >Computer</span
      >
    </div>
    <GameBoard @onMakeMove="makeMove" :board="board" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { boardService } from "@/services/boardService";
import { cellOptions } from "@/enums";
import GameBoard from "@/components/GameBoard.vue";
import { endStates } from "@/enums/endStates";

export default defineComponent({
  created() {
    this.initGame();
    // store.commit("toggleModal", { value: true, text: "Modal testingggg" });
  },
  data(): {
    board: Array<cellOptions[]>;
    isGameOn: boolean;
    humanPlayerName: string;
    currentPlayer: cellOptions;
    computerPlayer: cellOptions;
    humanPlayer: cellOptions;
  } {
    return {
      board: [],
      isGameOn: false,
      humanPlayerName: "Player1",
      currentPlayer: cellOptions.O,
      computerPlayer: cellOptions.X,
      humanPlayer: cellOptions.O,
    };
  },
  methods: {
    initGame() {
      this.board = boardService.createNewBoard();
      this.isGameOn = true;
      this.currentPlayer = cellOptions.O;
    },
    makeMove(row: number, col: number, isHuman: boolean): void {
      const isComputer = this.computerPlayer === this.currentPlayer;
      if ((isComputer && isHuman) || !this.isGameOn) return;
      if (this.board && this.board[row][col] !== cellOptions.EMPTY) {
        return;
      }
      const newBoard = [...this.board];
      newBoard[row][col] = this.currentPlayer;
      this.board = newBoard;
      this.checkGameStatus();
    },
    switchPlayer(): void {
      this.currentPlayer =
        this.currentPlayer === cellOptions.X ? cellOptions.O : cellOptions.X;
    },
    checkGameStatus() {
      const winner = boardService.checkWin(this.board);
      if (!winner) {
        this.switchPlayer();
        return;
      } else if (winner !== endStates.TIE) {
        if (winner === this.computerPlayer) {
          setTimeout(() => {
            alert("Computer wins!");
          }, 1000);
        } else {
          setTimeout(() => {
            alert(`${this.humanPlayerName} wins!`);
          }, 1000);
        }
        this.isGameOn = false;
        return;
      }
      this.isGameOn = false;
      setTimeout(() => {
        alert("It's a tie!");
      }, 1000);
    },
  },
  watch: {
    currentPlayer(player) {
      if (player === this.computerPlayer) {
        const move = boardService.getBestMove(this.board);
        if (!move) return;
        setTimeout(() => {
          this.makeMove(move.row, move.col, false);
        }, 1000);
      }
    },
  },
  components: {
    GameBoard,
  },
});
</script>

<style lang="scss" scoped>
.game-view-wrapper {
  padding: 0 2rem;
  .game-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    position: relative;
    gap: 1.2rem;
    & .human-player,
    & .computer-player {
      font-size: 1.8rem;
      padding: 8px 16px;
      border-radius: 8px;
      transition: background-color 0.2s ease;
      @extend .fancy-text;
    }

    & .active-player {
      background-color: $vue-black;
    }
  }
}
</style>
