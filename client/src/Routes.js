import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container1 from './containers/Container1'
import Header from './containers/Header';
import Profile from './containers/Profile';
import Form1 from './containers/Form1';
// import RenderList from './containers/renderlist';


// import Component1 from './functional/component1';
import Callback from './functional/Callback';
import PrivateComponent from './functional/PrivateComponent';
import UnAuthRedirect from './functional/UnAuthRedirect';
// import Home from './functional/home';
import RenderListItem from './functional/RenderListItem';
import SignUp from './functional/Signup';

import Posts from './Blog/Posts';
import AddPost from './Blog/AddPost';
import ShowPost from './Blog/ShowPost';
import EditPost from './Blog/EditPost';

import ShowUser from './Profile/ShowUser';
import SendMessage from './Profile/SendMessage';
import ShowMessages from './Profile/ShowMessages';
import ReplytoMessage from './Profile/ReplyToMessage';

import * as ACTIONS from './store/actions/actions';

import Auth from './utils/Auth';
import AuthCheck from './utils/AuthCheck';
import history from './utils/history';

import { Router, Route, Switch, Redirect } from 'react-router';




export const auth = new Auth()

const handleAuthentication = (props) => {
  if (props.location.hash) {
    auth.handAuth()
  }
}

const PrivateRoute = ({ component: Component, auth }) => {
  return (
    <Route render={props => auth.isAuthenticated() === true
      ? <Component auth={auth} {...props} />
      : <Redirect to={{ pathname: '/signup' }} />
    }
    />
  )
}



class Routes extends Component {
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.props.login_success()
      auth.getProfile(() => { this.props.add_profile(auth.userProfile) })
      // setTimeout(() => {this.props.add_profile(auth.userProfile)}, 400)
    }
    else {
      this.props.login_failure()
      this.props.remove_profile()
    }
  }

  render() {
    return (
      <div>
        <Router history={history} >
          <div>
            <Header auth={auth} />
            <Switch>
              {/* <Route exact path='/' component={Home} /> */}
              <Route exact path='/form1' component={Form1} />
              <Route exact path='/container1' render={() => <Container1 auth={auth} />} />
              <Route path='/auth_check' render={() => <AuthCheck auth={auth} />} />
              <Route path='/redirect' component={UnAuthRedirect} />
              {/* <Route path='/renderlist' component={RenderList} /> */}

              <Route path="/user/:name" component={ShowUser} />
              <PrivateRoute path="/send_message" auth={auth} component={SendMessage} />
              <PrivateRoute path="/show_messages/:id" auth={auth} component={ShowMessages} />
              <PrivateRoute path="/reply_to_message" auth={auth} component={ReplytoMessage} />

              <Route path='/posts' component={Posts} />
              <Route path='/post/:pid' component={ShowPost} />
              <Route path='/edit_post/:pid' component={EditPost} />
              <Route path='/add_post' component={AddPost} />
              <Route path="/signup" render={(props) => <SignUp auth={auth} {...props} />} />

              <Route path='/callback' render={(props) => { handleAuthentication(props); return <Callback /> }} />
              {/* <Route path="/component1" render={(props) => <Component1 {...props} /> } /> */}

              <Route path="/list_item/:id" component={RenderListItem} />

              <PrivateRoute path="/private_route" auth={auth} component={PrivateComponent} />
              <PrivateRoute path="/profile" auth={auth} component={Profile} />

            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.loginSuccess()),
    login_failure: () => dispatch(ACTIONS.loginFailure()),
    add_profile: (profile) => dispatch(ACTIONS.addProfile(profile)),
    remove_profile: () => dispatch(ACTIONS.removeProfile())
  }
}


export default connect(null, mapDispatchToProps)(Routes);
