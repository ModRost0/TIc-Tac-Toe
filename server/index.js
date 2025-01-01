const io = require('socket.io')(3000, {
    cors: {
      origin: ['http://localhost:5173']
    }
  });
  
  let imgY = 'https://imgs.search.brave.com/E_GxrvoAse1hh8U3hy_-LGPJMtgTBviwgDwFGnlJ5pI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS81MDEt/NTAxODE4Ml90aHVt/Yi1pbWFnZS10aWMt/dGFjLXRvZS1jaXJj/bGUtcG5nLXRyYW5z/cGFyZW50LnBuZw';
  let imgZ = 'https://imgs.search.brave.com/7HAtQYcSzoUnLXQFgrvlDt1Q3TF-JwMJ3vuYjQpZIIo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODky/MTk5NTkvcGhvdG8v/cHVycGxlLXdhbGwu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWlGVHNLbUhDeUZa/U0pCZnloN09oT1Nz/Nno1YS1wenVpb2FF/aWpqcDZUZEE9';
  let imgX = 'https://imgs.search.brave.com/gS-omI_zKB9gi97wDyV_nw6knEmqi0tZxr1m_pVpyX8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jbGlw/YXJ0LWxpYnJhcnku/Y29tL25ld19nYWxs/ZXJ5LzUyNzk4NF9y/ZWQteC1tYXJrLXBu/Zy5wbmc';
  
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  function checkIsWinner(board, currentPlayerImage) {
    return winningPatterns.some(pattern => 
      pattern.every(index => board[index] === currentPlayerImage)
    );
  }
  
  io.on('connection', (socket) => {
    console.log('Player connected');

    socket.on('player-moved', (board,index, playerImage) => {
      board[index] = playerImage;
  
      if (checkIsWinner(board, playerImage)) {
       
        io.emit('game-winner',  playerImage?imgX:imgY);
        return;
      }
      io.emit('player-response', board);
      console.log(board);
    });
  
    socket.on('reset-game', () => {
      board = Array(9).fill(null);
      currentPlayer = true;
      io.emit('player-response', board, currentPlayer);
    });
  
  });
  