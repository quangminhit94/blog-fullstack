import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as ACTIONS from '../store/actions/actions'
import Axios from 'axios'
import moment from 'moment'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'

export class ShowUser extends Component {
  componentDidMount() {
    console.log(this.props.location)
    const username = this.props.location.state.post.post.author
    Axios.get('/api/get/other_user_profile_from_db', { params: { username: username } })
      .then(res => this.props.set_profile(res.data))
      .catch(err => console.error(err))
    Axios.get('/api/get/other_user_posts_from_db', { params: { username: username } })
      .then(res => this.props.set_db_posts(res.data))
      .catch(err => console.error(err))

    window.scrollTo({ top: 0, left: 0 })
  }
  RenderPosts = post => (
    <div className="CardStyles">
      <Card >
        <CardHeader
          title={<Link to={{ pathname: '/post/' + post.post.pid, state: { post } }}>
            {post.post.title}
          </Link>}
          subheader={
            <div className="FlexColumn">
              <div className="FlexRow">
                {moment(post.post.date_created).format('MMMM Do, YYYY | h:mm a')}
              </div>
              <div className="FlexRow">
                By: {post.post.author}
              </div>
              <div className="FlexRow">
                <i className="material-icons">thumb_up</i>
                <div className="notification-num-allposts"> {post.post.likes} </div>
              </div>
            </div>
          }
        />
        <br />
        <CardContent>
          <span style={{ overflow: 'hidden' }}> {post.post.body} </span>
        </CardContent>
      </Card>
    </div>
  )

  RenderProfile = (props) => (
    <div>
      <div className="FlexRow">
        <h1>{props.profile.username}</h1>
      </div>
      <div className="FlexRow">
        <Link to={{ pathname: '/send_message/', state: { props } }}>
          <Button variant='contained' color='secondary' type='submit'>
            Send Message
          </Button>
        </Link>
      </div>
    </div>
  )

  render() {
    return (
      <div>
        <div className="FlexRow">
          {this.props.user_profile
            ? <this.RenderProfile profile={this.props.user_profile[0]} />
            : null}
        </div>
        <div>
          <h3>Lasted activity:</h3>
          <div>
            {this.props.user_posts
              ? this.props.user_posts.map(post =>
                <div>
                  <this.RenderPosts key={post.pid} post={post} />
                  <br />

                </div>
              )
              : null}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user_profile: state.user_reducer.other_user_db_profile,
  user_posts: state.user_reducer.db_other_user_posts
})

const mapDispatchToProps = (dispatch) => ({
  set_db_posts: post => dispatch(ACTIONS.getOtherUserDbPosts(post)),
  set_profile: profile => dispatch(ACTIONS.getOtherUserDbProfile(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser)
