import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Tabs, Tab} from 'react-bootstrap'
import Throbber from '../components/Throbber'
import ActivityWRList from '../components/ActivityWRList'
import ActivityTopList from '../components/ActivityTopList'
import {loadActivity} from '../redux/activity'


export default class OverviewApp extends React.Component {
  componentDidMount() {
    this.props.loadActivity('map')
  }

  render() {
    if (!this.props.data || this.props.fetching) {
      return (
        <div className="container">
          <Throbber />
        </div>
      )
    }
    return (
      <div className="container">
        <h3 style={{marginTop: 0}}>Recent Activity</h3>
        <Row>
          <Col lg={12}>
            <Tabs>
              <Tab eventKey={1} title="Map WRs">
                <ActivityWRList data={this.props.data.get('map_wrs')} />
              </Tab>

              <Tab eventKey={2} title="Map Top10s">
                <ActivityTopList data={this.props.data.get('map_tops')} />
              </Tab>

              <Tab eventKey={3} title="Course WRs">
                <ActivityWRList data={this.props.data.get('course_wrs')} />
              </Tab>

              <Tab eventKey={4} title="Bonus WRs">
                <ActivityWRList data={this.props.data.get('bonus_wrs')} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
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
)(OverviewApp)
