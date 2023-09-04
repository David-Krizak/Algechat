import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";
import Members from "./Members";
import LoginScreen from "./LoginScreen";

class App extends Component {
  state = {
    loggedIn: false,
    messages: [],
    members: [],
    me: {
      username: "",
      color: "",
    },
  };

  myId = "";

  initDrone = () => {
    this.drone = new window.Scaledrone("boRWmgl9wbvM21l1", {
      data: this.state.me,
    });

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const me = { ...this.state.me };
      this.myId = this.drone.clientId;
      console.log("identitet na this drone on open:", this.myId);
      this.setState({ me });
    });

    const room = this.drone.subscribe("observable-Zavrsni");

    room.on("message", (receivedMessage) => {
      console.log("stigla poruka", receivedMessage);
      const { messages } = this.state;
      const message = {
        data: receivedMessage.data,
        member: receivedMessage.member,
        id: receivedMessage.id,
      };
      messages.push(message);
      this.setState({ messages });
    });

    room.on("members", (members) => {
      console.log("Received Members Data:", members);
      this.setState({ members });
    });

    room.on("member_join", (member) => {
      const { members } = this.state;
      this.setState({ members: [...members, member] });
    });

    room.on("member_leave", ({ id }) => {
      const members = this.state.members.filter((m) => m.id !== id);
      this.setState({ members });
    });
  };

  handleLogin = (username, color) => {
    const me = {
      username,
      color,
    };
    console.log("prijavljen?:", me);
    this.setState({ me, loggedIn: true }, () => {
      this.initDrone();
    });
  };

  onSendMessage = (message) => {
    const messageObject = {
      data: message,
      member: {
        id: this.drone.clientId,
        clientData: {
          username: this.state.me.username,
          color: this.state.me.color,
        },
      },
    };

    console.log(
      "korisnik: ",
      messageObject.member.clientData.username,
      " boje: ",
      messageObject.member.clientData.color,
      " id",
      messageObject.member.id
    );

    console.log("Publisham poruku");
    this.drone.publish({
      room: "observable-Zavrsni",
      message: messageObject,
    });
  };

  render() {
    const { loggedIn, members, messages, me } = this.state;

    return (
      <div className="App">
        <div className="App-content">
          {loggedIn ? (
            <>
              <div className="sidebar">
                <Members members={members} me={me} />
              </div>
              <div className="messages-container">
                <Messages messages={messages} me={me} myId={this.myId} />
              </div>
              <div className="right-sidebar">
                <div className="welcome-message">Dobrodošli {me.username}</div>
                <button onClick={() => window.location.reload()}>Logout</button>
              </div>
              <div className="input-container">
                <Input onSendMessage={this.onSendMessage} />
              </div>
            </>
          ) : (
            <LoginScreen onLogin={this.handleLogin} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
