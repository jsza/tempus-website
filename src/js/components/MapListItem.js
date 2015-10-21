import React from 'react'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import {Link} from 'react-router'


export default class MapListItem extends React.Component {
  renderName() {
    const item = this.props.data
    const isLinear = (item.getIn(['zone_counts', 'linear']) === 1)
    const name = this.props.data.get('name')
    const displayName = name
    // let displayName
    // if (name.startsWith('jump_')) {
    //   displayName = name.substring(5)
    // }
    // else {
    //   displayName = name
    // }

    return (
      <span className="map-name">
        <strong style={{marginBottom: '8px'}}>{displayName}</strong>
        <br />
      </span>
    )
  }

  renderTiers() {
    const item = this.props.data
    const soldierTier = item.getIn(['tier_info', '3'])
    const demomanTier = item.getIn(['tier_info', '4'])
    return (
      <span className="map-tiers">
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Soldier map tier</Tooltip>}>
          <span>
            <span className="tf-icon soldier sm">
              <span className={'map-tier-inner tier-' + soldierTier}>
                {soldierTier}
              </span>
            </span>
          </span>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Demoman map tier</Tooltip>}>
          <span>
            <span className="tf-icon demoman sm">
              <span className={'map-tier-inner tier-' + demomanTier}>
                {demomanTier}
              </span>
            </span>
          </span>
        </OverlayTrigger>
      </span>
    )
  }

  renderZones() {
    const item = this.props.data
    const courseCount = (item.getIn(['zone_counts', 'course'], 1))
    const bonusCount = (item.getIn(['zone_counts', 'bonus'], 0))
    return (
      <span className="map-zones">
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Number of Courses</Tooltip>}>
          <span>
            <i className="fa fa-road" /> {courseCount}
          </span>
        </OverlayTrigger>
        <span> | </span>
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Number of Bonuses</Tooltip>}>
          <span>
            <i className="fa fa-star" /> {bonusCount}
          </span>
        </OverlayTrigger>
      </span>
    )
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
          <span style={{borderBottom: '1px dotted white'}}>
            Multiple Authors
          </span>
        </OverlayTrigger>
      )
    }
    return (
      <span className="map-author">
        <span><i>{authorItem}</i></span>
      </span>
    )
  }

  render() {
    const name = this.props.data.get('name')
    const styles =
      { backgroundImage: `url(http://tempus.site.nfoservers.com/web/screenshots/raw/${name}_320p.jpeg)`
      }
    const url = '/maps/' + this.props.data.get('name')
    return (
      <Link to={url} className="map-list-item" style={styles}>
        <span className="map-list-item-overlay">
          <span className="map-list-item-inner">
            <span className="map-name-container">
              {this.renderName()}
            </span>
            {this.renderTiers()}
          </span>
        </span>
      </Link>
    )
  }
}
