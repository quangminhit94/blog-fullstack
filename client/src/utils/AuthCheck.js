import React, { Component } from 'react'
import history from './history'
import * as ACTIONS from '../store/actions/actions'
import { connect } from 'react-redux'
import Axios from 'axios'

class AuthCheck extends Component {

  sendProfileToDb = (profile) => {
    const data = profile
    Axios.post('api/posts/user_profile_to_db', data)
      .then(Axios.get('api/get/user_profile_from_db', { params: { email: profile.profile.email } })
        .then(res => this.props.setDbProfile(res.data)))
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.loginSuccess()
      this.props.addProfile(this.props.auth.userProfile)
      this.sendProfileToDb(this.props.auth.userProfile)
      history.replace('/')
    }
    else {
      this.props.loginFailure()
      this.props.removeProfile()
      this.props.removeDbProfile()
      history.replace('/')
    }
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: () => dispatch(ACTIONS.loginSuccess()),
    loginFailure: () => dispatch(ACTIONS.loginFailure()),
    addProfile: (profile) => dispatch(ACTIONS.addProfile(profile)),
    removeProfile: () => dispatch(ACTIONS.removeProfile()),
    setDbProfile: (profile) => dispatch(ACTIONS.setDbProfile(profile)),
    removeDbProfile: () => dispatch(ACTIONS.removeDbProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck)
