/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from "react";

class Messages extends Component {
  render() {
    const { messages, me, myId } = this.props;
    return (
      <div className="Messages-container">
        <ul className="Messages-list">
          {messages.map((message, index) => (
            <Message key={index} message={message} me={me} myId={myId} />
          ))}
          <div ref={this.bottomRef}></div>
        </ul>
      </div>
    );
  }
}

class Message extends Component {
  render() {
    const { message, me, myId } = this.props;
    const isMessageFromMe = message.member.id === myId;
    const messageText = message.data.data;
    const messageClassName = isMessageFromMe
      ? "Message-content me"
      : "Message-content other";

    return (
      <li className={messageClassName}>
        {!isMessageFromMe && (
          <div className="username">
            {message.data.member.clientData.username}
          </div>
        )}
        <div className="message-text">{messageText}</div>
      </li>
    );
  }
}

export default Messages;
