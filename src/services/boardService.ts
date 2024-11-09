import { cellOptions } from "@/enums"
import { endStates } from "@/enums/endStates"
import { endStatesTable } from "@/helpers/endStatesTable"
import { IEndStatesTable } from "@/interfaces/iEndStatesTable"



function createNewBoard(): Array<cellOptions[]> {
    const board: Array<cellOptions[]> = []
    for (let i = 0; i < 3; i++) {
        const row: cellOptions.EMPTY[] = []
        for (let j = 0; j < 3; j++) {
            row.push(cellOptions.EMPTY)
        }
        board.push(row)
    }
    return board;
}

function getBestMove(currentBoard: Array<cellOptions[]>, isMaximizing = true): { row: number, col: number } | null {
    let bestScore = -Infinity
    let bestMove = null
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (currentBoard && currentBoard[i][j] === cellOptions.EMPTY) {
                const boardCopy = JSON.parse(JSON.stringify(currentBoard))
                boardCopy[i][j] = isMaximizing ? cellOptions.X : cellOptions.O
                const score = minimax(boardCopy, !isMaximizing)
                if (score > bestScore) {
                    bestScore = score
                    bestMove = { row: i, col: j }
                }
            }
        }
    }
    return bestMove
}

function minimax(board: Array<cellOptions[]> | null, isMaximizing: boolean): any {
    if (!board) return
    const winner = checkWin(board)
    if (winner) {
        const score = endStatesTable[winner]
        return score
    }
    if (isMaximizing) {
        let bestScore = -Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board && board[i][j] === cellOptions.EMPTY) {
                    const boardCopy = JSON.parse(JSON.stringify(board))
                    boardCopy[i][j] = cellOptions.X
                    const score = minimax(boardCopy, false)
                    if (score > bestScore) {
                        bestScore = score
                    }
                }
            }
        }
        return bestScore
    } else {
        let bestScore = Infinity
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board && board[i][j] === cellOptions.EMPTY) {
                    const boardCopy = JSON.parse(JSON.stringify(board))
                    boardCopy[i][j] = cellOptions.O
                    const score = minimax(boardCopy, true)
                    if (score < bestScore) {
                        bestScore = score
                    }
                }
            }
        }
        return bestScore
    }
}

function checkWin(board: Array<cellOptions[]>): any {
    if (!board) return null
    let winner = null
    const [[leftTop, middleTop, rightTop],
        [leftMiddle, middleMiddle, rightMiddle],
        [leftBottom, middleBottom, rightBottom]] = board;

    //cross1 win
    if (areValuesEqual([leftTop, middleMiddle, rightBottom])) {
        winner = leftTop;
    }
    //cross2 win
    if (areValuesEqual([rightTop, middleMiddle, leftBottom])) {
        winner = rightTop
    }
    //row1 win
    if (areValuesEqual([leftTop, middleTop, rightTop])) {
        winner = leftTop
    }
    //row2 win
    if (areValuesEqual([leftMiddle, middleMiddle, rightMiddle])) {
        winner = leftMiddle
    }
    //row3 win
    if (areValuesEqual([leftBottom, middleBottom, rightBottom])) {
        winner = leftBottom
    }
    //col1 win
    if (areValuesEqual([leftTop, leftMiddle, leftBottom])) {
        winner = leftTop
    }
    //col2 win
    if (areValuesEqual([middleTop, middleMiddle, middleBottom])) {
        winner = middleTop
    }
    //col3 win
    if (areValuesEqual([rightTop, rightMiddle, rightBottom])) {
        winner = rightTop
    }
    if (winner) {
        return winner
    }
    if (checkIfEmptyCells(board)) {
        return null
    }
    return endStates.TIE
}

function checkIfEmptyCells(board: Array<cellOptions[]>) {
    if (board) {
        return board.some(row => {
            return row.some(cell => {
                return cell === cellOptions.EMPTY
            })
        })
    }
}

function areValuesEqual(values: Array<cellOptions>) {
    for (let i = 1; i < values.length; i++) {
        if (values[i] === cellOptions.EMPTY || values[i] !== values[i - 1])
            return false;
    }
    return true;
}

export const boardService = {
    createNewBoard,
    getBestMove,
    checkWin
}