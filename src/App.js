import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300);

  const sentence = 'The quick brown fox jumps over the lazy dog.';

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    let newAccuracy = 100;
    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] !== sentence[i]) {
        newAccuracy -= 1;
      }
    }
    setAccuracy(newAccuracy);

    if (inputValue === sentence) {
      clearInterval(timer);
    }
  };

  const handleStart = () => {
    setTimer(300);
    setInput('');
    setAccuracy(100);
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Touch Typing Web App</h1>
      <p className="app-sentence">{sentence}</p>
      <textarea
        className="app-textarea"
        value={input}
        onChange={handleInputChange}
        placeholder="Type the sentence here"
        rows={4}
        cols={50}
      />
      <p className="app-accuracy">Accuracy: {accuracy}%</p>
      <p className="app-timer">Time: {formatTime(timer)}</p>
      <button className="app-button" onClick={handleStart}>
        Start
      </button>
    </div>
  );
};

export default App;
