import * as fetch from 'isomorphic-fetch'
import { get } from 'lodash'
import * as React from 'react'
import { style } from 'typestyle'
import { NestedCSSProperties } from 'typestyle/lib/types'

import { Hello } from '../components/Hello'
import { IPageProps } from '../lib/pages'
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
const factStyle = style(fancyStyleObj)

interface YearPageProps extends IPageProps {
  stage: 'test' | 'prod'
  pathParams: {
    id?: string
  }
}

interface YearPageState {
  fact: string
}

export class FirstPage extends React.Component<YearPageProps, YearPageState> {
  state = {
    fact: this.props.data ? this.props.data : ''
  }

  async componentDidMount() {
    if (this.state.fact === '') {
      await this.getNewFact()
    }
  }

  render() {
    const newFact = () => this.getNewFact()
    return <>
      <Hello who={'IT Career Night'} />
      <div className={factStyle} onClick={newFact}>
        Random fact: {this.state.fact}
      </div>
    </>
  }

  async getNewFact() {
    this.setState({fact: await loadData(this.props)})
  }
}

export async function loadData(props: YearPageProps): Promise<string> {
  const id = get(props,`pathParams.id`)
  const year = id === undefined ? 'random' : id
  const url = `http://numbersapi.com/${year}/year?json`  
  const res = await fetch(url)
  const json = await res.json()
  return json.text
}