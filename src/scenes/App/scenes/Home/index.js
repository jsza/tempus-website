import React from 'react'
import {Row, Col, Tabs, Tab} from 'react-bootstrap'
import Activity from './scenes/Activity'
import Servers from './scenes/Servers'
import {Route, Switch, NavLink} from 'react-router-dom'

import './styles.styl'


export default class Home extends React.Component {
  render() {
    return (
      <div className="Home app-container">
        <div className="overview-header-container container">
          <div className="header-image-container">
            <div className="header-image" />
          </div>

        </div>
        <nav className="Home-nav container">
          <NavLink to="/servers">Servers</NavLink>
          <NavLink to="/activity">Activity</NavLink>
          <a>About</a>
        </nav>
        <div className="Home-body container">
          <div className="Home-content">
            <Route exact path="/" component={Servers} />
            <Route path="/servers" component={Servers} />
            <Route path="/activity" component={Activity} />
          </div>
        </div>
      </div>
    )
  }
}
