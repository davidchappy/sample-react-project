// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { chooseSport } from '../actions/StylesActions'
import { updateStep } from '../actions/AppActions'

// Components
import Header from '../components/Header/Header'
import Main from '../components/Main'
import Chooser from '../components/Chooser/Chooser'
import Footer from '../components/Footer/Footer'

export class Sports extends Component {
  componentDidMount() {
    // Page (step) number
    this.props.updateStep(1)
  }

  // TEST THIS
  // Given array of all style objects, 
  //  returns array of objects containing sport data
  getSports = styles => {
    const organizedStyles = {}

    styles.forEach(style => {
      const sport = style.sport
      if (!organizedStyles[sport]) {
        organizedStyles[sport] = {}
      } 
      if (!organizedStyles[sport][style.uniformType]) {
        organizedStyles[sport][style.uniformType] = []
      }
 
      organizedStyles[sport][style.uniformType].push(style)
    })

    return Object.keys(organizedStyles).map(sportName => {
      const bodyContent =     
        <div className="chooser-item-content">
          <p>{organizedStyles[sportName]['top'].length} Top Styles / </p>
          <p>{organizedStyles[sportName]['bottom'].length} Bottom Styles </p>
        </div>

      return {
        title: sportName,
        bodyContent,
        buttonText: 'Choose this Sport',
        preview: organizedStyles[sportName]['top'][0].preview
      }
    })
  }
    
  render() {
    const sportsItems = this.getSports(this.props.styles)
    const mobileNavParams = {
      linkURLs: ['/start', '/choose-top'],
      titles: ['Team Info', 'Select Top']
    }

    return (
      <div className="Sports route">
        <Header headingText="Select Sport"
                desktopLeft="back"/>
        <Main>
          <Chooser 
            items={sportsItems} 
            {...this.props} 
            buttonDestination="/choose-top"
            chooseItem={this.props.chooseSport}
          />
        </Main>
        <Footer navParams={mobileNavParams} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    styles: state.styles.all
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  chooseSport,
  updateStep
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sports)
