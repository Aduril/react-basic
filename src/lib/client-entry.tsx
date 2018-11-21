import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { setStylesTarget } from 'typestyle'

import App from '../App'

const data = (window as any).__DATA__

ReactDOM.hydrate(
  <BrowserRouter>
    <App data={data} />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)
setStylesTarget(document.getElementById('styles-target')!)
