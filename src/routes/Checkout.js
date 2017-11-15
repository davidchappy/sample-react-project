// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { updateStep } from '../actions/AppActions'

// Components
import Header from '../components/Header/Header'
import Main from '../components/Main'
import Footer from '../components/Footer/Footer'

export class Checkout extends Component {
  componentDidMount() {
    // Page (step) number
    this.props.updateStep(7)
  }

  render() {
    const mobileNavParams = {
      linkURLs: ['/roster', '#'],
      titles: ['Edit Roster', 'Checkout']  
    }

    return (
      <div className="Checkout route">
        <Header headingText="Save and Checkout"
                desktopLeft="back" />
        <Main>
          
            <p>Ready to Checkout?</p>
            
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
  updateStep
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)
