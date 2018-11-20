import * as React from 'react'
import { style } from 'typestyle'

export interface FieldProps {
  click: Function,
  content: string
  hor: number,
  ver: number,
}


export class Field extends React.Component<FieldProps> {

  render(): JSX.Element {
    const click = () => this.props.click()
    const divStyle = getFieldStyle(this.props.ver, this.props.hor)
    return <div className={divStyle} onClick={click}>{this.props.content}</div>
  }
}

function getFieldStyle(ver: number, hor: number): any {
  const styleObj = {
    alignItems: 'center',
    borderBottom: hor === 2 ? '' : '1px solid',
    borderLeft: ver === 0 ? '' : '1px solid',
    borderRight: ver === 2 ? '' : '1px solid',
    borderTop: hor === 0 ? '' : '1px solid',
    display: 'flex',
    fontSize: 20,
    gridColumn: 'span 4',
    height: 100,
    justifyContent: 'center',
    minHeight: 100,
  }
  return style(styleObj)
}