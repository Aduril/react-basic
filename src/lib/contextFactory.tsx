import * as React from 'react'
import * as root from 'window-or-global'

export const configContextFactory = <Value extends any>(
  key: string,
  defaultValue: Value
) => {
  const inferredValue =
    root && root.__CONF__ && root.__CONF__[key]
      ? root.__CONF__[key]
      : defaultValue
  const Context = React.createContext<Value>(inferredValue)

  interface IValueProviderProps {
    value: Value
    children: any
  }
  interface IValueStateProps {
    value: Value
  }
  class ValueProvider extends React.Component<
    IValueProviderProps,
    IValueStateProps
  > {
    constructor(props: IValueProviderProps, ctx: any) {
      super(props, ctx)
      this.state = { value: props.value || inferredValue }
    }

    render() {
      return (
        <Context.Provider value={this.state.value}>
          {this.props.children}
        </Context.Provider>
      )
    }
  }
  const ValueConsumer = Context.Consumer

  const valueConsumerFactory = <T extends {}, B extends {}>(
    Component: React.ComponentType<T>
  ): React.ComponentType<B> => {
    return class extends React.PureComponent<B> {
      render() {
        return (
          <ValueConsumer>
            {(value: Value) => {
              const props: any = {}
              props[key] = value
              return <Component {...props} {...this.props} />
            }}
          </ValueConsumer>
        )
      }
    }
  }

  return { ValueProvider, ValueConsumer, valueConsumerFactory }
}
