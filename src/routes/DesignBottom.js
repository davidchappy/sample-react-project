// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { updateStep,toggleSaveForLater } from '../actions/AppActions'

// Components
import Header from '../components/Header/Header'
import Main from '../components/Main'
import Designer from '../components/Designer/Designer'
import Footer from '../components/Footer/Footer'

export class DesignBottom extends Component {
  componentDidMount() {
    // Page (step) number
    this.props.updateStep(5)
  }

  render() {
    const mobileNavParams = {
      linkURLs: ['/choose-bottom', '/roster'],
      titles: ['Select Bottom', 'Edit Roster']  
    }

    return (
      <div className="DesignBottom route">
        <Header headingText="Design Bottom" 
                mobileRight='save'
                desktopLeft='back'
                desktopRightFirst='save'
                desktopRightLast='finish'
                save={this.props.save} />
        <Main>
          <Designer uniformType='bottom' 
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
  updateStep,
  toggleSaveForLater
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignBottom)
