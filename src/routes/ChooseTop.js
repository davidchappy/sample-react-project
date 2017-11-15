// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions/utilities
import { chooseStyle } from '../actions/StylesActions' 
import { updateStep, toggleSaveForLater } from '../actions/AppActions'
import { getPatternsByStyle } from '../reducers/PatternsReducer'
import { stylesBySport } from '../reducers/StylesReducer'
import { selectById } from '../utils/arrayUtils'

// Components
import Header from '../components/Header/Header'
import Main from '../components/Main'
import DesktopChooserNav from '../components/Chooser/DesktopChooserNav'
import Chooser from '../components/Chooser/Chooser'
import Footer from '../components/Footer/Footer'

export class ChooseTop extends Component {
  componentDidMount() {
    // Page (step) number
    this.props.updateStep(2)
  }

  // Get a style by id, first pattern matching style, update app state
  handleChooseTop = styleSpec => {
    const style = selectById(styleSpec.id, this.props.styles)
    const pattern = getPatternsByStyle(this.props.patterns, style)[0]
    
    this.props.chooseStyle(style, pattern)
  }
  
  render() {
    // Choose and supplement attributes for style rendering
    const styleItems = this.props.styles.map(style => {
      return {
        id: style.id,
        title: style.name,
        bodyContent: <p>{style.description}</p>,
        buttonText: 'Choose this top',
        preview: style.preview,
        topText: "$" + style.pricing
      }
    })

    const mobileNavParams = {
      linkURLs: ['/choose-sport', '/design-top'],
      titles: ['Select Sport', 'Design Top']
    }

    return (
      <div className="ChooseTop route full-height-scrollabe">
        <Header headingText="Select Top" 
                mobileRight='no-top'
                desktopLeft='back'
                desktopRightFirst='save'
                desktopRightLast='design-top'
                save={this.props.save} />
        <Main>
          <DesktopChooserNav />
          <Chooser 
            items={styleItems} 
            {...this.props} 
            buttonDestination="/design-top"
            chooseItem={this.handleChooseTop}
          />   
        </Main>
        <Footer navParams={mobileNavParams} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentSport: state.styles.currentSport,
    styles: stylesBySport(state.styles.all, state.styles.currentSport, 'top'),
    patterns: state.patterns.all
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  chooseStyle,
  updateStep,
  toggleSaveForLater
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTop)
