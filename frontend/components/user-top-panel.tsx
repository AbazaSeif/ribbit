import * as React from "react";
import { Link } from "react-router-dom";

import { FeedInfo, formatFeedCreationTime } from "../lib/feed";
import { UserInfo, User } from "../lib/user";

interface Props {
  feedInfo: FeedInfo;
  user: User;
}
interface State {}

export default class UserTopPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { feedInfo } = this.props;
    const userInfo = feedInfo.userInfo;

    const userPanel = (
      <div className="user-panel">
        <Link
          to={`/${this.props.user.networkId}/profile/${
            feedInfo.userInfo.address
          }`}
          target="_blank"
        >
          <div
            className="profile-image"
            style={{
              backgroundImage: `url("${userInfo.avatar}")`
            }}
          />
        </Link>
        <Link
          to={`/${this.props.user.networkId}/profile/${
            feedInfo.userInfo.address
          }`}
          target="_blank"
        >
          <div className="name">
            {userInfo.name ? userInfo.name : "Anonymous"}
          </div>
        </Link>
        <div className="user-address">
          {userInfo.address.slice(0, 6) + "..."}
        </div>
        {/* <div className="postfix">c862b4eel</div> */}
        {/* <div className="action">post feed</div> */}
        <div className="create-time">
          <span>{formatFeedCreationTime(this.props.feedInfo)}</span>
        </div>
      </div>
    );

    const topBar =
      feedInfo.feedType === "upvote" ? (
        <div className="top-bar">
          <Link
            to={`/${this.props.user.networkId}/profile/${
              feedInfo.repostUserInfo.address
            }`}
            target="_blank"
          >
            {feedInfo.repostUserInfo.name}
          </Link>
          <span>upvoted</span>
        </div>
      ) : null;

    return (
      <div className="user-top-panel">
        {topBar}
        {userPanel}
      </div>
    );
  }
}