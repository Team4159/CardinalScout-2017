import React, { Component } from 'react'
import Home from '../Scenes/Home'
import Logs from '../Scenes/Logs'

import {
  BackAndroid,
  NavigationExperimental
} from 'react-native'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental

class NavRoot extends Component {
  /* eslint-disable*/
  constructor (props) {
    super(props)
    this._renderScene = this._renderScene.bind(this)
    this._handleBackAction = this._handleBackAction.bind(this)
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
  }
  _renderScene (props) {
     const { route } = props.scene
    if (route.key === 'home') {
      return <Home _handleNavigate={this._handleNavigate.bind(this)} />
    }
    if (route.key === 'logs') {
      return <Logs _goBack={this._handleBackAction.bind(this)} />
    }
  }
  _handleBackAction () {
    if (this.props.navigation.index === 0) {
      return false
    }
    this.props.popRoute()
    return true
  }
  _handleNavigate (action) {
    switch (action && action.type) {
      case 'push':
        this.props.pushRoute(action.route)
        return true
      case 'back':
      case 'pop':
        return this._handleBackAction()
      default:
        return false
    }
  }
  render () {
    return (
      <NavigationCardStack
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene} />
    )
  }
}

export default NavRoot