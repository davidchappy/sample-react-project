// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions/Utilities
import { capFirst } from '../../utils/stringUtils' 
import { chooseSport } from '../../actions/StylesActions' 
import { getSports } from '../../reducers/StylesReducer' 

// Styles
import './DesktopChooserNav.css'

export class DesktopChooserNav extends Component {
  // Get title from target and call props chooseSport
  handleChooseSport = e => {
    const title = e.target.getAttribute('data-sport')
    this.props.chooseSport({ title })
  }
  
  render() {
    // Map sports JSX
    const sports = this.props.sports.map((sport, i) => {
      const selectedClass = sport === this.props.currentSport 
        ? ' selected'
        : ''

      return  <li key={i} className={selectedClass}>
                <button onClick={this.handleChooseSport}
                        data-sport={sport}>
                  {capFirst(sport)}
                </button>
              </li>
    })

    return (
      <div className="DesktopChooserNav">
        <ul>
        {sports}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentSport: state.styles.currentSport,
    sports: getSports(state.styles.all)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  chooseSport
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopChooserNav)
