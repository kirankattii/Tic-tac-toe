
import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const WinnerPopup = ({ winner, onNewGame }) => {
  const { width, height } = useWindowSize();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Confetti width={width} height={height} />
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center transform">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          🎉 Player {winner} Wins! 🎉
        </h2>
        <button
          onClick={onNewGame}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinnerPopup;
