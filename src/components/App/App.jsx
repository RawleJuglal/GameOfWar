import React from 'react'
import './App.css'





function App() {
  const [state, setState] = React.useState({})


  function handleClick(){
    fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle`)
      .then(res=>res.json())
      .then(data=> {
        setState(()=>{
          return {...data}
        })
      })
  }
  
  function drawCards(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${state.deck_id}/draw/?count=2`)
    .then(res=>res.json())
    .then(data=>{
      setState((prevState)=>{
        return {...prevState, cards:data.cards, remaining:data.remaining}
      })
    })
  
  }

  return (
    <div className="--app-app-container">
      <div className='--app-controls-container'>
        <button className='--app-new-deck-btn' onClick={handleClick}>New Deck</button>
        {state.deck_id && <button className='--app-draw-cards-btn'  onClick={state.deck_id && drawCards}>Draw</button>}
        {state.remaining != undefined && <p>Remaining Cards: {state.remaining}</p>}
      </div>
      {state.cards !== undefined && <div className='--app-presenter-container'>
        <div className='--app-computer-card'>
          <h1>Computers Card</h1>
          <img src={state.cards[0].image} alt={state.cards[0].value + 'of ' + state.cards[0].suit} /> 
        </div>
        <div className='--app-player-card'>
          <h1>Players Card</h1>
        <img src={state.cards[1].image} alt={state.cards[1].value + 'of ' + state.cards[1].suit} />
        </div>
      </div>}      
    </div>
  )
}

export default App
