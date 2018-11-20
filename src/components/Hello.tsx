import * as React from 'react'

export interface HelloProps { 
  who: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  render() {
      // equals to 
      // return React.createElement('h1', {}, 'Hello ' + this.props.who + '!')
      return <h1>Hello {this.props.who}!</h1>
  }
}