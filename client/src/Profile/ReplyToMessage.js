import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../utils/history'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Axios from 'axios'

export class ReplyToMessage extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.props)
    const message_to_username = this.props.location.state.props.message.message_sender
    const message_from_username = this.props.db_profile[0].username
    const message_title = event.target.title.value
    const message_body = event.target.body.value

    const data = {
      message_sender: message_from_username,
      message_to: message_to_username,
      message_title: message_title,
      message_body: message_body
    }

    Axios.post('/api/post/message_to_db', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(setTimeout(() => {
        history.replace('/')
      }, 400))
  }
  render() {
    return (
      <div>
        <h2>Message:</h2>
        <div className="FlexColumn">
          <div>
            <p>{this.props.location.state.props.message.message_title}</p>
          </div>
          <div>
            <p>{this.props.location.state.props.message.message_body}</p>
          </div>
          <div>
            <p>By: {this.props.location.state.props.message.message_sender}</p>
          </div>
        </div>
        <form action="" onSubmit={this.handleSubmit}>
          <TextField
            id='title'
            label='Title'
            margin='normal' />
          <br />
          <TextField
            id='body'
            label='body'
            multiline
            rows='4'
            margin='normal' />
          <br />
          <Button type='submit' variant='outlined' color='secondary'>Submit</Button>
          <Button variant='outlined' color='primary' onClick={() => history.replace('/')}>Cancel</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  db_profile: state.auth_reducer.db_profile
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ReplyToMessage)
