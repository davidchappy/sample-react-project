// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions/lib
import Modal from 'react-modal'
import { toggleSaveForLater } from '../../actions/AppActions'
import { localStorageState } from '../../reducers/AppReducer'

// Components/Styles
import ModalForm from '../Forms/ModalForm'
import './SaveForLater.css'

export class SaveForLater extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      modalVisible: props.visible,
      designName: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modalVisible: nextProps.saving })
  }

  // Manages submission of save for later form; 
  //  delegates to props
  handleSaveForLater = e => {
    e.preventDefault()
    this.props.save(this.state.designName)
    this.props.toggleSaveForLater()
  }

  // Updates designName in state in real time
  formUpdate = e => {
    e.preventDefault()
    this.setState({ designName: e.target.value })
  }
  
  render() {
    const formInputs = [
      {
        name: 'design-name',
        labelText: 'Enter a name for your design',
        type: 'text',
        placeholder: 'Name Here'
      }
    ]

    return (
      <Modal  className="Modal"
              overlayClassName="ModalOverlay SaveForLaterOverlay"
              isOpen={this.state.modalVisible}
              onRequestClose={this.props.toggleSaveForLater}
              contentLabel="Save For Later">
        <ModalForm  className="SaveForLater"
                    formInputs={formInputs}
                    formUpdate={this.formUpdate}
                    submitForm={this.handleSaveForLater}
                    cancel={this.props.toggleSaveForLater}
                    buttonText="Save Design & Exit" />
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    saving: state.app.saving
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSaveForLater,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveForLater)