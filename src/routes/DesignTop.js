// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { updateStep } from '../actions/AppActions'

// Components
import Header from '../components/Header/Header'
import Main from '../components/Main'
import Designer from '../components/Designer/Designer'
import Footer from '../components/Footer/Footer'

export class DesignTop extends Component {
  componentDidMount() {
    // Page (step) number
    this.props.updateStep(3)
  }
  
  render() {
    const mobileNavParams = {
      linkURLs: ['/choose-top', '/choose-bottom'],
      titles: ['Select Top', 'Select Bottom']
    }
    
    return (
      <div className="DesignTop route">
        <Header headingText="Design Top" 
                mobileRight='save'
                desktopLeft='back'
                desktopRightFirst='save'
                desktopRightLast='finish'
                save={this.props.save} />
        <Main>
          <Designer uniformType='top' 
                    designerLoading={this.props.designerLoading} />
        </Main>
        <Footer navParams={mobileNavParams} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    designerLoading: state.designer.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateStep
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignTop)
