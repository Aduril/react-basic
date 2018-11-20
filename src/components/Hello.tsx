import * as React from 'react'

export interface HelloProps { 
  color?: string,
  who: string
}


export class Hello extends React.Component<HelloProps, {}> {
  render() {
    const color = this.props.color || '#111111'
      return <h1 style={{color}}>Hello {this.props.who}</h1>
  }
}