const GameSetup = ({ gridSize, setGridSize, winStreak, setWinStreak, onStartGame }) => {

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md  m-auto mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Advanced Tic-Tac-Toe</h1>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Grid Size (3-10):</label>
            <input
              type="number"
              min="3"
              max="10"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="w-full border-2 border-gray-300 focus:border-blue-500 text-gray-700 px-4 py-3 rounded-lg transition-colors"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Win Streak (3-{gridSize}):</label>
            <input
              type="number"
              min="3"
              max={gridSize}
              value={winStreak}
              onChange={(e) => setWinStreak(Number(e.target.value))}
              className="w-full border-2 border-gray-300 focus:border-blue-500 text-gray-700 px-4 py-3 rounded-lg transition-colors"
            />
          </div>
          <button
            onClick={onStartGame}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-bold text-lg"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameSetup;
