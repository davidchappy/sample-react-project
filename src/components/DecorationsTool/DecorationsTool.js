// React/Redux/lib
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-modal'

// Actions / Utilities
import { 
  createDecoration, 
  selectDecoration,
  editDecoration,
  deleteDecoration
} from '../../actions/DecorationsActions'
import { 
  getDecorationsByUniform, 
  decorationsByType 
} from '../../reducers/DecorationsReducer'
import generateId from '../../utils/generateId'

// Components / Styles
import ActionButton from '../ActionButton/ActionButton'
import TextDecorationForm from '../Forms/TextDecorationForm'
import NumberDecorationForm from '../Forms//NumberDecorationForm'
import ImageDecorationForm from '../Forms//ImageDecorationForm'
import DecorationsPreviewer from './DecorationsPreviewer'
import DesignerToolNav from '../DesignerTools/DesignerToolNav'
import './DecorationsTool.css'

export class DecorationsTool extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedTypeIndex: 0,
      modalVisible: false,
      currentDecoration: this.generateDecoration(props),
    }
  }

  // Create a blank state decoration (text type)
  generateDecoration = props => {
    return {
      id: null,
      designId: props.id,
      uniformType: props.uniformType,
      textType: 'Custom Text', 
      type: 'text',
      content: '', 
      fontWeight: '700',
      fontSize: 40,
      fontFamily: 'Serif',
      fillColor: 'ffffff',
      coords: {}
    }
  }

  // Display or hide modal form
  toggleModal = e => {
    if (e) { e.preventDefault() }
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  // Trigger modal toggle when add decoration is clicked
  handleAddDecoration = e => {
    e.preventDefault()
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  // Update state w/ decoration by id and display modal for editing
  handleEditDecoration = id => {
    const decoration = this.props.decorations.filter(d => d.id === Number(id))[0]
    this.setState({ currentDecoration: decoration })
    this.toggleModal()
  }

  handleDeleteDecoration = id => {
    this.props.deleteDecoration(id, this.props.uniformType)
  }

  // Update state with selected decoration type (i.e., decorations nav)
  handleSelectType = e => {
    const index = Number(e.target.getAttribute('data-page-index'))
    this.setState({ selectedTypeIndex: index })
  }

  // Update app with currently selected decoration; 
  //  can be utilitized by 3D viewer
  handleSelectDecoration = id => {
    this.props.selectDecoration(id, this.props.uniformType)
  }

  // Update decoration in state with any form input change
  handleFormUpdate = update => {
    let property, value
    const decorationState = this.state.currentDecoration

    if (update.target) {
      // This is a change event
      update.preventDefault()
      property = update.target.getAttribute('name')
      value = update.target.value
    } else {
      // This is a color change
      property = 'fillColor'
      value = update.hex
    }
    
    decorationState[property] = value
    this.setState({ currentDecoration: decorationState })
  } 

  // Submit the decoration in state for either create or edit 
  handleSubmitDecoration = e => {
    if (e) { e.preventDefault() }
    const decorationState = this.state.currentDecoration
    const types = Object.keys(this.props.decorationsByType)
    decorationState.type = types[this.state.selectedTypeIndex]

    if (!decorationState.id) {
      const id = generateId(this.props.allDecorations)
      decorationState.id = id
      this.props.createDecoration(decorationState, this.props.uniformType)
    } else {
      this.props.editDecoration(decorationState)
    }

    this.toggleModal()
    this.setState({ currentDecoration: this.generateDecoration(this.props) })
  }

  // Images need special treatment for uploading;
  //  if this is an image, call app createDecoration and hide modal
  handleCreateImageDecoration = uploadedImage => {
    const currentDecoration = this.state.currentDecoration
    if (currentDecoration && currentDecoration.type === 'image') {
      this.props.createDecoration(currentDecoration, this.props.uniformType)
      this.setState({ currentDecoration: this.generateDecoration(this.props) })
      this.toggleModal()
    }
  }

  // Update current decoration in state with uploaded image
  handleImageUpload = uploadedImage => {
    const imageState = {
      ...this.state.currentDecoration,
      id: generateId(this.props.allDecorations),
      type: 'image',
      textType: null,
      styles: {},
      content: uploadedImage
    }
    this.setState({ currentDecoration: imageState })
  }

  // Utility to choose button text based on type
  getButtonText = type => {
    if (type === 'image') {
      return 'Add Image'
    } else if (type === 'number') {
      return 'Add Number'
    } else {
      return 'Add Text'
    }
  }

  // Return correct Form component JSX based on type
  getForm = type => {
    const props = {
      submitForm: this.handleSubmitDecoration,
      cancel: this.toggleModal,
      formUpdate: this.handleFormUpdate,
      buttonText: this.getButtonText(type),
      decoration: this.state.currentDecoration,
      colorOptions: this.props.colors
    }

    if (type === 'number') {
      return <NumberDecorationForm {...props} />
    } else if (type === 'image') {
      return <ImageDecorationForm {...props} 
                                  createImageDecoration={this.handleCreateImageDecoration}
                                  cancelImageDecoration={this.toggleModal}
                                  onUpload={this.handleImageUpload} />
    } else {
      return <TextDecorationForm {...props} />
    }
  }

  render() {
    const types = Object.keys(this.props.decorationsByType)
    const currentType = types[this.state.selectedTypeIndex]
    const currentDecorations = this.props.decorationsByType[currentType]

    const images = currentType === 'image' ? true : false

    return (
      <div className="DecorationsTool tool" >
        <DesignerToolNav  navItems={types} 
                          currentPageIndex={this.state.selectedTypeIndex} 
                          selectNav={this.handleSelectType} />
        <DecorationsPreviewer decorations={currentDecorations}
                              selectedDecoration={this.props.selectedDecoration}
                              images={images}
                              editDecoration={this.handleEditDecoration}
                              deleteDecoration={this.handleDeleteDecoration}
                              selectDecoration={this.handleSelectDecoration} />
        <ActionButton confirmAction={this.toggleModal}
                      text={this.getButtonText(currentType)} />
        <Modal  className="Modal"
                overlayClassName="ModalOverlay DecorationsOverlay"
                isOpen={this.state.modalVisible}
                onRequestClose={this.toggleModal}
                contentLabel="Add A Decoration"
                shouldFocusAfterRender={false}
                shouldCloseOnOverlayClick={false}>
          {this.getForm(currentType)}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const decorations = 
    getDecorationsByUniform(state.decorations.all, ownProps.uniformType)

  return {
    colors: state.colors.all,
    currentDesign: state.designer[ownProps.uniformType],
    decorations: decorations,
    decorationsByType: decorationsByType(decorations),
    allDecorations: state.decorations.all,
    selectedDecoration: state.decorations.selected[ownProps.uniformType]
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createDecoration,
  selectDecoration,
  editDecoration,
  deleteDecoration
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecorationsTool)