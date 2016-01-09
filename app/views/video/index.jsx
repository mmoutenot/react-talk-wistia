import _                    from "lodash";
import React                from "react";
import {bindActionCreators} from "redux";
import {connect}            from "react-redux";

import {loadMedia} from "app/media/actions";
import WistiaPlayer from "./player"


const mapStateToProps = (state) => ({
  mediaById: state.media.mediaById
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadMedia
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Video extends React.Component {

  componentWillMount () {
    this.props.loadMedia();
  }

  render () {
    const renderedVideos = _.map(this.props.mediaById, v => {
      return (<WistiaPlayer key={v.hashed_id} videoId={v.hashed_id}/>);
    });

    return (
      <div>
        <h1>My videos</h1>
        {renderedVideos}
      </div>
    );
  }
}
