/* eslint-disable react/prop-types */
import React, { Component } from "react";
import "./tailwind.css";
import "./Index.css";

class LoginScreen extends Component {
  state = {
    username: "",
    color: "#000000",
    error: "", // var za error
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleColorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  handleLogin = (event) => {
    event.preventDefault();
    const { username, color } = this.state;

    if (username.length > 16) {
      this.setState({
        error: "Korisničko ime mora imati manje od 17 znakova.",
      });
      return;
    } else {
      this.setState({ error: "" });
    }

    if (!username) {
      this.setState({ error: "Odaberite username!" });
      return;
    }
    if (!color) {
      this.setState({ error: "Odaberite boju!" });
      return;
    }

    this.props.onLogin(username, color);
  };

  render() {
    const { username, color, error } = this.state;

    return (
      <div className="flex justify-center items-center h-screen" id="PRVI DIV">
        <div className="bg-white bg-opacity-60 p-8 rounded-xl shadow-xl w-96 border border-gray-300">
          <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}{" "}
          {/* Prikaz errora ako ima error*/}
          <div className="mb-4">
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.handleUsernameChange}
              autoFocus
            />
          </div>
          <div className="mb-4 flex items-center">
            <label
              htmlFor="colorPicker"
              className="mr-2 text-gray-700"
              style={{ color: color }}>
              Boja:
            </label>
            <input
              className="border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="color"
              id="colorPicker"
              value={color}
              onChange={this.handleColorChange}
            />
          </div>
          <button
            className="w-full p-2 text-white bg-purple-500 hover:bg-purple-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="submit"
            onClick={this.handleLogin}>
            Pridruži se
          </button>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
