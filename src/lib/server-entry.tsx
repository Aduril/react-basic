import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { default as App, routes } from '../App'
import { StageProvider, TLDProvider } from './providers'
import { HTMLBuilder } from './builder'
import { Omit } from './interfaces'
import { initialData } from './loader'

export interface IAppXDomParams extends Omit<IRender, 'template'> {
  routerContext: object
  data: object
}

const appXDOM = ({
  data,
  routerContext,
  path,
  query,
  tld,
  stage,
}: IAppXDomParams) => {
  return (
    <StageProvider value={stage}>
      <TLDProvider value={tld}>
        <StaticRouter
          location={{ pathname: path, search: query }}
          context={routerContext}
        >
          <App data={data} />
        </StaticRouter>
      </TLDProvider>
    </StageProvider>
  )
}

export interface IRender {
  template: string
  path: string
  query: string
  stage: 'test' | 'prod'
  tld: 'CH' | 'DE' | 'AT'
}

export interface IRenderResult {
  html: string
}
const render = async ({
  template,
  path,
  query,
  stage = 'prod',
  tld = 'DE',
}: IRender): Promise<IRenderResult> => {
  const data = await initialData({ appRoutes: routes, path, query, stage })
  const routerContext: any = {}

  const renderedApp = renderToString(
    appXDOM({ data, routerContext, path, query, tld, stage })
  )
  if (routerContext.status === '404') {
    throw { code: '404' }
  }

  const builder = new HTMLBuilder(template)
  builder.applyAppHtml(renderedApp)
  builder.applyStyling()
  builder.applyHead()
  builder.applyConfig(stage, tld)
  builder.applyData(data)

  return { html: builder.html }
}
export { render, appXDOM }
