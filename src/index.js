import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { App, Game, Leaderboard, Title } from './components'
import './styles/screen.sass'

const router = <Router history={browserHistory}>
  <Route component={App}>
    <Route path='/' component={Title} />
    <Route path='/game' component={Game} />
    <Route path='/scores' component={Leaderboard} />
  </Route>
</Router>

render(router, document.getElementById('root'))
