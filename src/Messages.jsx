import React, { Component } from "react";
import "./Index.css";
import "./tailwind.css";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.messagesContainerRef = React.createRef();
  }

  scrollToBottom = () => {
    const container = this.messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  render() {
    const { messages, me, myId } = this.props;

    return (
      <div className="Messages-container" ref={this.messagesContainerRef}>
        <ul className="Messages-list">
          {messages.map((message, index) => (
            <Message key={index} message={message} me={me} myId={myId} />
          ))}
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

    return (
      <li
        className={`flex ${
          isMessageFromMe ? "justify-end" : "justify-start"
        } p-2`}>
        <div
          className={`flex-none rounded-lg p-2 ${
            isMessageFromMe
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}>
          {!isMessageFromMe && (
            <div className="text-xs text-gray-600 mb-1">
              {message.data.member.clientData.username}
            </div>
          )}
          <div className="text-sm">{messageText}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
