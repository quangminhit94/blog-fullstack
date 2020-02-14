import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as ACTIONS from '../store/actions/actions'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import { Table, TableCell, TableBody, TableHead, TableRow } from '@material-ui/core/'
import Paper from '@material-ui/core/Paper'

const RenderPosts = post => (
  <TableRow>
    <TableCell>
      <Link to={{ pathname: `/post/${post.post.pid}`, state: { post } }}>
        <h4>{post.post.title}</h4>
      </Link>
      <br />
      <p>{post.post.body}</p>
    </TableCell>
  </TableRow>
)

export class Posts extends Component {
  componentDidMount() {
    Axios.get('/api/get/all_posts')
      .then(res => this.props.set_posts(res.data))
      .catch(err => console.log(err))
      .then()
  }
  render() {
    return (
      <div>
        <br />
        <Link to='/add_post'>
          <Button color='primary'>Add Post</Button>
        </Link>
        <h1>Posts</h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Title
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.posts
                ? this.props.posts.map(post =>
                  <RenderPosts key={post.pid} post={post}></RenderPosts>
                ) : null}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts_reducer.posts
})

const mapDispatchToProps = (dispatch) => ({
  set_posts: posts => dispatch(ACTIONS.fetchDbPosts(posts))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
