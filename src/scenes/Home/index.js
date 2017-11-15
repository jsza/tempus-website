import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Tabs, Tab} from 'react-bootstrap'
import Throbber from '../../components/Throbber'
import ActivityWRList from './components/ActivityWRList'
import ActivityTopList from './components/ActivityTopList'
import {loadActivity} from './services/activity/actions'

import Servers from './scenes/Servers'

import './styles.styl'


export class Home extends React.Component {
  componentDidMount() {
    this.props.loadActivity('map')
  }
  render() {
    var content
    if (!this.props.data || this.props.fetching) {
      content = (
        <div className="container app-container solid">
          <Throbber />
        </div>
      )
    }
    else {
      content = (
        <div className="Home-body container">
          <div className="Home-content">
            <div className="overview-panel">
              <div className="title">
              </div>
              <ActivityWRList data={this.props.data.get('map_wrs')} />
            </div>
            <Servers />
          </div>
        </div>
      )
    }
    return (
      <div className="Home app-container">
        <div className="overview-header-container container">
          <div className="header-image-container">
            <div className="header-image" />
          </div>

        </div>
        <nav className="Home-nav container">
          <a className="active" href="/activity">Activity</a>
          <a href="/servers">Servers</a>
          <a>About</a>
        </nav>
        {content}
      </div>
    )
  }
}
          // <div className="overview-panel">
          //   <div className="title">
          //     Course Records
          //   </div>
          //   <ActivityWRList data={this.props.data.get('course_wrs')} />
          // </div>


// <SteamAvatarContainer steamID="STEAM_0:0:14265062" size="mini" />


function mapStateToProps(state) {
  const {activity} = state
  const {fetching, error, data} = activity
  return {fetching, error, data}
}


export default connect(
  mapStateToProps,
  {loadActivity}
)(Home)
