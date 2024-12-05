const GameBoard = ({ board, gridSize, winningCells, handleCellClick, winner }) => (
  <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
    {board.map((row, i) => (
      row.map((cell, j) => (
        <button
          key={`${i}-${j}`}
          onClick={() => handleCellClick(i, j)}
          className={`
            cell-animated aspect-square text-4xl font-bold
            ${winningCells.some(([row, col]) => row === i && col === j)
              ? 'winner-cell bg-green-500 text-white'
              : 'bg-white hover:bg-gray-100 text-gray-800'}
            rounded-xl shadow-md border-2 border-gray-200 flex items-center justify-center
          `}
          disabled={!!winner || !!cell}
        >
          {cell}
        </button>
      ))
    ))}
  </div>
);

export default GameBoard;
