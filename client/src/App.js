
import React, { Component } from 'react'
import axios from 'axios'

import { Component1 } from './functional/Component1'
import Container1 from './containers/Container1'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

class App extends Component {
  state = {
    hello: null
  }

  componentDidMount() {
    this.renderHelloUsingAxios()
    // this.renderFromJsonPlaceholder()
    this.fetchDataUsingFetch()
  }

  renderHelloUsingAxios() {
    axios.get('/hello')
      .then(res => this.setState({hello: res.data}))
      .catch(err => console.error(err))
  }

  renderFromJsonPlaceholder() {
    axiosInstance.get('/posts')
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }

  fetchDataUsingFetch = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(json => console.table(json))
            .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        {this.state.hello ? <div>{this.state.hello}</div> : null}
        <Container1 nickname="Cat"></Container1>
        <Component1 name="moe" age="25"></Component1>
      </div>
    )
  }
}


export default App;
