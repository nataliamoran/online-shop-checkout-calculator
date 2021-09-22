import React from 'react';
import './styles.css';


class CheckoutCalc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helloWorld: null,
    };
  }

  componentDidMount() {
    this.getHello();
  }

  getHello() {
    fetch('http://127.0.0.1:8000/api/hello')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          helloWorld: json['msg']
        });
        this.forceUpdate();
      })
      .catch(() => {
      });
  }

  render() {
    return (
      <div>
        <h4>{this.state.helloWorld}</h4>
      </div>
    );
  }
}

export default CheckoutCalc;