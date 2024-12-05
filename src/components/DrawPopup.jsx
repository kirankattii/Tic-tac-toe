// Create src/components/DrawPopup.jsx
import { useState, useCallback, useRef, useEffect } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const DrawPopup = ({ onNewGame }) => {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55
    });
  }, [makeShot]);

  useEffect(() => {
    fire();
    const interval = setInterval(fire, 2000);
    return () => clearInterval(interval);
  }, [fire]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0
        }}
      />
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center transform">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          🤝 It's a Draw! 🤝
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

export default DrawPopup;
