import React, { Component } from 'react'

import * as ACTION_TYPES from '../store/actions/action_types'
import * as ACTIONS from '../store/actions/actions'

import { connect } from 'react-redux'

class Container1 extends Component {
  
  render() {
    const user_text = "User Text"
    return (
      <div>
        <button onClick={() => console.log(this.props.isAuthenticated)}>Get State</button>
        <button onClick={() => this.props.action1()}>Dispatch Action 1</button>
        <button onClick={() => this.props.action2()}>Dispatch Action 2</button>
        <button onClick={() => this.props.action_creator1()}>Dispatch Action Creator 1</button>
        <button onClick={() => this.props.action_creator2()}>Dispatch Action Creator 2</button>
        <button onClick={() => this.props.action_creator3(user_text)}>Dispatch Action Creator 3</button>
        {this.props.isAuthenticated
          ? <h1>{this.props.user_text}</h1>
          : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.reducer1.isAuthenticated,
    user_text: state.user_reducer.user_text
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action1: () => dispatch(ACTIONS.SUCCESS),
    action2: () => dispatch(ACTIONS.FAILURE),
    action_creator1: () => dispatch(ACTIONS.success()),
    action_creator2: () => dispatch(ACTIONS.failure()),
    action_creator3: (text) => dispatch(ACTIONS.user_input(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container1)