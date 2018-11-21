const express = require('express')
const webpack = require('webpack')
const webpackIsomorphicDevMiddleware = require('webpack-isomorphic-dev-middleware')
const prodConf = require('./webpack.dev.ssr.config')
const { URL } = require('url')

const compiler = webpack(prodConf)
const app = express()

app.use(webpackIsomorphicDevMiddleware(compiler))
app.get('/favicon.ico', (_, res) => {
  res.send()
})
app.get('*', async (req, res, next) => {
  const { render } = res.locals.isomorphic.exports
  const template = res.locals.isomorphic.compilation.clientStats.compilation.assets[
    'index.html'
  ].source()
  const { pathname, search } = new URL(req.url, 'https://dummy.de')
  try {
    const { html } = await render({
      template,
      path: pathname,
      query: search,
    })
    res.send(html)
  } catch (err) {
    setImmediate(() => next(err))
  }
})
app.listen(3000, () => console.log('Listening on port 3000!'))
