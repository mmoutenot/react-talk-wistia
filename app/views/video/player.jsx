import React, {PropTypes} from "react";

export default class WistiaPlayer extends React.Component {
  propTypes: {
    videoId: PropTypes.string.isRequired
  }

  render () {
    const videoSrc = `//fast.wistia.net/embed/iframe/${this.props.videoId}`
    return (
      <div>
        <iframe src={videoSrc}  width="640" height="360"></iframe>
      </div>
    );
  }
}
