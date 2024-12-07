import { useState } from "react";

const GameSetup = ({ gridSize, setGridSize, winStreak, setWinStreak, onStartGame }) => {
  const [errors, setErrors] = useState({ gridSize: '', winStreak: '' });

  // validation for the number of boxes 3 to 10
  const validateInputs = () => {
    let valid = true;
    const newErrors = { gridSize: '', winStreak: '' };

    // validation for boxes 3-10
    if (gridSize < 3 || gridSize > 10) {
      newErrors.gridSize = 'Grid size must be between 3 and 10.';
      valid = false;
    }
    // validation for winStreak
    if (winStreak < 3 || winStreak > gridSize) {
      newErrors.winStreak = `Win streak must be between 3 and ${gridSize}.`;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleStartGame = () => {
    if (validateInputs()) {
      onStartGame();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md m-auto mx-auto bg-white p-8 rounded-xl shadow-lg min-w-[400px]">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 "> Tic-Tac-Toe</h1>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Grid Size (3-10):</label>
            <input
              type="number"
              value={gridSize}
              min={3}
              max={10}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className={`w-full border-2 px-4 py-3 rounded-lg transition-colors ${errors.gridSize ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
            />
            {errors.gridSize && <p className="text-red-500 text-sm mt-1">{errors.gridSize}</p>}
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">Win Streak (3-{gridSize}):</label>
            <input
              type="number"
              min="3"
              max={gridSize}
              value={winStreak}
              onChange={(e) => setWinStreak(Number(e.target.value))}
              className={`w-full border-2 px-4 py-3 rounded-lg transition-colors ${errors.winStreak ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
            />
            {errors.winStreak && <p className="text-red-500 text-sm mt-1">{errors.winStreak}</p>}
          </div>
          <button
            onClick={handleStartGame}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-bold text-lg"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
