import { useEffect, useState } from 'react'
import { createGameBoard, checkIsWinner } from '../utils'
import  io from 'socket.io-client';

let imgY = 'https://imgs.search.brave.com/E_GxrvoAse1hh8U3hy_-LGPJMtgTBviwgDwFGnlJ5pI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS81MDEt/NTAxODE4Ml90aHVt/Yi1pbWFnZS10aWMt/dGFjLXRvZS1jaXJj/bGUtcG5nLXRyYW5z/cGFyZW50LnBuZw';
let imgZ = 'https://imgs.search.brave.com/7HAtQYcSzoUnLXQFgrvlDt1Q3TF-JwMJ3vuYjQpZIIo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODky/MTk5NTkvcGhvdG8v/cHVycGxlLXdhbGwu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWlGVHNLbUhDeUZa/U0pCZnloN09oT1Nz/Nno1YS1wenVpb2FF/aWpqcDZUZEE9';
let imgX = 'https://imgs.search.brave.com/gS-omI_zKB9gi97wDyV_nw6knEmqi0tZxr1m_pVpyX8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jbGlw/YXJ0LWxpYnJhcnku/Y29tL25ld19nYWxs/ZXJ5LzUyNzk4NF9y/ZWQteC1tYXJrLXBu/Zy5wbmc';

function App() {
  let socket = io('http://localhost:3000/')
  let [currentPlayer, setCurrentPlayer] = useState(true)
  let [board, setBoard] = useState(() => createGameBoard())
  let [isWinner, setIsWinner] = useState({isWinner:'',img:''})
socket.on('game-winner',(img) =>{
  let winner = img == imgX? 'O won!!':'X won!!'
  setIsWinner({isWinner:winner,img})
})
socket.on('player-response', (updatedBoard) => {
      setBoard(updatedBoard)
      setCurrentPlayer(!currentPlayer)
})
  const handleClick = (index) => {
    socket.emit('player-moved', board, index, currentPlayer)
  }
const handleReset =() =>{
  setBoard(createGameBoard)
  setIsWinner({})
}
  return (
    <>
      <div>{isWinner.isWinner}</div>
      <div style={{ display: 'flex', flexWrap: "wrap", height: 600, width: 600 }}>
        {board.map((val, index) => {
          if(val===null){
            val=imgZ
          }else{
            val = val?imgX:imgY
          }
          return (
            <div
              onClick={() => handleClick(index)}
              style={{
                backgroundImage: `url(${val})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                margin: 1,
                width: '33%',
                height: '33%'
              }}
              key={index}
            />
          )
        })}
      </div>
      {isWinner && <button onClick={handleReset}>Reset</button>}
    </>
  )
}

export default App
