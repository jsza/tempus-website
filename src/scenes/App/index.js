import React from 'react'

import ReactModal from 'react-modal'

import {withRouter, Route} from 'react-router-dom'

import Home from './scenes/Home'
import Maps from './scenes/Maps'
import MapOverview from './scenes/MapOverview'
import PlayerOverview from './scenes/PlayerOverview'
import PlayerLeaderboards from './scenes/PlayerLeaderboards'
import DemoOverview from './scenes/DemoOverview'
import RecordOverview from './scenes/RecordOverview'
import AuthorOverview from './scenes/AuthorOverview'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import './styles.styl'


ReactModal.setAppElement('#app')


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="content">
          <Navbar />

          <div className="App-container">
            <Route exact path="/" component={Home} />
            <Route path="/activity" component={Home} />
            <Route path="/servers" component={Home} />
            <Route exact path="/maps" component={Maps} />
            <Route path="/maps/:name" component={MapOverview} />
            <Route path="/players/:id" component={PlayerOverview} />
            <Route path="/ranks/:type" component={PlayerLeaderboards} />
            <Route path="/demos/:id" component={DemoOverview} />
            <Route path="/records/:id" component={RecordOverview} />
            <Route path="/authors/:id" component={AuthorOverview} />
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}


export default withRouter(App)
