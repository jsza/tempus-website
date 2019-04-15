import React from 'react'
import {connect} from 'react-redux'
import {loadMapOverview, selectVideo,
        fetchLeaderboard} from './services/mapOverview/actions'

import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

import DocumentTitle from 'react-document-title'

import Video from './components/Video'
import Throbber from 'root/components/Throbber'
import LeaderboardContainer from './components/LeaderboardContainer'
import MapOverviewNav from './components/MapOverviewNav'
import SteamAvatar from 'root/components/SteamAvatar'
import {formatTime} from 'root/utils/TempusUtils'

import './styles.styl'


class MapOverview extends React.Component {
  componentDidMount() {
    this.props.loadMapOverview(this.props.match.params.name)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.name !== this.props.match.params.name) {
      this.props.loadMapOverview(nextProps.match.params.name)
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
          {authorNames.map((name, idx) => {
            return (
              <span key={idx}>{name}<br /></span>
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
      content = ['soldier', 'demoman'].map((c, idx) => {
        const video = videos.get(c)
        if (video) {
          return <span key={idx}
                       className={'video-button tf-icon sm ' + c}
                       onClick={() => this.props.selectVideo(video)} />
        }
        else {
          return <span key={idx}
                       className={'video-button disabled tf-icon sm ' + c}
                       style={{opacity: '0.3', cursor: 'not-allowed'}} />
        }
      })
    }
    return (
      <span className="MapOverview-header-video-buttons">
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

        <i className="fa fa-fw fa-flag" /> {courseString}
        <br />
        <i className="fa fa-fw fa-star" /> {bonusString}
      </div>
    )
  }

  onClickCloseVideo() {
    this.props.selectVideo(null)
  }

  onFetchLeaderboard(zoneType, index) {
    this.props.fetchLeaderboard(this.props.match.params.name, zoneType, index)
  }

  render() {
    const data = this.props.data
    if (this.props.fetching || !data) {
      return (
        <div className="container" style={{background: 'white'}}>
          <Throbber />
        </div>
      )
    }
    const {leaderboard} = this.props
    const mapName = data.getIn(['map_info', 'name'])
    const bgStyle = { backgroundImage: `url(http://tempus.site.nfoservers.com/web/screenshots/raw/${mapName}_1080p.jpeg)`
                    }
    // const bgStyle = {}

    return (
      <DocumentTitle title={`Tempus - ${mapName}`}>
        <div>
          <section className="MapOverview">
            <div className="MapOverview-background" style={bgStyle}>
            </div>
            <header className="MapOverview-header">
              <div className="MapOverview-header-inne">
                <h1>
                  {data.getIn(['map_info', 'name'])} <br className="hidden-lg hidden-md" />
                  <div><small>by {this.renderAuthor()}</small></div>
                </h1>
                <div>
                  <ul className="map-info-list">
                    <li>
                      <i className="fa fa-flag" /> {this.props.data.getIn(['zone_counts', 'course'], 1)} Courses
                    </li>
                    <li>
                      <i className="fa fa-star" /> {this.props.data.getIn(['zone_counts', 'bonus'], 0)} Bonuses
                    </li>
                    <li>
                      Made for <i className="tf-icon soldier mini" /> <i className="tf-icon demoman mini" />
                    </li>
                    <li>
                      <a
                        className="btn btn-link"
                        target="_blank"
                        style={{padding: 0, color: '#00b4f0'}}
                        href={`http://tempus.site.nfoservers.com/server/maps/${data.getIn(['map_info', 'name'])}.bsp.bz2`}
                      >
                        Download
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="hidden">
                <p style={{margin: 0}}>
                  <i className="tf-icon soldier small" style={{height: '20px', width: '20px', filter: 'grayscale(100%)'}} /> Soldier map
                </p>
                <p>
                  {this.renderZoneCounts()}
                </p>
                </div>
              </div>
            </header>
            <div className="container-fluid" >
              <div className="col-md-2">
                <div className="panel panel-dark">
                  <div className="panel-heading">
                    <div className="text-center hidden">
                      <h4 style={{marginBottom: '2px'}}>{data.getIn(['map_info', 'name'])}</h4>
                      <small><i style={{color: 'lightgrey'}}>by {this.renderAuthor()}</i></small>
                      <ul style={{paddingLeft: 0, listStyle: 'none', textShadow: '1px 1px 0 black', marginTop: '8px'}}>
                        <li><small><i className="fa fa-flag fa-fw" /> 6 Courses</small></li>
                        <li><small><i className="fa fa-star fa-fw" /> 6 Bonuses</small></li>
                        <li><small><i className="tf-icon soldier auto" /> T6 <i className="tf-icon demoman auto" /> T4 <small style={{textDecoration: '', fontWeight: 'bold'}}>?</small></small></li>
                      </ul>
                    </div>
                    <MapOverviewNav
                      data={this.props.data}
                      fetchLeaderboard={this.props.fetchLeaderboard} />
                  </div>
                </div>
              </div>
              <LeaderboardContainer data={data}
                                    leaderboard={leaderboard}
                                    fetchLeaderboard={this.onFetchLeaderboard.bind(this)} />
            </div>
          </section>
        </div>
      </DocumentTitle>
    )

    return (
      <DocumentTitle title={`Tempus - ${mapName}`}>
        <div>
          <section className="MapOverview container">
            <div className="MapOverview-background" style={bgStyle}>
            </div>
            <header className="MapOverview-header">
              <div className="MapOverview-header-inner">
                <h1>
                  {data.getIn(['map_info', 'name'])} <br className="hidden-lg hidden-md" /> <small>by {this.renderAuthor()}</small>
                </h1>
                <span className="pull-right">
                  {this.renderVideoButtons()}
                </span>
                <p>
                  {this.renderZoneCounts()}
                </p>
                <a className="btn btn-primary" target="_blank"
                   href={`http://tempus.site.nfoservers.com/server/maps/${data.getIn(['map_info', 'name'])}.bsp.bz2`}>
                  <i className="fa fa-download" /> Download
                </a>
              </div>
            </header>
            <section className="MapOverview-body container">
              <a className="pull-left hidden"
                style={
                  {
                    padding: '10px 15px',
                    margin: 0
                  }
                }
                >hi</a>
              <ul className="class-tabs">
                <li className="category active">
                  <a href="#"><i className="tf-icon soldier auto" /> Soldier</a>
                </li>
                <li>
                  <a href="#"><i className="tf-icon demoman auto" /> Demoman</a>
                </li>
              </ul>
              <Video selectedVideo={this.props.selectedVideo}
                     onClickCloseVideo={this.onClickCloseVideo.bind(this)} />
              <LeaderboardContainer data={data}
                                    leaderboard={leaderboard}
                                    fetchLeaderboard={this.onFetchLeaderboard.bind(this)} />
            </section>
          </section>
        </div>
      </DocumentTitle>
    )
    // return (
    //   <DocumentTitle title={`Tempus - ${mapName}`}>
    //     <div>
    //       <section className="MapOverview container">
    //         <div className="MapOverview-background" style={bgStyle}>
    //         </div>
    //         <header className="MapOverview-header">
    //           <div className="MapOverview-header-inner">
    //             <h1>
    //               {data.getIn(['map_info', 'name'])} <br className="hidden-lg hidden-md" /> <small>by {this.renderAuthor()}</small>
    //             </h1>
    //             <span className="pull-right">
    //               {this.renderVideoButtons()}
    //             </span>
    //             <p>
    //               {this.renderZoneCounts()}
    //             </p>
    //             <a className="btn btn-primary" target="_blank"
    //                href={`http://tempus.site.nfoservers.com/server/maps/${data.getIn(['map_info', 'name'])}.bsp.bz2`}>
    //               <i className="fa fa-download" /> Download
    //             </a>
    //           </div>
    //         </header>
    //         <section className="MapOverview-body container">
    //           <Video selectedVideo={this.props.selectedVideo}
    //                  onClickCloseVideo={this.onClickCloseVideo.bind(this)} />
    //           <LeaderboardContainer data={data}
    //                                 leaderboard={leaderboard}
    //                                 fetchLeaderboard={this.onFetchLeaderboard.bind(this)} />
    //         </section>
    //       </section>
    //     </div>
    //   </DocumentTitle>
    // )
  }
}


function mapStateToProps(state) {
  const {mapOverview} = state
  return mapOverview.toObject()
}


export default connect(
  mapStateToProps,
  {loadMapOverview, selectVideo, fetchLeaderboard}
)(MapOverview)
