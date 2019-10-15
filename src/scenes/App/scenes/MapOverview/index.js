import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {
  loadMapOverview,
  selectVideo
} from './actions'

import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

import {Switch, Route, Redirect} from 'react-router'
import {Link} from 'react-router-dom'

import DocumentTitle from 'react-document-title'

import Video from './components/Video'
import Throbber from 'root/components/Throbber'
import Leaderboards from './scenes/Leaderboards'
import MapAuthorsView from './scenes/MapAuthorsView'
import MapOverviewNav from './components/MapOverviewNav'
import SteamAvatar from 'root/components/SteamAvatar'
import ZoneIcon from 'root/components/ZoneIcon'
import TFIcon from 'root/components/TFIcon'
import { formatTime } from 'root/utils/TempusUtils'

import './styles.styl'


function MapOverviewBackground({ mapName }) {
  const imgURL = `http://tempus.site.nfoservers.com/web/screenshots/raw/${mapName}_320p.jpeg`
  const [imgLoaded, setImgLoaded] = useState(false)
  useEffect(() => {
    let unmounted = false
    const image = new Image()
    image.onload = () => {
      if (!unmounted)
        setImgLoaded(true)
    }
    image.src = imgURL
    return () => unmounted = true
  }, [mapName])

  const styles = {
    opacity: 0
  }
  if (imgLoaded) {
    styles.backgroundImage = `url(${imgURL})`
    styles.opacity = 100
  }
  return (
    <div className="MapOverview-background" style={ styles } />
  )
}


class MapOverview extends React.Component {
  renderAuthor() {
    const authors = this.props.data.get('authors')
    const {match} = this.props

    let authorItem
    if (authors.size === 0) {
      authorItem = <span style={{ borderBottom: '1px dotted white' }}>N/A</span>
    } else if (authors.size === 1) {
      const a = authors.get(0)
      authorItem = (
        <Link to={`/players/${a.getIn(['player_info', 'id'])}`}>
          {a.get('name')}
        </Link>
      )
    } else {
      authorItem = (
        <Link to={`${match.url}/authors`}>
          {authors.size} authors
        </Link>
      )
    }
    return <span>{authorItem}</span>
  }

  renderVideoButtons() {
    const videos = this.props.data.get('videos')
    let content
    if (videos.keys().size === 0) {
      content = 'N/A'
    } else {
      content = ['soldier', 'demoman'].map((c, idx) => {
        const video = videos.get(c)
        if (video) {
          return (
            <span
              key={idx}
              className={'video-button tf-icon sm ' + c}
              onClick={() => this.props.selectVideo(video)}
            />
          )
        } else {
          return (
            <span
              key={idx}
              className={'video-button disabled tf-icon sm ' + c}
              style={{ opacity: '0.3', cursor: 'not-allowed' }}
            />
          )
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
    } else {
      courseString = courses + ' Courses'
    }
    let bonusString
    if (bonuses === 0) {
      bonusString = 'No Bonuses'
    } else if (bonuses === 1) {
      bonusString = bonuses + ' Bonus'
    } else {
      bonusString = bonuses + ' Bonuses'
    }
    return (
      <span>
        <ZoneIcon type="course" fixedWidth /> {courseString}
        <br />
        <ZoneIcon type="bonus" fixedWidth /> {bonusString}
      </span>
    )
  }

  onClickCloseVideo() {
    this.props.selectVideo(null)
  }

  render() {
    const data = this.props.data
    if (this.props.fetching || !data) {
      return (
        <div className="container" style={{ background: 'white' }}>
          <Throbber />
        </div>
      )
    }
    const { leaderboard } = this.props
    const mapName = data.getIn(['map_info', 'name'])
    // const bgStyle = {}
    const { match } = this.props

    return (
      <DocumentTitle title={`Tempus - ${mapName}`}>
        <div>
          <section className="MapOverview">
            <MapOverviewBackground mapName={mapName} />
            <header className="MapOverview-header">
              <div className="header-title">
                <div className="container header-container">
                  <h1>
                    {data.getIn(['map_info', 'name'])}{' '}
                    <br className="hidden-lg hidden-md" />
                    <div>
                      <small>by {this.renderAuthor()}</small>
                    </div>
                  </h1>
                  <ul className="map-info-list">
                    <li>
                      <i className="fa fa-flag" />{' '}
                      {this.props.data.getIn(['zone_counts', 'course'], 1)}
                    </li>
                    <li>
                      <i className="fa fa-star" />{' '}
                      {this.props.data.getIn(['zone_counts', 'bonus'], 0)}
                    </li>
                    {/* TODO: Enable when we have data for this */}
                    <li className="hidden">
                      Made for <i className="tf-icon soldier mini" />{' '}
                      <i className="tf-icon demoman mini" />
                    </li>
                    <li>
                      <TFIcon tfClass="soldier" size="auto" /> {`T${data.getIn(['tier_info', 'soldier'])}`}
                    </li>
                    <li>
                      <TFIcon tfClass="demoman" size="auto" /> {`T${data.getIn(['tier_info', 'demoman'])}`}
                    </li>
                    <li>
                      <a
                        className="btn btn-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ padding: 0, color: '#00b4f0' }}
                        href={`http://tempus.site.nfoservers.com/server/maps/${data.getIn(
                          ['map_info', 'name']
                        )}.bsp.bz2`}
                      >
                        <i className="fas fa-download" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hidden">
                <p style={{ margin: 0 }}>
                  <i
                    className="tf-icon soldier small"
                    style={{
                      height: '20px',
                      width: '20px',
                      filter: 'grayscale(100%)'
                    }}
                  />{' '}
                  Soldier map
                </p>
                <p>{this.renderZoneCounts()}</p>
              </div>
            </header>
            <div className="flex-row">
              <div className="col" style={{flex: '0 0 270px'}}>
                <MapOverviewNav data={this.props.data} />
              </div>
              <Switch>
                <Route
                  path={`${match.url}/leaderboards`}
                  component={Leaderboards} />
                <Route
                  path={`${match.url}/authors`}
                  component={() => <MapAuthorsView authors={data.get('authors')} />} />
                <Route exact path={`${match.url}`}>
                  <Redirect to={`${match.url}/leaderboards`} />
                </Route>
                <Route>
                  No such resource.
                </Route>
              </Switch>
            </div>
          </section>
        </div>
      </DocumentTitle>
    )
  }
}

function mapStateToProps(state) {
  const { mapOverview } = state.app.mapOverview
  return mapOverview.toObject()
}

export default connect(
  mapStateToProps,
  { loadMapOverview, selectVideo }
)(MapOverview)
