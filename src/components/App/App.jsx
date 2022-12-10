import React from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  const [state, setState] = React.useState({})


  function handleClick(){
    fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle`)
      .then(res=>res.json())
      .then(data=> {
        let scores = {computer:0, player:0, message:'Not Started'}
        let modalVis = false;
        setState(()=>{
          return {...data, score:scores, modal:modalVis}
        })
      })
  }
  
  function drawCards(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${state.deck_id}/draw/?count=2`)
    .then(res=>res.json())
    .then(data=>{
      let point = determineWinner(data.cards[0].value, data.cards[1].value)
      if(point === 'computer'){
        let newCompScore = state.score.computer +1;
        let newMessage = 'Computer Wins'
        let scores = state.score;       
        scores.computer = newCompScore;
        scores.message = newMessage;
        setState((prevState)=>{
          return {...prevState, score:scores, cards:data.cards, remaining:data.remaining}
        })
      } else if(point === 'player'){
        let newPlayerScore = state.score.player +1;
        let newMessage = 'Player Wins';
        let scores = state.score;
        scores.player = newPlayerScore;
        scores.message = newMessage;
        setState((prevState)=>{
          return {...prevState, score:scores, cards:data.cards, remaining:data.remaining}
        })
      } else {
        let newMessage = 'War!'
        let scores = state.score;
        scores.message = newMessage
        setState((prevState)=>{
          return {...prevState, score:scores, cards:data.cards, remaining:data.remaining}
        })
      }
    })
    .then(()=>{

    })
    
  
  }

  function determineWinner(card1,card2){
    let valueArr = ["2", "3", "4", "5", "6", "7", "8", "9", 
     "10", "JACK", "QUEEN", "KING", "ACE"]
    let compValue = valueArr.indexOf(card1);
    let playerValue = valueArr.indexOf(card2)

    if(compValue > playerValue){
      return 'computer'
    } else if (compValue < playerValue){
      return 'player'
    } else {
      return 'tie'
    }

  }

  function handleClose(){
    console.log(`close now`)
  }

  return (
    <div className="--app-app-container">
      <div className='--app-title-container'>
        <h1 className='--app-title'>WAR!!!</h1>
      </div>
      <div className='--app-score-container'>
        <div className='--app-computer-side'>
          <p className='--app-side-heading comp-heading'>Computer</p>
          <p className='--app-side-num computer-score'>{state.score === undefined ? '0' : state.score.computer}</p>
        </div>
        <div className='--app-remaining-side'>
          <p className='--app-side-heading remaining-heading'>Remaing Cards:</p>
          {state.deck_id != undefined && <p className='--app-side-num remaining-num'>{state.remaining}</p>}
        </div>
        <div className='--app-player-side'>
          <p className='--app-side-heading player-heading'>Player</p>
          <p className='--app-side-num player-score'>{state.score === undefined ? '0' : state.score.player}</p>
        </div>
      </div>
      <div className='--app-presenter-container'>
        <div className='--app-computer-card'>
          <h1 className='--app-card-title comp-title'>Computers Card</h1>
          {state.cards !== undefined ? <img className='--app-card-img computer-card-img' src={state.cards[0].image} alt={state.cards[0].value + 'of ' + state.cards[0].suit} /> : <div className='--app-placeholder-card'></div>} 
        </div>
        <div className='--app-player-card'> 
          <h1 className='--app-card-title player-title'>Players Card</h1> 
          {state.cards !== undefined ? <img className='--app-card-img player-card-img' src={state.cards[1].image} alt={state.cards[1].value + 'of ' + state.cards[1].suit} /> : <div className='--app-placeholder-card'></div>}  
        </div>
      </div> 
      <div className='--app-controls-container'>
        <Button variant="primary" className="--app-new-deck-btn" onClick={handleClick}>New Deck</Button>
        {state.deck_id && <Button disabled={state.remaining == 0} variant="primary" className='--app-draw-card-btn' onClick={state.deck_id && drawCards}>Draw</Button>}  
      </div>
      {state.modal !== undefined && <div className='--app-modal-message'>
        <Modal show={false} >
          <Modal.Header closeButton>
            <Modal.Title>Test</Modal.Title>
          </Modal.Header>
        </Modal>
      </div>}
           
    </div>
  )
}

export default App
