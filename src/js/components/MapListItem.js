import React from 'react'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import {Link} from 'react-router'
import Difficulties from '../constants/Difficulties'


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
        <OverlayTrigger placement="bottom" overlay={<Tooltip>(Soldier) Tier {soldierTier} - {Difficulties[soldierTier.toString()]}</Tooltip>}>
          <span className="tf-icon soldier sm">
            <span className={'map-tier-inner tier-' + soldierTier}>
              {soldierTier === 0
               ? <i className="fa fa-ban" />
               : soldierTier
               }
            </span>
          </span>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={<Tooltip>(Demoman) Tier {demomanTier} - {Difficulties[demomanTier.toString()]}</Tooltip>}>
          <span className="tf-icon demoman sm">
            <span className={'map-tier-inner tier-' + demomanTier}>
              {demomanTier === 0
               ? <i className="fa fa-ban" />
               : demomanTier
               }
            </span>
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
      authorItem =
        <span style={{borderBottom: '1px dotted white'}}
              title="Unknown author">
          N/A <i className="fa fa-question" />
        </span>
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
            Multiple Authors <i className="fa fa-info-circle" />
          </span>
        </OverlayTrigger>
      )
    }
    return (
      <span className="map-author">
        <span><span>{authorItem}</span></span>
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
            {this.renderAuthor()}
          </span>
        </span>
      </Link>
    )
  }
}
