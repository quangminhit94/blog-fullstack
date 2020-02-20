import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as ACTIONS from '../store/actions/actions'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import history from '../utils/history'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'


import '../App.css'


export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      post_id: null
    }
  }


  componentDidMount() {
    const user_id = this.props.db_profile[0].uid
    Axios.get('/api/get/user_posts', { params: { user_id: user_id } })
      .then((res) => this.props.set_user_posts(res.data))
      .catch(err => console.log(err))
  }

  handleClickOpen = (pid) => (
    this.setState({ open: true, post_id: pid })
  )
  handleClickClose = () => (
    this.setState({ open: false, post_id: null })
  )

  deletePost = () => {
    const post_id = this.state.post_id
    console.log(post_id)
    Axios.delete('/api/delete/post_comments', { data: { post_id: post_id } })
      .then(() => Axios.delete('/api/delete/post', { data: { post_id: post_id } })
        .then(res => console.log(res)))
      .catch(err => console.log(err))
      .then(() => this.handleClickClose())
      .then(() => setTimeout(() => history.replace('/'), 700))
  }
  RenderProfile = (props) => {
    return (
      <div>
        <h1>{props.profile.profile.nickname}</h1>
        <br />
        <img src={props.profile.profile.picture} alt="" />
        <br />
        <h4>{props.profile.profile.email}</h4>
        <h5>{props.profile.profile.name}</h5>
        <h6>Email verified</h6>
        {props.profile.profile.email_verified ? <p>YES</p> : <p>NO</p>}
      </div>
    )
  }

  RenderPost = post => (
    <Card style={{ width: '500px', height: '200px', marginBottom: '10px', paddingBottom: '80px' }}>
      <CardHeader
        title={
          <Link to={{ pathname: `/post/${post.post.pid}`, state: { post } }}>
            {post.post.title}
          </Link>
        }
        subheader={
          <div className='FlexColumn'>
            {console.log(post)}
            <div className="FlexRow">
              {post.post.date_created}
            </div>
            <div className="FlexRow">
              <Link to={{ pathname: `/edit_post/${post.post.pid}`, state: { post } }}>
                <button>Edit</button>
              </Link>
              <button onClick={() => this.handleClickOpen(post.post.pid)}>Delete</button>
            </div>
          </div>
        }
      ></CardHeader>
      <br />
      <CardContent>
        <span style={{ overflow: 'hidden' }}>{post.post.body}</span>
      </CardContent>
    </Card>
  )
  render() {
    return (
      <div>
        <div>
          <this.RenderProfile profile={this.props.profile}></this.RenderProfile>
        </div>
        <div>
          {console.log(this.state)}
          <Link to={{ pathname: `/show_messages/${this.state.user_id}` }}>
            <Button variant='contained' color='primary' type='submit'>Show Messages</Button>
          </Link>
        </div>
        <div>
          {this.props.user_posts
            ? this.props.user_posts.map(post =>
              <this.RenderPost post={post} key={post.pid}></this.RenderPost>)
            : null}
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>Confirm delete?</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Deleting Posts
              </DialogContentText>
            <DialogActions>
              <Button onClick={this.deletePost}>Agree</Button>
              <Button onClick={this.handleClickClose}>Cancel</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.auth_reducer.profile,
  user_posts: state.posts_reducer.user_posts,
  db_profile: state.auth_reducer.db_profile
})

const mapDispatchToProps = (dispatch) => ({
  set_user_posts: posts => dispatch(ACTIONS.fetchUserPosts(posts))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
