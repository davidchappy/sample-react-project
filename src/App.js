// React/Redux
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions and Tools
import { getSavedState } from './reducers/DesignerReducer'
import { localStorageState } from './reducers/AppReducer'
import { startApp, loadSavedDesign, saveForLater, toggleSaveForLater } from './actions/AppActions'
import './App.css'

// Routes
import TeamDetails from './routes/TeamDetails'
import Sports from './routes/Sports'
import ChooseTop from './routes/ChooseTop'
import DesignTop from './routes/DesignTop'
import ChooseBottom from './routes/ChooseBottom'
import DesignBottom from './routes/DesignBottom'
import Roster from './routes/Roster'
import Checkout from './routes/Checkout'

// Components
import Notifications from './components/Notifications/Notifications'
import SaveForLater from './components/SaveForLater/SaveForLater'
import Loader from './components/Loader/Loader'
import ProgressBar from './components/ProgressBar/ProgressBar'

export class App extends Component {
  componentDidMount() {
    // startApp should get what cannot be edited by the user: patterns, styles, etc.
    // The rest should be default (reducers?) or set from the local storage
    // If authenticated, load saved design here
    const storedStated = window.localStorage.getItem('appState')
    this.props.startApp(storedStated)   
  }

  // Handles saving in server
  // Fired when Save For Later form is submitted 
  // OR when Save For Later is clicked after already submitting a design name 
  //  localstorage saving is handled by the App's parent (index.js)
  handleSaveForLater = designName => {
    const { localState } = this.props
    const savedState = { ...localState }

    // If name is present, this is an initial form save
    //  set name and save to server
    if(designName) {
      // The design name has been supplied
      savedState.app.designName = designName
      this.props.saveForLater(savedState)
    } else {
      // If a name has been supplied, save current state to server
      if(savedState.app.designName) {
        this.props.saveForLater(savedState)
      } else {
        // If name doesn't exist, open save form
        this.props.toggleSaveForLater()        
      }
    }
  }

  render() {    
    if(this.props.loaded) {
      // Ignore the Choose-Sport route on larger screens
      const chooseSport = window.matchMedia("(max-width: 768px)").matches
        ? <Route exact path="/choose-sport" component={Sports} />
        : <Route exact path="/choose-top" component={ChooseTop} />

      const save = {
        save: this.handleSaveForLater
      }

      return (
        <Router>
          <div className="App">
            <Notifications />
            <Switch>
              <Route exact path="/start" component={TeamDetails} />
              {chooseSport}
              <Route exact path="/choose-top" render={()=><ChooseTop {...save}/>} />
              <Route exact path="/design-top" render={()=><DesignTop {...save}/>} />
              <Route exact path="/choose-bottom" render={()=><ChooseBottom {...save}/>} />
              <Route exact path="/design-bottom" render={()=><DesignBottom {...save}/>} />
              <Route exact path="/roster" render={()=><Roster {...save}/>} />
              <Route exact path="/checkout" component={Checkout} />
              <Route path="/" component={TeamDetails} />
            </Switch>
            <ProgressBar 
              currentStep={this.props.currentStep} 
              stepCount={this.props.stepCount} />
            <SaveForLater {...save}/>
          </div>
        </Router>
      )
    } else if (this.props.loading) {
      return <Loader />
    } else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentStep: state.app.currentStep,
    loading: state.app.loading,
    loaded: state.app.loaded,
    localState: localStorageState(state),
    serverState: getSavedState(state.designer, state.order),
    stepCount: state.app.stepCount
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSavedDesign,
  saveForLater,
  startApp,
  toggleSaveForLater
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)