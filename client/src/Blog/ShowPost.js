import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as ACTIONS from '../store/actions/actions'
import Axios from 'axios'
import history from '../utils/history'

import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import moment from 'moment'

export class ShowPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      comment: '',
      cid: '',
      opacity: 0,
      delete_comment_id: 0,
      comments_arr: [],
      comments_motion: [],
      cur_user_id: null,
      likes: this.props.location.state.post.post.likes,
      like_user_ids: this.props.location.state.post.post.like_user_id,
      like_post: true, // if user already like the post, this will be false
    }
  }
  RenderComments = comment => (
    <div className={
      this.state.delete_comment_id === comment.comment.cid
        ? "FadeOutComment"
        : "CommentStyles"
    }>
      <h3>{comment.comment.comment}</h3>
      <small>

        {(comment.comment.date_created) === 'Just Now'
          ? <div> {comment.comment.isEdited
            ? <span> Edited </span>
            : <span> Just Now </span>}</div>
          : moment(comment.comment.date_created).format('MMMM Do, YYYY | h:mm a')
        }
      </small>
      <p>By: {comment.comment.author}</p>
      {comment.cur_user_id === comment.comment.user_id
        ? <Button onClick={() => this.handleClickOpen(comment.comment.cid, comment.comment.comment)}>
          Edit
        </Button>
        : null}
    </div>
  )

  componentDidMount() {
    Axios.get('/api/get/all_post_comments', {
      params:
        { post_id: this.props.location.state.post.post.pid }
    })
      .then(res => this.props.set_comments(res.data))
      .then(() => this.add_comments_to_state(this.props.comments))
      .catch((err) => console.log(err));
    // this.setCurUserID();
    this.handleTransition();
  }

  handleTransition = () => (
    setTimeout(() => this.setState({ opacity: 1 }), 400)
  );

  add_comments_to_state = (comments) => {
    this.setState({ comments_arr: [...comments] })
    this.animate_comments();
  }

  animate_comments = () => {
    let i = 1
    this.state.comments_arr.map(comment => {  // eslint-disable-line
      setTimeout(() => { this.setState({ comments_motion: [...this.state.comments_motion, comment] }) }, 400 * i);
      i++;
    })
  }

  handleCommentSubmit = (submitted_comment) => {
    setTimeout(() => {
      this.setState({ comments_motion: [submitted_comment, ...this.state.comments_motion] })
    }, 50);

  }
  handleCommentUpdate = (comment) => {
    const commentIndex = this.state.comments_motion.findIndex(com => com.cid === comment.cid)
    let newArr = [...this.state.comments_motion]
    newArr[commentIndex] = comment
    this.setState({ comments_motion: newArr })
  }
  handleCommentDelete = (cid) => {
    this.setState({ delete_comment_id: cid })
    const newArr = this.state.comments_motion.filter(com => com.cid !== cid)
    setTimeout(() => this.setState({ comments_motion: newArr }), 900)
  }

  handleClickOpen = (cid, comment) => (
    this.setState({ open: true, comment: comment, cid: cid })
  )
  handleClose = (cid, comment) => (
    this.setState({ open: false, comment: '', cid: '' })
  )

  handleCommentChange = event => (
    this.setState({ comment: event.target.value })
  )

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ comment: '' })

    const comment = event.target.comment.value
    const user_id = this.props.db_profile[0].uid
    const post_id = this.props.location.state.post.post.pid
    const username = this.props.db_profile[0].username

    const temp_id = 54356
    const just_now = 'Just Now'
    const data = {
      comment: comment,
      post_id: post_id,
      user_id: user_id,
      username: username
    }
    const submitted_comment = {
      cid: temp_id,
      comment: comment,
      user_id: user_id,
      author: username,
      date_created: just_now
    }
    Axios.post('/api/posts/comment_to_db', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    window.scroll({ top: 0, lef: 0, behavior: 'smooth' })
    this.handleCommentSubmit(submitted_comment)
  }

  handleUpdate = () => {
    const comment = this.state.comment
    const cid = this.state.cid
    const user_id = this.props.db_profile[0].uid
    const post_id = this.props.location.state.post.post.pid
    const username = this.props.db_profile[0].username
    const isEdited = true
    const just_now = 'Just Now'

    const data = {
      cid: cid,
      comment: comment,
      post_id: post_id,
      user_id: user_id,
      username: username
    }

    const edited_comment = {
      cid: cid,
      comment: comment,
      post_id: post_id,
      user_id: user_id,
      author: username,
      date_created: just_now,
      isEdited: isEdited
    }
    console.log(edited_comment)
    Axios.put('/api/put/comment_to_db', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    this.handleCommentUpdate(edited_comment)
  }

  handleDelete = () => {
    const cid = this.state.cid
    Axios.delete('/api/delete/comment', { data: { cid: cid } })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    this.handleCommentDelete(cid)
  }

  handleLikes = () => {
    const user_id = this.props.db_profile[0].uid
    const post_id = this.props.location.state.post.post.pid

    const data = { uid: user_id, post_id: post_id }
    console.log(this.props.location)
    Axios.put('/api/put/likes', data)
      .then(!this.state.like_user_ids.includes(user_id) && this.state.like_post
        ? this.setState({ likes: this.state.likes + 1 })
        : null)
      .then(this.setState({ like_post: false }))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <div>
          <h2>Post</h2>
          <h4>{this.props.location.state.post.post.title}</h4>
          <p>{this.props.location.state.post.post.body}</p>
          <p>{this.props.location.state.post.post.author}</p>
          <button
            style={{ cursor: 'pointer' }}
            onClick={this.props.isAuthenticated
              ? () => this.handleLikes()
              : () => history.replace('/signup')}
          >
            <i className="material-icons"> thumb_up</i>
            <small className="notification-num-showpost">{this.state.likes}</small>
          </button>
        </div>
        <div>
          <h2>All Comments:</h2>
          {this.props.comments
            ? this.state.comments_motion.map(comment =>
              <this.RenderComments
                comment={comment}
                cur_user_id={this.props.db_profile[0].uid}
                key={comment.cid}></this.RenderComments>)
            : null}
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id='comment'
              label='Comment'
              margin='normal' />
            <br />
            {console.log(this.props)}
            {this.props.isAuthenticated
              ? <Button type='submit' color='primary' variant='contained'>Submit</Button>
              : <Link to='/signup'>
                <Button color='primary' variant='contained'>Sign Up to Comment</Button>
              </Link>}

          </form>
        </div>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>Edit Comment</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                <input type='text' value={this.state.comment} onChange={this.handleCommentChange} />
              </DialogContentText>
              <DialogActions>
                <Button onClick={() => { this.handleUpdate(); this.handleClose() }}>Agree</Button>
                <Button onClick={() => this.handleClose()}>Cancel</Button>
                <Button onClick={() => { this.handleDelete(); this.handleClose() }}>Delete</Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  } w
}

const mapStateToProps = (state) => ({
  comments: state.posts_reducer.comments,
  db_profile: state.auth_reducer.db_profile,
  isAuthenticated: state.auth_reducer.is_authenticated
})

const mapDispatchToProps = (dispatch) => ({
  set_comments: comment => dispatch(ACTIONS.fetchPostComments(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost)
