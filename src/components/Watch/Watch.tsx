import { Component } from 'react';

class Watch extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  timer: ReturnType<typeof setTimeout> | null = null;

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
      this.componentDidMount();
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    return <div>{this.state.time}</div>;
  }
}

export default Watch;