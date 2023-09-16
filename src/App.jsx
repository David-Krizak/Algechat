/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import "./Index.css";
import Messages from "./Messages";
import Input from "./Input";
import Members from "./Members";
import LoginScreen from "./LoginScreen";
import PingComponent from "./PingComponent";
import Vrijeme from "./Vrijeme";

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
      <div className="font-sans h-screen flex flex-col">
        {loggedIn && (
          <div className="bg-purple-500 text-white p-4">
            <div className="text-lg">Dobrodošli {me.username}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded mt-2">
              Odjava
            </button>
          </div>
        )}

        {loggedIn ? (
          <div className="flex-grow flex">
            <div className="w-1/5 bg-gray-100 p-4 border-r border-gray-300">
              <Members members={members} me={me} />
            </div>
            <div className="flex-grow flex flex-col p-4 h-full">
              <div className="flex-grow overflow-y-auto">
                <Messages messages={messages} me={me} myId={this.myId} />
              </div>
              <div className="flex-none mt-4 border-t border-gray-300 pt-4 w-full">
                <Input onSendMessage={this.onSendMessage} />
              </div>
            </div>
            <div className="w-1/5 bg-gray-100 p-4 flex flex-col items-center border-l border-gray-300">
              <div className="text-lg mb-4">Dobrodošli {me.username}</div>
              <div className="w-full max-w-xs">
                <PingComponent />
              </div>
              <div className="w-full max-w-xs">
                <Vrijeme />
              </div>
            </div>
          </div>
        ) : (
          <LoginScreen onLogin={this.handleLogin} />
        )}
      </div>
    );
  }
}

export default App;
