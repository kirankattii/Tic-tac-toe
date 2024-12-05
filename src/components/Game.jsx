


import { useState } from 'react';
import WinnerPopup from './WinnerPopup';
import GameBoarSetup from './GameSetup';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';
import DrawPopup from './DrawPopup';

const Game = () => {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);

  const [isDraw, setIsDraw] = useState(false);


  const initializeBoard = () => {
    const newBoard = Array(gridSize).fill(null)
      .map(() => Array(gridSize).fill(null));
    setBoard(newBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setWinningCells([]);
    setGameStarted(true);
  };

  const checkWinner = (board, row, col) => {
    const directions = [
      [[0, 1], [0, -1]],
      [[1, 0], [-1, 0]],
      [[1, 1], [-1, -1]],
      [[1, -1], [-1, 1]]
    ];

    for (const [dir1, dir2] of directions) {
      let count = 1;
      const winningPositions = [[row, col]];

      for (const [dx, dy] of [dir1, dir2]) {
        let newRow = row + dx;
        let newCol = col + dy;

        while (
          newRow >= 0 && newRow < gridSize &&
          newCol >= 0 && newCol < gridSize &&
          board[newRow][newCol] === currentPlayer
        ) {
          count++;
          winningPositions.push([newRow, newCol]);
          newRow += dx;
          newCol += dy;
        }
      }

      if (count >= winStreak) {
        setWinner(currentPlayer);
        setWinningCells(winningPositions);
        return;
      }
    }
  };

  // In Game.jsx, add this function
  const checkDraw = (board) => {
    return board.every(row => row.every(cell => cell !== null));
  };



  const handleCellClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    checkWinner(newBoard, row, col);
    if (!winner && checkDraw(newBoard)) {
      setIsDraw(true);
    }
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };


  return (
    <div className="container mx-auto px-4 py-8">
      {!gameStarted ? (
        <GameSetup
          gridSize={gridSize}
          setGridSize={setGridSize}
          winStreak={winStreak}
          setWinStreak={setWinStreak}
          onStartGame={initializeBoard}
        />
      ) : (
        <div className="max-w-lg mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-400">
              Current Player: <span className="text-blue-600">{currentPlayer}</span>
            </h2>
          </div>
          <GameBoard
            board={board}
            gridSize={gridSize}
            winningCells={winningCells}
            handleCellClick={handleCellClick}
            winner={winner}
          />
          <button
            onClick={() => setGameStarted(false)}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-bold text-lg"
          >
            New Game
          </button>
        </div>
      )}
      {winner && (
        <WinnerPopup
          winner={winner}
          fire1={winner}
          onNewGame={() => {
            setWinner(null);
            setIsDraw(false);
            setGameStarted(false);
          }}
        />
      )}
      {isDraw && !winner && (
        <DrawPopup
          onNewGame={() => {
            setIsDraw(false);
            setGameStarted(false);
          }}
        />
      )}
    </div>
  );
};

export default Game;
