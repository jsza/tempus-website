import React from 'react'
import { connect } from 'react-redux'
import {
  loadMapOverview,
  selectVideo
} from './actions'

import {Switch, Route, Redirect} from 'react-router'

import DocumentTitle from 'react-document-title'

import Throbber from 'root/components/Throbber'
import MapOverviewNav from './components/MapOverviewNav'
import Overview from './scenes/Overview'
import Leaderboards from './scenes/Leaderboards'
import Authors from './scenes/Authors'

import Background from './components/Background'
import Header from './components/Header'

import './styles.styl'


function MapOverview({ data, fetching, leaderboard, match }) {
  if (fetching || !data) {
    return (
      <div className="container" style={{ background: 'white' }}>
        <Throbber />
      </div>
    )
  }
  const mapName = data.getIn(['map_info', 'name'])
  // const bgStyle = {}

  return (
    <DocumentTitle title={`Tempus - ${mapName}`}>
      <section className="MapOverview">
        <Background mapName={mapName} />
        <Header data={data} match={match} />
        <div className="MapOverview-body flex-row" style={{justifyContent: 'center'}}>
          <div className="col" style={{flex: '0 0 270px'}}>
            <MapOverviewNav data={data} />
          </div>
          <div className="col" style={{flex: '0 0 1170px'}}>
            <Switch>
              <Redirect from={`${match.url}`} to={`${match.url}/leaderboards`} exact={true} />
              <Route
                path={`${match.url}/leaderboards`}
                component={Leaderboards} />
              <Route
                path={`${match.url}/authors`}>
                <Authors authors={data.get('authors')} />
              </Route>
              <Route
                exact path={`${match.url}`}
                component={Overview}>
              </Route>
              <Route>
                No such resource.
              </Route>
            </Switch>
          </div>
          <div className="col" style={{flex: '0 0 300px', display: 'block'}} />
        </div>
      </section>
    </DocumentTitle>
  )
}

function mapStateToProps(state) {
  const { mapOverview } = state.app.mapOverview
  return mapOverview.toObject()
}

export default connect(
  mapStateToProps,
  { loadMapOverview, selectVideo }
)(MapOverview)
