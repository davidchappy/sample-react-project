// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { updateStep, toggleSaveForLater } from '../actions/AppActions'

// Components
import Header from '../components/Header/Header'
import Main from '../components/Main'
import RosterPage from '../components/RosterPage/RosterPage'
import Footer from '../components/Footer/Footer'

export class Roster extends Component {
  componentDidMount() {
    // Page (step) number
    this.props.updateStep(6)
  }

  render() {
    const mobileNavParams = {
      linkURLs: ['/design-bottom', '/checkout'],
      titles: ['Design Bottom', 'Confirm & Order']   
    }

    return (
      <div className="Roster route full-height-scrollabe">
        <Header headingText="Enter Roster" 
                mobileRight='save'
                desktopLeft='back'
                backTo='/design-bottom'
                desktopRightFirst='save'
                desktopRightLast='checkout'
                save={this.props.save} />
        <Main>
          <RosterPage />
            
        </Main>
        <Footer navParams={mobileNavParams} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateStep,
  toggleSaveForLater
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roster)
