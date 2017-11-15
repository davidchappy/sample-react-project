// React/Redux/Utilities
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colorsByIds } from '../../reducers/ColorsReducer'

// Components/Styles/Assets
import MobileNav from '../MobileNav/MobileNav'
import TeamDetailsDisplay from '../TeamDetailsPage/TeamDetailsDisplay'
import logo from './logo323.png'
import './Footer.css'

export class Footer extends Component {
  render() {
    // Don't render the Edit Team Details footer widget on the Team Details page
    const teamDetails = this.props.noTeamDetails
      ? null
      : <TeamDetailsDisplay teamName={this.props.teamName}
                              teamColors={this.props.teamColors} />

    return (
      <div className="Footer">
        <div className="footer-container hidden-on-mobile">
          <div className="logo">
            <a href="https://www.323sports.com/"><img src={logo} alt="Site logo" /></a>
          </div>
          {teamDetails}
        </div>

        <MobileNav navParams={this.props.navParams} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teamName: state.order.teamName,
    teamColors: colorsByIds(state.order.colors, state.colors.all)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)  
