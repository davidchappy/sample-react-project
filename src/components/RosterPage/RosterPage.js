// React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions/Utilities/lib
import { createPlayer, editPlayer, deletePlayer } from '../../actions/OrderActions'
import { capFirst } from '../../utils/stringUtils'
import generateId from '../../utils/generateId'
import Modal from 'react-modal'

// Components/Styles
import BlankRoster from './BlankRoster'
import RosterList from './RosterList'
import PlayerForm from '../Forms/PlayerForm'
import './RosterPage.css'

// Main Roster page component
export class RosterPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      hasPlayers: false,
      modalVisible: false,
      currentPlayer: {}
    }
  }

  // Show/hide modal 
  toggleModal = e => {
    // if (e) { e.preventDefault() }
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  // Toggle modal form for adding a new player
  handleAddPlayer = e => {
    this.setState({ currentPlayer: {} })
    this.toggleModal(e)
  }

  // Toggle modal form for editing a specific player
  handleEditPlayer = id => {
    const player = this.props.players.filter(d => d.id === Number(id))[0]
    this.setState({ currentPlayer: player })
    this.toggleModal()
  }

  // Update state from form in real time
  handleFormUpdate = e => {
    const playerState = this.state.currentPlayer
    const key = e.target.getAttribute('name')
    playerState[key] = capFirst(e.target.value)
    this.setState({ currentPlayer: playerState })
  }

  // Update state, turn off modal, and delegate submission to props
  handleSubmitPlayer = e => {
    e.preventDefault()
    const playerState = this.state.currentPlayer
    if (playerState.id || playerState.id === 0) {
      // Update player
      this.props.editPlayer(playerState)
    } else {
      // Create player
      const id = generateId(this.props.players)
      playerState.id = id
      this.props.createPlayer(playerState)
    }

    this.toggleModal()
    this.setState({ currentPlayer: {} })
  }

  render() {
    // Should display either the roster list or blank roster, but not both
    const rosterList = <RosterList  players={this.props.players}
                                    addPlayer={this.handleAddPlayer}
                                    editPlayer={this.handleEditPlayer}
                                    deletePlayer={this.props.deletePlayer} />
    const blankRoster = <BlankRoster addPlayer={this.toggleModal} />
    const pageContent = this.props.players.length > 0 ? rosterList : blankRoster

    return (
      <div className="RosterPage" >
        {pageContent}
        <Modal  className="Modal"
                overlayClassName="ModalOverlay RosterOverlay"
                isOpen={this.state.modalVisible}
                onRequestClose={this.toggleModal}
                contentLabel="Submit Player">
          <PlayerForm submitForm={this.handleSubmitPlayer} 
                      cancel={this.toggleModal} 
                      formUpdate={this.handleFormUpdate}
                      player={this.state.currentPlayer} />
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    players: state.order.players
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createPlayer,
  editPlayer,
  deletePlayer
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RosterPage)