import * as React from 'react'
import { renderRoutes } from 'react-router-config'
import * as Pages from './pages'
import { MapLocationProps, Status } from './lib/pages'

const routes = [
  {
    component: MapLocationProps(Pages.FirstPage),
    exact: true,
    loadData: Pages.loadData,
    path: '/year',
  },
  {
    component: MapLocationProps(Pages.FirstPage),
    exact: true,
    loadData: Pages.loadData,
    path: '/year/:id',
  },
  {
    component: MapLocationProps(Pages.Main),
    exact: true,
    path: '/',
  },
  {
    component: () => <Status code="404" />,
  },
]

class App extends React.Component<{ data?: object }> {
  render() {
    const data = this.props.data
    return renderRoutes(routes, { data })
  }
}

export default App
export { routes }
