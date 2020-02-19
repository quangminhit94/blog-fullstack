import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button'

class Header extends Component {

  render() {
    return (
      <div>
        <Link to='/' style={{ padding: '5px' }}>
          Home
          </Link>
        <Link to='/profile' style={{ padding: '5px' }}>
          Profile
          </Link>
        <Link to='/component1' style={{ padding: '5px' }}>
          Component 1
          </Link>
        <Link to='/form1' style={{ padding: '5px' }}>
          Form 1
          </Link>
        <Link to='/render_list' style={{ padding: '5px' }}>
          List
          </Link>
        <Link to='/posts' style={{ padding: '5px' }}>
          Forum
          </Link>
        <Link to='/private_route' style={{ padding: '5px' }}>
          Private Route
          </Link>
        {!this.props.is_authenticated
          ? <Button color='secondary' variant='outlined' onClick={() => this.props.auth.login()}>Login</Button>
          : <Button color='primary' variant='outlined' onClick={() => this.props.auth.logout()}>Logout</Button>
        }
        <br />
        <br />
        <br />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    is_authenticated: state.auth_reducer.is_authenticated
  }
}

export default connect(mapStateToProps)(Header)