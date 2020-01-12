
import React, { Component } from 'react'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

class App extends Component {
  state = {
    hello: null
  }

  componentDidMount() {
    this.renderHelloUsingAxios()
    this.renderFromJsonPlaceholder()
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

  render() {
    return (
      <div>
        {this.state.hello ? <div>{this.state.hello}</div> : null}
      </div>
    )
  }
}


export default App;
