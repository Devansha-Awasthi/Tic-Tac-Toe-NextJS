'use client';

import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [isX, setIsX] = useState(true);
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // Function to play sound
  const playSound = (sound) => {
    const audio = new Audio(`/sounds/${sound}.mp3`);
    audio.play();
  };

  const checkWinner = (newBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
        setWinner(newBoard[a]);
        setShowMessage(true);
        playSound('win'); // Play win sound
        return true;
      }
    }
    if (!newBoard.includes('')) {
      setWinner('DRAW');
      setShowMessage(true);
      playSound('draw'); // Play draw sound
    }
    return false;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isX ? 'X' : 'O';
    setBoard(newBoard);
    setIsX(!isX);
    setCount(count + 1);

    playSound('click'); // Play click sound when a button is pressed

    checkWinner(newBoard);
  };

  const resetGame = () => {
    playSound('click'); // Play click sound when a button is pressed
    setBoard(Array(9).fill(''));
    setIsX(true);
    setCount(0);
    setWinner(null);
    setShowMessage(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-teal-600 text-center p-4">
      {showMessage && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-75">
          <div className="text-white text-4xl font-bold mb-4">
            {winner === 'DRAW' ? "It's a draw!" : `Congratulations, ${winner} won!`}
          </div>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-300 transition"
          >
            New Game
          </button>
        </div>
      )}
      <h1 className="text-4xl font-bold font-sans my-6 text-black">TIC TAC TOE</h1>
      <div className="grid grid-cols-3 gap-4 w-64">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-beige text-brown text-4xl flex items-center justify-center rounded-xl shadow-md border-none"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-black text-beige rounded-lg hover:bg-gray-700 transition"
        >
          Reset Game
        </button>
      </div>
    </main>
  );
}
