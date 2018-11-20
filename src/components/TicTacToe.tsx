import * as React from 'react'
import { range, flatten } from 'lodash'

import { Field } from './Field'

interface FieldIndex {
  f: string,
  i: number
}

interface TicTacToeState {
  score: {
    o: number,
    x: number,
  }
  gameIsFinished: boolean,
  currentPlayer: string,
  lastResult: string
  fields: string[]
}

const boardStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  maxWidth: 300,
}

const resetStyle = {
  backgroundColor: '#ccc',
  display: 'inline-block',
  margin: '10px',
  padding: '10px',
} 

export class TicTacToe extends React.Component<{}, TicTacToeState> {
  
  state = {
    currentPlayer: 'X',
    fields: new Array(9).fill(''),
    gameIsFinished: false,
    lastResult: 'No game played yet.',
    score: { o: 0, x: 0 },
  }

  render() {
    const TicTacToeFields = () => this.renderFields()
    return <>
      <p>Score</p>
      <p> X: {this.state.score.x}</p>
      <p> O: {this.state.score.o}</p>
      <p>Current Player: {this.state.currentPlayer}</p>
      <p>Last Result: {this.state.lastResult}</p>
      <div style={resetStyle} onClick={() => this.resetGame()}>Reset</div>
      <TicTacToeFields />
    </>
  }

  resetGame() {
    this.setState({ gameIsFinished: false, fields: new Array(9).fill('')})
  }

  renderFields(): JSX.Element {
    const addField = (v: number, h: number) => () => this.renderField(v, h)
    const fields = flatten(range(3).map(h => range(3).map(v => addField(v, h))))
    return <div style={boardStyle}>{fields.map((field: any) => field())}</div>
  }

  renderField(ver: number, hor: number) {
    const content = this.state.fields[ver+3*hor]
    const click = () => this.checkForValidClick(ver, hor)
    return <Field click={click} ver={ver} hor={hor} content={content} />
  }

  checkForValidClick (ver: number, hor: number) {
    const fields = this.state.fields
    const clickable = fields[3*hor+ver] === '' && !this.state.gameIsFinished 
    return clickable ? this.handleFieldClick(fields, ver, hor) : 'NOOP' 
  }

  handleFieldClick(fields: string[], ver: number, hor: number) {
    fields[3*hor+ver] = this.state.currentPlayer
    const currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X'
    this.setState({ currentPlayer, fields })
    this.checkForWinner()
  }

  checkForWinner() {
    const fields: string[] = this.state.fields
    const xs: number[] = []
    const os: number[] = []
    const addXs = (f: string, i: number) => f === 'X' ? xs.push(i) : 'NOOP'
    const addOs = (f: string, i: number) => f === 'O' ? os.push(i) : addXs(f, i) 
    fields.forEach((field, index) => addOs(field, index))
    const winner = checkVictory(os) ? 'O' : checkVictory(xs) ? 'X' : undefined 
    const isTie = !winner && xs.length + os.length === 9
    winner ? this.addWin(winner) : isTie ? this.addTie() : 'NOOP'
  }

  addTie() {
    this.setState({gameIsFinished: true, lastResult: 'Tie'})
  }

  addWin(winner: string) {
    const oWins = winner === 'O' ? this.state.score.o + 1 : this.state.score.o
    const xWins = winner === 'X' ? this.state.score.x + 1 : this.state.score.x 
    const score = { o: oWins, x: xWins }
    const lastResult = `${winner} has won.`
    this.setState({ gameIsFinished: true, lastResult, score})
  }
}

const winnigCombinations: Array<[number, number, number]> = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,4,6], [2,5,8], [3,4,5], [6,7,8]]

function checkVictory(playerFields: number[]): boolean {
  let hasWon = false
  const found = (n: number) => playerFields.indexOf(n) > -1
  const checkFields = (c: number[]) => found(c[0]) && found(c[1]) && found(c[2])
  const checkCombo = (c: number[]) => checkFields(c) ? hasWon = true : 'NOOP'
  winnigCombinations.forEach(checkCombo)
  return hasWon
}
