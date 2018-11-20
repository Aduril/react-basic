import * as React from 'react'

export interface SwitchProps { 
  on?: boolean
}

interface SwitchState {
  isOn: boolean
}

function getStyle(isActive: boolean) {
  return { 
  backgroundColor: isActive ? 'green' : 'red',
  display: 'inline-block',
  margin: '10px',
  padding: '10px',
  }
}

export class Switch extends React.Component<SwitchProps, SwitchState> {
  
  state = {
    isOn: this.props.on === true // true if 'on' is set true, otherwise false
  }

  render(): JSX.Element {
    const click = () => this.switch()
    const style = getStyle(this.state.isOn)
    return <div style={style} onClick={click}>{this.text()}</div>
  }

  text(): string {
    return this.state.isOn ? 'ON!' : 'OFF!'
  }

  switch(): void {
    this.setState({isOn: !this.state.isOn})
  }
}