// import { cellOptions } from "./enums";


// export class gameManager {

//     private humanPlayerName: string = 'Player1';
//     private isComputerTurn: boolean;
//     private board: Array<cellOptions[]>;

//     constructor() {
//         this.isComputerTurn = Boolean(Math.round(Math.random()))
//         this.board = this.createNewBoard()
//     }

//     get playerName() {
//         return this.humanPlayerName
//     }

//     get currentPlayer() {
//         return this.isComputerTurn
//     }

//     get currentBoardState() {
//         return this.board
//     }

//     createNewBoard(): Array<cellOptions[]> {
//         const board: Array<cellOptions[]> = []
//         for (var i = 0; i < 3; i++) {
//             const row: cellOptions.EMPTY[] = []
//             for (var j = 0; j < 3; j++) {
//                 row.push(cellOptions.EMPTY)
//             }
//             board.push(row)
//         }
//         return board;
//     }

//     setPlayerName(name: string) {
//         this.humanPlayerName = name;
//     }

// }