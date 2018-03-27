import React, { Component } from 'react'
import '../styles/index.scss'
import './style.scss'

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  render() {
    return (
      <div id='app-container'>
        {this.props.children}
      </div>
    )
  }
}


export default App;
