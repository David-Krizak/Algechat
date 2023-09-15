import React, { Component } from "react";

class Input extends Component {
  state = {
    text: "",
  };

  onChange = (e) => {
    const text = e.target.value;
    this.setState({ text });
  };

  onSubmit = (e) => {
    const { onSendMessage } = this.props;
    const { text } = this.state;
    e.preventDefault();

    this.setState({ text: "" });
    onSendMessage(text);
  };

  render() {
    return (
      <div className="flex bottom-0 ">
        <form onSubmit={this.onSubmit} className="flex-grow flex  ">
          <input
            onChange={this.onChange}
            value={this.state.text}
            type="text"
            placeholder="Upiši poruku..."
            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-purple-600"
            autoFocus
          />
          <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-600">
            Pošalji
          </button>
        </form>
      </div>
    );
  }
}

export default Input;
