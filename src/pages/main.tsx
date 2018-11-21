import * as React from 'react'

import { TicTacToe } from '../components'


export class Main extends React.Component {
  render() {
      return <React.Fragment>
          <h1>Wanna play TicTacToe?</h1>
          <TicTacToe />
        </React.Fragment>
  }
}