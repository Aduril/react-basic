# React Basic

This is a repository to demonstrate some basic use cases for React.

**Special Thanks** to [@Harper](https://github.com/Harper04) for his guidance and help with the major problem of this boilerplate.


## Getting started

* Install Node8
* Install npm
* Run `npm i -g webpack-cli webpack` to install webpack globally

## Basics

* Run `git checkout tags/basic`
* You see a single component `src/components/Hello.tsx`
* `src/index.tsx` loads `Hello.tsx` and puts it into the container `example`
* The container `<div id="example" />` can be found in `index.html`
* To run the page just use `npm run build` and open the `index.html` in a browser

## State

* Run `git checkout tags/state`
* You see a new folder `pages`, that includes the file `FirstPage.tsx`
* `FirstPage` composes the components `Hello`, `Switch` and some default tags (`div`, `p`)
* `Switch` provides its own state, that will be changed on a clickEvent and can be bootstrapped by a property

## LifeCycle

* Run `git checkout tags/lifecycle`
* `FirstPage` was enhanced to load a string from [numbersapi.com](http://numbersapi.com/) and use it within `componentDidMount()`