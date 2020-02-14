import React, { Component } from 'react'
import Axios from 'axios'
import history from '../utils/history'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'

export class AddPost extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
    const user_id = this.props.db_profile[0].uid
    const username = this.props.db_profile[0].username
    const data = {
      title: event.target.title.value,
      body: event.target.body.value,
      username: username,
      uid: user_id
    }

    Axios.post('/api/posts/post_to_db', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(setTimeout(() => history.replace('/'), 700))
  }

  render() {
    return (
      <div>
        <form action='' onSubmit={this.handleSubmit}>
          <TextField
            id='title'
            label='Title'
            margin='normal' />
          <br />
          <TextField
            id='body'
            label='Body'
            multiline
            rows='4'
            margin='normal' />
          <br />
          <button type='submit'>Submit</button>
          <br />
          <button onClick={() => history.replace('/posts')}>Cancel</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  db_profile: state.auth_reducer.db_profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
