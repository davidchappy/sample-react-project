import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Header.css'

// Renders header for both mobile and desktop, css used to hide/show
export class Header extends Component {
  constructor(props) {
    super(props)
  
    this.state = {}
  }

  // Delegate saving to props
  handleSaveForLater = e => {
    e.preventDefault()
    this.props.save()
  }

  render() {
    // Conditionally render JSX for mobile header right section
    let mobileRight = null
    if (this.props.mobileRight === 'save') {
      mobileRight = <a className="mobile-save" onClick={this.handleSaveForLater}>
                      <span className="fa fa-floppy-o"></span>
                      Save for later
                    </a>
    } else if (this.props.mobileRight === 'no-top') {
      mobileRight = <Link to="/choose-bottom">I don&apos;t want a top</Link>
    } else if (this.props.mobileRight === 'no-bottom') {
      mobileRight = <Link to="/roster">I don&apos;t want a bottom</Link>
    }

    // Conditionally render JSX for desktop header left section
    let desktopLeft = null
    if (this.props.desktopLeft === 'back' ||
       this.props.history.location.search === "?canReturn") {
      desktopLeft = <button onClick={ this.props.history.goBack }>Go Back</button>
    } else if (this.props.desktopLeft === 'quit') {
      desktopLeft = <Link to="#"><button>Quit</button></Link>
    }

    // Conditionally render JSX for desktop header first right section
    let desktopRightFirst = null
    if (this.props.desktopRightFirst === 'save') {
      desktopRightFirst = <button onClick={this.handleSaveForLater}>Save for Later</button>
    } 

    // Conditionally render JSX for desktop header far right section
    let desktopRightLast = null
    if (this.props.desktopRightLast === 'finish') {
      desktopRightLast = <Link to='/roster'><button>Enter Roster</button></Link>
    } else if (this.props.desktopRightLast === 'design-top') {
      desktopRightLast = <Link to='/design-top'><button>Design Your Uniform!</button></Link>
    } else if (this.props.desktopRightLast === 'design-bottom') {
      desktopRightLast = <Link to='/design-bottom'><button>Design Your Uniform!</button></Link>
    } else if (this.props.desktopRightLast === 'checkout') {
      desktopRightLast = <Link to='/checkout'><button>Checkout</button></Link>
    } else if (this.props.desktopRightLast === 'choose-top') {
      desktopRightLast =  <a onClick={this.props.navCallback} to='/choose-top'>
                            <button>Choose Uniform Top</button>
                          </a>
    }

    return (
      <div className="Header">
        <div className="mobile-header hidden-on-desktop">
          <div className="mobile-header-left">
            <h1>{this.props.headingText}</h1>
          </div>
          <div className="mobile-header-right">
            {mobileRight}
          </div>
        </div>   
        <div className="desktop-header hidden-on-mobile">
          <div className="desktop-header-left">
            {desktopLeft}
          </div>
          <div className="desktop-header-right">
            {desktopRightFirst}
            {desktopRightLast}
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Header)
