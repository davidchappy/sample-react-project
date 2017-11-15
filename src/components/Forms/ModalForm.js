// React
import React, { Component } from 'react'

// Components/Styles
import ActionButton from '../ActionButton/ActionButton'
import ColorPicker from '../ColorPicker/ColorPicker'
import ImageDecorationUploader from './ImageDecorationUploader'
import './ModalForm.css'

export class ModalForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = { uploading: false }
  }

  // Attempt to fix iOS scrolling on input bug
  fixiOSScroll = e => {
    window.scrollTo(0,0)
  }

  // Process props' input data into JSX
  getInputs = props => {
    return props.formInputs.map((inputData, i) => {
      let input = ''
      if (inputData.type === 'text' || inputData.type === 'number') {
        input = <input  key={i}
                        name={inputData.name} 
                        id={inputData.name} 
                        type={inputData.type} 
                        title={inputData.title}
                        required={inputData.required}
                        onChange={props.formUpdate} 
                        placeholder={inputData.placeholder}
                        defaultValue={inputData.defaultValue}
                        onSubmit={props.submitForm}
                        onFocus={this.fixiOSScroll} >
                </input> 
      } else if (inputData.type === 'select') {
        const options = inputData.options.map((option, i) => {
          return <option key={i} value={option}>{option}</option>
        })
        input = <select key={i} 
                        name={inputData.name} 
                        id={inputData.name} 
                        title={inputData.title}
                        onChange={props.formUpdate}
                        defaultValue={inputData.defaultValue} >
                    {options}
                </select> 
      } else if (inputData.type === 'uploader') {
        input = <ImageDecorationUploader  createImageDecoration={
                                            props.createImageDecoration
                                          }
                                          onUpload={props.onUpload} />
      } else if (inputData.type === 'hidden') {
        input = <input  type="hidden"
                        name={inputData.name}
                        value={inputData.value}
                        id={inputData.name} >
                </input>
      } else if (inputData.type === 'colorPicker') {
        input = <ColorPicker  colorOptions={props.colorOptions} 
                              selectedColor={inputData.defaultValue}
                              selectColor={props.formUpdate}
                              pageCount={inputData.pageCount}
                              selectedPage={0}
                              selectColorPage={this.props.selectColorPage}/>
      }

      return  <div className="form-input" data-input-index={i} key={i}>
                <label htmlFor={inputData.name}>
                  {inputData.labelText}
                  {input}
                </label>
              </div>
    })
  }

  render() {
    const inputs = this.getInputs(this.props)

    return (
      <div className={"ModalForm " + this.props.className} >
        <form onSubmit={this.props.submitForm} className="pure-form pure-form-stacked">
          {inputs}
          <div className="actions">
            <ActionButton confirmAction={this.props.submitForm}
                          cancelAction={this.props.cancel}
                          submitAttr={true} 
                          text={this.props.buttonText} />
          </div>
        </form>
      </div>
    )
  }
}

export default ModalForm