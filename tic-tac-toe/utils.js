
let createGameBoard = () => {
    let board = new Array(9).fill(null);
    return board;
}
let opt={
    1:9,
    2:8,
    3:7,
    4:6
}
const winningPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
]
let checkIsWinner = (board, img) => {
    let positions = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === img) {
            positions.push(i);
        }
    }

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

    return winningPatterns.some(pattern => 
        pattern.every(index => positions.includes(index))
    );
};

export { createGameBoard,checkIsWinner };

// if(board[0]==img | board[1]==img | board[2]==img | board[3]==img | board[5]==img | board[6]==img |board[7]==img | board[8]==img){
        
//      }