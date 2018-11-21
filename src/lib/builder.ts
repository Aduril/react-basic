import { Helmet } from 'react-helmet'
import { getStyles } from 'typestyle'
import { TStage, TTld } from './interfaces'

export class HTMLBuilder {
  html: string
  constructor(html: string) {
    this.html = html
  }
  applyAppHtml(appHtml: string) {
    this.html = this.html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    )
  }
  applyStyling() {
    const newStyles = `<style id="styles-target">${getStyles()}</style>`
    this.html = this.html.replace('</head>', `${newStyles}</head>`)
  }
  applyHead() {
    const helmet = Helmet.renderStatic()
    const header =
      helmet.title.toString() +
      helmet.base.toString() +
      helmet.link.toString() +
      helmet.meta.toString() +
      helmet.noscript.toString() +
      helmet.script.toString() +
      helmet.style.toString()
    this.html = this.html.replace('<head>', `<head>${header}`)
    this.html = this.html.replace(
      '<html',
      `<html ${helmet.htmlAttributes.toString()}`
    )
    this.html = this.html.replace(
      '<body',
      `<body ${helmet.bodyAttributes.toString()}`
    )
  }
  applyConfig(stage: TStage, tld: TTld) {
    const conf = JSON.stringify({ stage, tld })
    const script = `<script>window.__CONF__=${conf}</script>`
    this.html = this.html.replace('<head>', `<head>${script}`)
  }
  applyData(data: object) {
    const serializedData = JSON.stringify(data)
    const script = `<script>window.__DATA__=${serializedData}</script>`
    const clientScriptPos = '<script type="text/javascript" src="/'
    this.html = this.html.replace(
      clientScriptPos,
      `${script}${clientScriptPos}`
    )
  }
}
