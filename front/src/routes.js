import React from 'react'
import { Route } from 'react-router'
import Home from './containers/Home'
import InGame from './containers/InGame'

export default
<Route>
    <Route path="/" component={Home} />
    <Route path="/ingame" component={InGame} />
</Route>
