/* eslint-disable react/prop-types */
import React, { Component } from "react";

class Members extends Component {
  render() {
    const { members, me } = this.props;
    return (
      <div className="Members">
        <div className="Members-count">
          {members.length} korisnik{members.length === 1 ? "" : "a"} online
        </div>
        <div className="Members-list">
          <a>Lista online korisnika:</a>
          {members.map((member) => (
            <Member key={member.id} member={member} me={me} />
          ))}
        </div>
      </div>
    );
  }
}

class Member extends Component {
  render() {
    const { member, me } = this.props;
    const { username, color } = member.clientData || {};
    const isMe = member.id === me.id;

    return (
      <div className={`Member${isMe ? " me" : ""}`}>
        <div className="avatar" style={{ backgroundColor: color }} />
        <div className="username" style={{ color: color }}>
          {username}
          {isMe && <span className="me-label"> (ja)</span>}
        </div>
      </div>
    );
  }
}

export default Members;
