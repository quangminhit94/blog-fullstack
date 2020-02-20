import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import history from '../utils/history'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export class EditPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
  }
  componentDidMount() {
    this.setState({
      title: this.props.location.state.post.post.title,
      body: this.props.location.state.post.post.body
    })
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }
  handleBodyChange = (event) => {
    this.setState({ body: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()

    const user_id = this.props.db_profile[0].uid
    const username = this.props.db_profile[0].username
    const pid = this.props.location.state.post.post.pid
    const title = event.target.title.value
    const body = event.target.body.value

    const data = {
      title: title,
      body: body,
      pid: pid,
      uid: user_id,
      username: username
    }
    console.log(data)

    Axios.put("/api/put/post", data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(setTimeout(() => history.replace('/profile'), 700))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id='title'
            label='title'
            margin='normal'
            value={this.state.title}
            onChange={this.handleTitleChange} />
          <br />
          <TextField
            id='body'
            label='body'
            multiline
            rows='4'
            margin='normal'
            value={this.state.body}
            onChange={this.handleBodyChange} />
          <Button type='submit' variant='outlined' color='secondary'>Submit</Button>
        </form>
        <Button onClick={() => history.goBack()}>Cancel</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  db_profile: state.auth_reducer.db_profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
