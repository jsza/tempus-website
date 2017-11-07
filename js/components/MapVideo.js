import React from 'react'
import P from 'prop-types'


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


export default class MapVideo extends React.Component {
  render() {
    if (!this.props.selectedVideo) {
      return null
    }
    return (
      <div className="map-content-container map-video-panel">
        <ResizingYoutubePlayer src={'https://www.youtube.com/embed/' + this.props.selectedVideo} />
        <span className="map-video-close" onClick={this.props.onClickCloseVideo}>
          <i className="fa fa-fw fa-close" />
        </span>
      </div>
    )
  }
}


MapVideo.propTypes = (
  { selectedVideo: P.string
  })
