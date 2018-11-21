import { get, noop } from 'lodash'
import { parse } from 'query-string'
import * as React from 'react'
import { Route } from 'react-router-dom'

export interface IPageProps {
  pathParams: {
    [index: string]: string | undefined
  }
  queryParams: {
    [index: string]: string | undefined
  }
  data?: any
}

export const MapLocationProps = (DecoratedComponent: any) => {
  return class extends React.PureComponent {
    render() {
      const pathParams = get(this.props, 'match.params', {})
      const query = get(this.props, 'location.search', '')
      const queryParams = parse(query)
      const mapped = {
        ...this.props,
        pathParams,
        queryParams,
      }
      return <DecoratedComponent {...mapped} />
    }
  }
}

export interface IStatus {
  code: string
  children?: React.ReactNode
}
export const Status = ({ code, children }: IStatus) => {
  const render = (props: any) => {
    props.staticContext ? (props.staticContext.status = code) : noop()
    return children || null
  }
  return <Route render={render} />
}
