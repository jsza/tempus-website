import React from 'react'
import cx from 'classnames'
import {prettyZoneName} from 'root/utils/TempusUtils'
import {LinkContainer} from 'react-router-bootstrap'
import {Redirect} from 'react-router-dom'
import {DropdownButton, MenuItem} from 'react-bootstrap'
import {connect} from 'react-redux'
import {loadActivity} from './actions'
import ActivityList from './components/ActivityList'
import {Route, Switch, NavLink} from 'react-router-dom'

import './styles.styl'


class Activity extends React.Component {
  componentDidMount() {
    this.props.loadActivity()
  }

  render() {
    if (!this.props.data || this.props.fetching) {
      return (
        <div>
          {this.props.location.pathname === this.props.match.url
            ? <Redirect to={'/activity/all'} />
            : null
          }
          Loading...
        </div>
      )
    }

    const buttonTitle =
      <span>
        Filters
      </span>

    const {match} = this.props

    return(
      <div className="App-Home-Activity">
        {this.props.location.pathname === this.props.match.url
          ? <Redirect to={'/activity/all'} />
          : null
        }
        <header className="clearfix">
          <h3>
            World Records
          </h3>
          <span className="zone-type-selection">
            <DropdownButton pullRight title={buttonTitle} bsStyle="default">
              <LinkContainer to="/activity/all">
                <MenuItem>
                  All
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/activity/map">
                <MenuItem>
                  Map
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/activity/course">
                <MenuItem>
                  Course
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/activity/bonus">
                <MenuItem>
                  Bonus
                </MenuItem>
              </LinkContainer>
            </DropdownButton>
          </span>
        </header>
        <div>
          <Route exact path={`${match.url}/all`} component={(p)    => <ActivityList {...p} data={this.props.data} zoneType="all" />} />
          <Route exact path={`${match.url}/map`} component={(p)    => <ActivityList {...p} data={this.props.data} zoneType="map" />} />
          <Route exact path={`${match.url}/course`} component={(p) => <ActivityList {...p} data={this.props.data} zoneType="course" />} />
          <Route exact path={`${match.url}/bonus`} component={(p)  => <ActivityList {...p} data={this.props.data} zoneType="bonus" />} />
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {activity} = state
  const {fetching, error, data} = activity
  return {fetching, error, data}
}


export default connect(
  mapStateToProps,
  {loadActivity}
)(Activity)
