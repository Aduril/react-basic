import * as React from 'react'
import { Hello } from '../components/Hello';
import { Switch } from '../components/Switch';



export class FirstPage extends React.Component<{}, {}> {
  render() {
    return <>
      <Hello who={'IT Career Night'} color={'#3243F6'} />
      <Switch />
      <Switch on={true}/>
      <Switch on={false}/>
      <div>
        <Hello who={'again'} />
        <p>This is basically like writing html, but more like programming it</p>
      </div>
    </>
  }
}