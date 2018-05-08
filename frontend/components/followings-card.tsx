import * as React from "react";
import { I18n } from "react-i18next";
import { Link } from "react-router-dom";

import { Ribbit, UserInfo } from "../lib/ribbit";

interface FollowingProps {
  username: string;
  ribbit: Ribbit;
  networkId: number;
}
interface FollowingState {
  userInfo: UserInfo;
}
class Following extends React.Component<FollowingProps, FollowingState> {
  constructor(props: FollowingProps) {
    super(props);
    this.state = {
      userInfo: null
    };
  }

  componentDidMount() {
    this.initializeFollowing(this.props.username);
  }

  componentWillReceiveProps(newProps: FollowingProps) {
    if (newProps.username !== this.props.username) {
      this.initializeFollowing(newProps.username);
    }
  }

  private async initializeFollowing(username: string) {
    const userInfo = await this.props.ribbit.getUserInfoFromUsername(username);
    this.setState({
      userInfo
    });
  }

  render() {
    const userInfo = this.state.userInfo;
    if (!userInfo) {
      return (
        <Link
          to={`/${this.props.networkId}/profile/${this.props.username}`}
          target="_blank"
        >
          <div className="following">
            <p className="msg">loading {this.props.username}</p>
          </div>
        </Link>
      );
    }
    return (
      <Link
        to={`/${this.props.networkId}/profile/${this.props.username}`}
        target="_blank"
      >
        <div className="following">
          <div
            className="avatar"
            style={{ backgroundImage: `url("${userInfo.avatar}")` }}
          />
          <div className="name-group">
            <p className="name">{userInfo.name}</p>
            <p className="username">{userInfo.username}</p>
          </div>
        </div>
      </Link>
    );
  }
}

interface Props {
  ribbit: Ribbit;
}
interface State {}
export default class FollowingsCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const ribbit = this.props.ribbit;
    return (
      <I18n>
        {(t, { i18n }) => (
          <div className="followings-card card">
            <p className="title">{t("components/followings-card/title")}</p>
            <div className="followings-list">
              {ribbit.settings.followingUsernames.map(
                (followingUsername, offset) => {
                  return (
                    <Following
                      username={followingUsername.username}
                      ribbit={ribbit}
                      networkId={ribbit.networkId}
                      key={offset}
                    />
                  );
                }
              )}
            </div>
          </div>
        )}
      </I18n>
    );
  }
}
