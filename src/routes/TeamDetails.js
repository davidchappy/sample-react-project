// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

// Actions/Utilities
import { updateStep } from '../actions/AppActions'
import { updateTeamName } from '../actions/OrderActions'
import { addNotification } from '../actions/NotificationsActions'
import { colorsByIds } from '../reducers/ColorsReducer'

// Components
import Header from '../components/Header/Header'
import Main from '../components/Main'
import TeamDetailsPage from '../components/TeamDetailsPage/TeamDetailsPage'
import Footer from '../components/Footer/Footer'

export class UserInput extends Component {  
  componentDidMount() {
    // Page (step) number
    this.props.updateStep(0)
  }

  // Updates user's Team Name in app state in real time
  handleUpdateTeamName = e => {
    e.preventDefault()
    this.props.updateTeamName(e.target.value)
  }

  // Name is already saved, 
  //  so simply link to choose-sport or choose-top (desktop)
  handleSubmitName = e => {
    e.preventDefault()
    this.props.addNotification({ type: 'success', message: 'Team Details Saved' })
    if (window.matchMedia("(max-width: 768px)").matches) {
      this.props.history.push('/choose-sport')
    } else {
      this.props.history.push('/choose-top')
    }    
  }

  render() {
    const mobileNavParams = {
      linkURLs: ['/#', '/choose-sport'],
      titles: ['Quit', 'Select Sport']
    }

    return (
      <div className="TeamDetails route">
        <Header headingText="Team Details"
                desktopLeft="quit"
                desktopRightLast="choose-top"
                navCallback={this.handleSubmitName}/>
        <Main>
          
          <TeamDetailsPage 
            submitName={this.handleSubmitName} 
            updateTeamName={this.handleUpdateTeamName}
            teamName={this.props.teamName}
            teamColors={this.props.colors} />
              
        </Main>
        <Footer navParams={mobileNavParams} noTeamDetails={true} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const colors = colorsByIds(state.order.colors, state.colors.all)

  return {
    teamName: state.order.teamName,
    colors
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addNotification,
  updateStep,
  updateTeamName
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInput))
