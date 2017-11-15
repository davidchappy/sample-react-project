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

export class ChooseBottom extends Component {
  componentDidMount() {
    // Page (step) number
    this.props.updateStep(4)
  }

  // Get a style by id, first pattern matching style, update app state
  handleChooseBottom = styleSpec => {
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
        buttonText: 'Choose this bottom',
        preview: style.preview,
        topText: "$" + style.pricing
      }
    })

    const mobileNavParams = {
      linkURLs: ['/design-top', '/design-bottom'],
      titles: ['Design Top', 'Design Bottom']
    }

    return (
      <div className="ChooseBottom route full-height-scrollabe">
        <Header headingText="Select Bottom" 
                mobileRight='no-bottom'
                desktopLeft='quit'
                desktopRightFirst='save'
                desktopRightLast='design-bottom'
                save={this.props.save} />
        <Main>
            <DesktopChooserNav />
            <Chooser 
              items={styleItems} 
              {...this.props} 
              buttonDestination="/design-bottom"
              chooseItem={this.handleChooseBottom}
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
    styles: stylesBySport(state.styles.all, state.styles.currentSport, 'bottom'),
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
)(ChooseBottom)
