import React, { useState, useEffect } from 'react';
import './App.css';

const sentences = [
  'Ask a lad fad flask',
  'Jazz lad asks',
  'Lass flasks add',
  'Salsa lad asks',
  'Jafska lads add flask',
  'Dad asks a flask',
  'All flasks add',
  'Sad dad fad lass',
];

function App() {
  const [currentSentence, setCurrentSentence] = useState('');
  const [nextSentence, setNextSentence] = useState('');
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [keyCount, setKeyCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCorrect, setIsCorrect] = useState(true);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      const totalKeys = currentSentence.length;
      const incorrectKeys = Array.from(typedText).reduce(
        (count, char, index) => {
          return count + (char !== currentSentence[index] ? 1 : 0);
        },
        0
      );
      const accuracyPercentage =
        totalKeys > 0 ? ((totalKeys - incorrectKeys) / totalKeys) * 100 : 0;

      setKeyCount(totalKeys);
      setAccuracy(accuracyPercentage.toFixed(2));
    }
  }, [timeRemaining, currentSentence, typedText]);

  const handleTyping = (e) => {
    const { value } = e.target;
    const currentTime = new Date().getTime();
    let isCorrect = true;

    if (!startTime) {
      setStartTime(currentTime);
    }

    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentSentence[i]) {
        isCorrect = false;
        break;
      }
      if (!'asdfjkl'.includes(value[i])) {
        isCorrect = false;
        break;
      }
    }

    setTypedText(value);
    setIsCorrect(isCorrect);

    if (value === currentSentence) {
      setCurrentSentence(nextSentence);
      setNextSentence(sentences[Math.floor(Math.random() * sentences.length)]);
      setTypedText('');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Touch Typing App</h1>

      <div className="typing-container">
        <div className="stats">
          <span id="timer">{formatTime(timeRemaining)}</span>
          <span id="accuracy">Accuracy: {accuracy}%</span>
        </div>

        <div id="sentence">
          {currentSentence}
          <span className="next-sentence">{nextSentence}</span>
        </div>

        <textarea
          id="typing-box"
          placeholder="Start typing here..."
          value={typedText}
          onChange={handleTyping}
          className={isCorrect ? '' : 'incorrect'}
          autoFocus
        />
      </div>
    </div>
  );
}

export default App;
