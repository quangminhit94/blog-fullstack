
import React, { Component } from 'react'
import Axios from 'axios'
import Routes from './Routes'
import './App.css'

const axiosInstance = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

class App extends Component {
  state = {
    hello: null
  }

  componentDidMount() {
    this.renderHelloUsingAxios()
    // this.renderFromJsonPlaceholder()
    // this.fetchDataUsingFetch()
  }

  renderHelloUsingAxios() {
    Axios.get('/hello')
      .then(res => this.setState({ hello: res.data }))
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
        {/* <Container1 nickname="Cat"></Container1> */}
        {/* <Component1 name="moe" age="25"></Component1> */}
        <br />
        React
        <Routes />
      </div>
    )
  }
}


export default App;