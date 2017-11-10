import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Tabs, Tab} from 'react-bootstrap'
import Throbber from '../../components/Throbber'
import ActivityWRList from './components/ActivityWRList'
import ActivityTopList from './components/ActivityTopList'
import {loadActivity} from './services/activity/actions'

import './styles.styl'


export class Home extends React.Component {
  componentDidMount() {
    this.props.loadActivity('map')
  }

  render() {
    if (!this.props.data || this.props.fetching) {
      return (
        <div className="container app-container solid">
          <Throbber />
        </div>
      )
    }
    return (
      <div className="app-container">
        <div className="overview-header-container container">
          <div className="header-image-container">
            <div className="header-image" />
          </div>
          <div className="or-spacer">
            <div className="mask" />
          </div>
        </div>
        <div className="container app-container solid" style={{paddingTop: 0}}>
          <Row className="overview-body" style={{height: '900px'}}>
            <Col lg={9}>
              <div className="site-panel">
                <h2 style={{marginTop: 0}}>Server 1</h2>
                placeholder
              </div>
              <div className="site-panel">
                <h2 style={{marginTop: 0}}>Server 2</h2>
                totally not a placeholder
              </div>
              <div className="site-panel">
                <h2 style={{marginTop: 0}}>Server 3</h2>
                not sure about this one
              </div>
              <p>
                123 player(s) online
              </p>
            </Col>
            <Col lg={3}>
              <div className="overview-panel">
                <div className="title">
                  Map Records
                </div>
                <ActivityWRList data={this.props.data.get('map_wrs')} />
              </div>
              <div className="overview-panel">
                <div className="title">
                  Course Records
                </div>
                <ActivityWRList data={this.props.data.get('course_wrs')} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}


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
