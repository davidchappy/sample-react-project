// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions/lib
import { removeNotification } from '../../actions/NotificationsActions'

// Components
import Notification from './Notification'

export class Notifications extends Component {
  constructor(props) {
    super(props)
  
    this.state = { notification: null }
  }

  componentDidMount() {
    this.setState({ notification: null })
    // this.checkNotification(this.props.message)
  }

  componentWillReceiveProps(nextProps) {
    this.checkNotification(nextProps.notification)
  }

  checkNotification = notification => {
    if(notification) {
      this.setState({ notification })
      window.setTimeout(() => {
        this.setState({ notification: null })
        this.props.removeNotification()        
      }, 4000)
    } else {
      this.setState({ notification: null })
    }
  }

  render() {
    if(this.props.notification) {
      return  <Notification className={this.props.notification.type}>
                {this.props.notification.message}
              </Notification>
    } else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.notifications.currentNotification,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeNotification
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)