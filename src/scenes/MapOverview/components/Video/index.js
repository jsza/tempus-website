import React from 'react'
import P from 'prop-types'

import './styles.styl'


class ResizingYoutubePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {height: 720}
  }

  componentDidMount() {
    const iframe = this.refs.iframe
    this.setState({height: Math.floor(iframe.offsetWidth / (16 / 9))})
  }

  render() {
    return (
      <iframe ref="iframe"
              src={this.props.src}
              width="100%"
              height={this.state.height}
              frameBorder="0"
              allowFullScreen />
    )
  }
}


export default class Video extends React.Component {
  render() {
    if (!this.props.selectedVideo) {
      return null
    }
    return (
      <div className="MapOverview-Video">
        <ResizingYoutubePlayer src={'https://www.youtube.com/embed/' + this.props.selectedVideo} />
        <span className="close-button" onClick={this.props.onClickCloseVideo}>
          <i className="fa fa-fw fa-close" />
        </span>
      </div>
    )
  }
}


Video.propTypes = (
  { selectedVideo: P.string
  })
