import React, { Component } from "react";

class PingComponent extends Component {
  state = {
    pingTime: null,
  };

  componentDidMount() {
    this.pingScaledrone();
    this.pingInterval = setInterval(this.pingScaledrone, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.pingInterval);
  }

  pingScaledrone = () => {
    const startTime = performance.now();
    fetch("http://localhost:5173/", { method: "HEAD" })
      .then((response) => {
        const endTime = performance.now();
        const pingTime = endTime - startTime;
        this.setState({ pingTime: pingTime.toFixed(0) });
      })
      .catch((error) => {
        console.error("Ping failed:", error);
      });
  };

  render() {
    const { pingTime } = this.state;
    return (
      <div>
        <div className="text-gray-600">Ping to localhost: {pingTime} ms</div>
      </div>
    );
  }
}

export default PingComponent;
