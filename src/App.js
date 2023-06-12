import React, { useState, useEffect } from 'react';
// import './App.css';

const generateRandomSentence = () => {
  const keysToPractice = 'asdfjkl;';
  const sentenceLength = Math.floor(Math.random() * 10) + 5; // Generate a sentence length between 5 and 14 characters
  let sentence = '';

  for (let i = 0; i < sentenceLength; i++) {
    const randomIndex = Math.floor(Math.random() * keysToPractice.length);
    sentence += keysToPractice[randomIndex];
  }

  return sentence;
};

const App = () => {
  const [input, setInput] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300);
  const [sentence, setSentence] = useState('');

  useEffect(() => {
    setSentence(generateRandomSentence());
  }, []);

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
    setSentence(generateRandomSentence());
  };

  const handleAddNewSentence = () => {
    setSentence(generateRandomSentence());
    setInput('');
    setAccuracy(100);
  };

  return (
    <div className="max-w-[600px] p-[20px] bg-[#fff] shadow-sm">
      <h1 className="text-center text-[24px] mb-[20px]">
        Touch Typing Web App
      </h1>
      <div className="flex justify-between items-center">
        <p className="mr-[8px]">{sentence}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="black"
          className="bi bi-plus"
          viewBox="0 0 16 16"
          onClick={handleAddNewSentence}
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </div>
      <textarea
        className="w-full p-[10px] text-[16px] mb-[20px] border"
        value={input}
        onChange={handleInputChange}
        placeholder="Type the sentence here"
        rows={4}
        cols={50}
      />
      <p className="text-center text-[16px] mb-[10px]">Accuracy: {accuracy}%</p>
      <p className="text-center text-[16px] mb-[10px]">
        Time: {formatTime(timer)}
      </p>
      <button
        className="block w-full p-[10px] text-[16px] bg-[#4caf50] text-white rounded-md"
        onClick={handleStart}
      >
        Start
      </button>
    </div>
  );
};

export default App;
