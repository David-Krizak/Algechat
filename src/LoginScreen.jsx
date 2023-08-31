import React, { Component } from "react";
import "./LoginScreen.css";
class LoginScreen extends Component {
  state = {
    username: "",
    color: "#000000", 
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
    if (!username) {
      window.alert("Odaberite username!");
      return;
    }
    if (!color) {
      window.alert("Odaberite boju!");
      return;
    }

    this.props.onLogin(username, color);
  };

  render() {
    return (
      <div className="login-container">
        <form className="p-4 border rounded">
          <h2 className="mb-4">Login</h2>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              autoFocus
            />
          </div>
          <div className="mb-3 color-picker">
            <label
              htmlFor="colorPicker"
              className="form-label boja-label"
              style={{ "--label-color": this.state.color }} 
            >
              Boja:
            </label>
            <input
              className="form-control"
              type="color"
              id="colorPicker"
              value={this.state.color}
              onChange={this.handleColorChange}
            />
          </div>
          <button
            className="btn btn-primary mt-3"
            type="submit"
            onClick={this.handleLogin}
            style={{
              backgroundColor: this.state.color,
              borderColor: this.state.color,
            }}>
            Pridruži se
          </button>
        </form>
      </div>
    );
  }
}

export default LoginScreen;
