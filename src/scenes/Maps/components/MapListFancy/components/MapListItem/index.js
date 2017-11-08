import React from 'react'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import {Link} from 'react-router'
import Difficulties from 'root/constants/Difficulties'

import './styles.styl'


export default class MapListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {showImage: false}
    this.imageUrl = `http://tempus.site.nfoservers.com/web/screenshots/raw/${this.props.data.get('name')}_320p.jpeg`
    this.image = new Image()
    this.image.onload = this.onImageLoaded.bind(this)
    this.image.src = this.imageUrl
  }

  onImageLoaded() {
    this.setState({showImage: true})
  }

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
      <span className="name">
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
      <span className="tiers">
        <span className="tier">
          <span className="tf-icon soldier mini">
          </span>
          <span className={'tier-inner tier-' + soldierTier}>
            {soldierTier === 0
             ? <i className="fa fa-ban" />
             : 'T' + soldierTier
             }
          </span>
        </span>
        <span> </span>
        <span className="tier">
          <span className="tf-icon demoman mini">
          </span>
          <span className={'tier-inner tier-' + demomanTier}>
            {demomanTier === 0
             ? <i className="fa fa-ban" />
             : 'T' + demomanTier
             }
          </span>
        </span>
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
      <span className="author">
        <span><span>{authorItem}</span></span>
      </span>
    )
  }

  render() {
    const name = this.props.data.get('name')
    let bgStyles =
      { backgroundImage: `url(${this.imageUrl})`
      , opacity: this.state.showImage ? 100 : 0
      }
      // { backgroundImage: `url(http://tempus.site.nfoservers.com/web/screenshots/raw/${name}_320p.jpeg)`
    const url = '/maps/' + this.props.data.get('name')
    return (
      <Link to={url} className="Maps-MapListFancy-MapListItem">
        <span>
          <div className="item-background"
               style={bgStyles} />
          <span className="item-overlay">
            <span className="item-inner">
              <span className="name-container">
                {this.renderName()}
              </span>
              {this.renderTiers()}
            </span>
          </span>
        </span>
      </Link>
    )
  }
}
