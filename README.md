# React Basic

This is a repository to demonstrate some basic use cases for React. It was previously shown at IT Carrer Night 2018, Rostock and was enabled by [Gecko](https://www.gecko.de/?L=1).

**Special Thanks** to [@Harper](https://github.com/Harper04) for his guidance and help with the major problem of this boilerplate.

## Current state

This repository grew somewhat to a boilerplate for React projects, including a solution for routing, fetching data and server-side rendering pages. Feel free to use it for whatever project you're involved. 

## Tutorial

### Getting started

* Install Node8
* Install npm
* Run `npm i -g webpack-cli webpack` to install webpack globally

### Basics

* Run `git checkout tags/basic`
* You see a single component `src/components/Hello.tsx`
* `src/index.tsx` loads `Hello.tsx` and puts it into the container `example`
* The container `<div id="example" />` can be found in `index.html`
* To run the page just use `npm run build` and open the `index.html` in a browser

### State

* Run `git checkout tags/state`
* You see a new folder `pages`, that includes the file `FirstPage.tsx`
* `FirstPage` composes the components `Hello`, `Switch` and some default tags (`div`, `p`)
* `Switch` provides its own state, that will be changed on a clickEvent and can be bootstrapped by a property

### LifeCycle

* Run `git checkout tags/lifecycle`
* `FirstPage` was enhanced to load a string from [numbersapi.com](http://numbersapi.com/) and use it within `componentDidMount()`

### Typestyle

* Run `git checkout tags/typestyle`
* First page was enhanced for several style classes, which can be toggled
* typestyle can be used for css specific behaviors, like transitions, media queries, etc...

### Messy Example

* Run `git checkout tags/tictactoe-messy`
* We see a messy example of a TicTacToe game
* see it as a bad example

### Better Example

* Run `git checkout tag/tictactoe`
* is an example of a somewhat larger project
