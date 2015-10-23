import React from 'react'
import {connect} from 'react-redux'
import {loadMapOverview, selectVideo, fetchLeaderboard} from '../redux/mapOverview'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import DocumentTitle from 'react-document-title'

import MapVideo from '../components/MapVideo'
import Throbber from '../components/Throbber'
import MapOverviewLeaderboard from '../components/MapOverviewLeaderboard'


class MapOverviewApp extends React.Component {
  componentDidMount() {
    this.props.loadMapOverview()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.name !== this.props.params.name) {
      this.props.loadMapOverview()
    }
  }

  renderAuthor() {
    const authors = this.props.data.get('authors')
    const authorNames = authors.map((a) => a.get('name'))

    let authorItem
    if (authorNames.size === 0) {
      authorItem = <span style={{borderBottom: '1px dotted white'}}>N/A</span>
    }
    else if (authorNames.size === 1) {
      authorItem = authorNames.get(0)
    }
    else {
      const tooltip = (
        <Tooltip>
          {authorNames.map((name) => {
            return (
              <span>{name}<br /></span>
            )
          })}
        </Tooltip>
      )
      authorItem = (
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <span style={{borderBottom: '1px dotted rgb(170, 170, 170)'}}>
            Multiple Authors
          </span>
        </OverlayTrigger>
      )
    }
    return (
      <span>{authorItem}</span>
    )
  }

  renderVideoButtons() {
    const videos = this.props.data.get('videos')
    let content
    if (videos.keys().size === 0) {
      content = 'N/A'
    }
    else {
      content = ['soldier', 'demoman'].map((c) => {
        const video = videos.get(c)
        if (video) {
          return <span className={'video-button tf-icon sm ' + c}
                       onClick={() => this.props.selectVideo(video)} />
        }
        else {
          return <span className={'video-button disabled tf-icon sm ' + c}
                       style={{opacity: '0.3', cursor: 'not-allowed'}} />
        }
      })
    }
    return (
      <span className="map-video-buttons">
        {content} <i className="fa fa-fw fa-youtube" />
      </span>
    )
  }

  renderZoneCounts() {
    const zoneCounts = this.props.data.get('zone_counts')
    const courses = zoneCounts.get('course', 1)
    const bonuses = zoneCounts.get('bonus', 0)
    let courseString
    if (courses === 1) {
      courseString = courses + ' Course'
    }
    else {
      courseString = courses + ' Courses'
    }
    let bonusString
    if (bonuses === 0) {
      bonusString = 'No Bonuses'
    }
    else if (bonuses === 1) {
      bonusString = bonuses + ' Bonus'
    }
    else {
      bonusString = bonuses + ' Bonuses'
    }
    return (
      <div>

        <i className="fa fa-fw fa-road" /> {courseString}
        <br />
        <i className="fa fa-fw fa-star" /> {bonusString}
      </div>
    )
  }

  onClickCloseVideo() {
    this.props.selectVideo(null)
  }

  render() {
    const data = this.props.data
    if (this.props.fetching || !data) {
      return (
        <div className="container">
          <Throbber />
        </div>
      )
    }
    const {leaderboard} = this.props
    const mapName = data.getIn(['map_info', 'name'])
    const bgStyle = { backgroundImage: `url(http://tempus.site.nfoservers.com/web/screenshots/raw/${mapName}_1080p.jpeg)`
                    }
    return (
      <DocumentTitle title={`Tempus - ${mapName}`}>
        <div>
          <div className="map-overview-bg" style={bgStyle}>
          </div>
          <div className="map-content-container map-overview-header-container">
            <div className="map-overview-header container">
              <h1>
                {data.getIn(['map_info', 'name'])} <br className="hidden-lg hidden-md" /> <small>by {this.renderAuthor()}</small>
              </h1>
              <span className="pull-right">
                {this.renderVideoButtons()}
              </span>
              {this.renderZoneCounts()}
            </div>
          </div>
          <div className="container">
            <MapVideo selectedVideo={this.props.selectedVideo}
                      onClickCloseVideo={this.onClickCloseVideo.bind(this)} />
            <MapOverviewLeaderboard data={data}
                                    leaderboard={leaderboard}
                                    fetchLeaderboard={this.props.fetchLeaderboard} />
          </div>
        </div>
      </DocumentTitle>
    )
  }
}


function mapStateToProps(state) {
  const {mapOverview} = state
  return mapOverview.toObject()
}


export default connect(
  mapStateToProps,
  {loadMapOverview, selectVideo, fetchLeaderboard}
)(MapOverviewApp)
