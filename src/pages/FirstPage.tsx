import * as fetch from 'isomorphic-fetch'
import * as React from 'react'
import { style } from 'typestyle'
import { NestedCSSProperties } from 'typestyle/lib/types'

import { Hello } from '../components/Hello'
import { Switch } from '../components/Switch'
import { TicTacToe } from '../components/TicTacToe'

const divStyleObj : React.CSSProperties = { fontSize: '25px' }
const fancyStyleObj: NestedCSSProperties = {
  $nest: {
    '&:hover': {
      color: 'red'
    }
  },
  color: 'blue',
  fontWeight: 700,
  transition: 'color .8s',
}
const divStyle = style(divStyleObj)
const factStyle = style(divStyleObj, fancyStyleObj)

export class FirstPage extends React.Component<{}, {fact: string}> {
  state = {
    fact: ''
  }

  async componentDidMount() {
    const url = `http://numbersapi.com/random/year?json`
    const randomYearFact = await fetch(url)
    const factJson = await randomYearFact.json()
    this.setState({fact: factJson.text})
  }

  render() {
    return <>
      <Hello who={'IT Career Night'} color={'#3243F6'} />
      <TicTacToe />
      <Switch />
      <Switch on={true}/>
      <Switch on={false}/>
      <div className={divStyle}>
        <p>This is basically like writing html, but more like programming it</p>
      </div>
      <div className={factStyle}>
        Random fact: {this.state.fact}
      </div>
    </>
  }
}
