import React, { useRef, useEffect } from "react";
import "./Messages.css";

function Messages({ messages, me, myId }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="Messages-container">
      <ul className="Messages-list">
        {messages.map((message, index) => (
          <Message key={index} message={message} me={me} myId={myId} />
        ))}
        <div ref={bottomRef}></div>
      </ul>
    </div>
  );
}

function Message({ message, me, myId }) {
  console.log("Message ID:", message.id);
  console.log("My ID:", myId);

  const isMessageFromMe = message.member.id === myId;
  console.log("Is message from me?", isMessageFromMe);

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

export default Messages;
