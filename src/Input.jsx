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
      <div className="Input">
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            value={this.state.text}
            type="text"
            placeholder="Upiši poruku..."
            autoFocus
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
