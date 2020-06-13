import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import * as ACTIONS from '../store/actions/actions'

import history from '../utils/history'
import Axios from 'axios'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

export class ShowMessages extends Component {
  componentDidMount() {
    const username = this.props.db_profile[0].username
    Axios.get('/api/get/user_messages', { params: { username: username } })
      .then(res => this.props.set_user_messages(res.data))
      .catch(function (error) {
        console.log(error);
      })
  }
  RenderMessages = (props) => {
    const { message } = props
    return (
      <TableRow>
        <TableCell>
          <p>From: {message.message_sender}</p>
          <p>Title: {message.message_title}</p>
          <p>From: {message.message_body}</p>
          <small>{props.message.date_created}</small>
          <Link to={{ pathname: '/reply_to_message', state: { props } }}>
            <Button variant='contained' color='primary'>Reply</Button>
          </Link>
          <Button variant='outlined' color='primary' onClick={() => this.deleteMessage(props.message.mid)}>Delete</Button>
          <Button variant='outlined' color='secondary' onClick={() => history.goBack()}>Cancel</Button>
        </TableCell>
      </TableRow>
    )
  }

  deleteMessage = (mid) => {
    Axios.delete('/api/delete/user_messages', { data: { mid: mid } })
      .then(res => console.log(res))
      .catch(function (error) {
        console.log(error);
      })
      .then(() => setTimeout(function () { history.replace('/') }, 700))
  }
  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Messages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.user_messages
              ? this.props.user_messages.map(message =>
                <this.RenderMessages key={message.mid} message={message} />
              )
              : null}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  db_profile: state.auth_reducer.db_profile,
  user_messages: state.user_reducer.user_messages
})

const mapDispatchToProps = dispatch => ({
  set_user_messages: messages => dispatch(ACTIONS.setUserMessages(messages))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowMessages)
