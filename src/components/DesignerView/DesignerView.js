// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions/lib
import { 
  clearDesignerFunction, 
  initDesigner,
  startLoadingDesign,
  stopLoadingDesign 
} from '../../actions/DesignerActions'
import { moveDecoration } from '../../actions/DecorationsActions'
import UniformViewer from '../../lib/UniformViewer'
import TextureEditor from '../../lib/TextureEditor'
import { styleById } from '../../reducers/StylesReducer'
import { colorsByIds } from '../../reducers/ColorsReducer'
import { patternById } from '../../reducers/PatternsReducer'
import { getDecorationsByUniform } from '../../reducers/DecorationsReducer'

// Styles
import './DesignerView.css'

// Component in charge managing the 3D Viewer and TextureEditor
//  receives and delegates designer functions from the app state
export class DesignerView extends Component {
  constructor(props) {
    super(props)

    // Instantiate 3D Viewer and Texture Editor classes
    const viewer = new UniformViewer()
    const editor = this._initEditor(props)

    this.state = { viewer, editor }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.designerFunction) {
      this.executeDesignerFunction(nextProps)
    }
  }

  componentDidMount() {  
    // Save instances of viewer and editor in the app
    const { viewer, editor } = this.state
    // this.props.initDesigner({ viewer, editor }, this.props.uniformType) 
    this.initDesigner()    
  }

  componentWillUnmount() {
    if ( this.state.viewer ) {
      this.state.viewer.cleanUp()    
    }
  }

  // Required initialization for 3d viewer
  _initViewer = () => {
    const viewer = this.state.viewer
    this.refs.viewer.appendChild(viewer.core.renderer.domElement)
    viewer.setSize(this.refs.viewer)
    viewer.listen(this.state.editor.callbacks, this.refs.viewer)
    viewer.render()

    return viewer
  }

  _initEditor = (props) => {
    return new TextureEditor(
      props.uniformType, 
      { 
        reportMove: props.moveDecoration,
        updateViewer: this._handleUpdateViewer
      }
    )
  }

  _handleUpdateViewer = () => {
    if (this.state && this.state.viewer) {
      this.state.viewer.updateTexture()
    }
  }

  initDesigner = () => {
    this.props.startLoadingDesign()
    this._initViewer()

    return new Promise((resolve, reject) => {
      const { styleId, patternId } = this.props.design
      const colors = this.props.colors
      const decorations = this.props.decorations
      const style = styleById(styleId, this.props.styles)
      const pattern = patternById(patternId, this.props.patterns)
            
      this.state.editor.applyPattern({ pattern, colors, decorations })
        .then(canvas => {
          return this.state.viewer.renderUniform(style, canvas)
        })
        .then(uniform => {
          this.state.viewer.render()
          this.props.clearDesignerFunction()
          this.props.stopLoadingDesign() 
        })
    })
  }

  // Check if a designer function has been requested and execute it
  executeDesignerFunction = props => {
    props.startLoadingDesign()
    const { designerFunction: func, decorations } = props
    const colors = props.colors
    const args = { ...func.args, decorations, colors }
    props.clearDesignerFunction()  

    this.state.editor[func.name](args)
      .then(canvas => {
        // Update Uniform Viewer with updated canvas
        this.state.viewer.updateTexture(canvas)
        props.stopLoadingDesign()    
      })
  }

  render() {
    return (
      <div className="DesignerView">
        <div ref='viewer' id='viewer' className='viewer-element'></div>      
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const colors = colorsByIds(
    state.designer[ownProps.uniformType].colors, 
    state.colors.all
  )

  return {
    styles: state.styles.all,
    patterns: state.patterns.all,
    decorations: getDecorationsByUniform(state.decorations.all, ownProps.uniformType),
    designerFunction: state.designer.currentFunction,
    design: state.designer[ownProps.uniformType],
    colors
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  clearDesignerFunction,
  initDesigner,
  moveDecoration,
  startLoadingDesign,
  stopLoadingDesign
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignerView)