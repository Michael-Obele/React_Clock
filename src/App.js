import React, { useState, useEffect } from 'react';

function App() {
  const [breakNum, setBreak] = useState(5);
  const [session, setSession] = useState(25);
  const [second, setSecond] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [played, setPlayed] = useState(false);
  const incBreak = () => {
    setBreak(breakNum + 1);
  };
  const decBreak = () => {
    setBreak(breakNum - 1);
  };
  const incSec = () => {
    setSession(session + 1);
  };
  const decSec = () => {
    setSession(session - 1);
  };
  switch (true) {
    case second == 10:
      clearInterval(intervalId);
      break;
    default:
      break;
  }
  const SecondHand = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setPlayed(false);
      setIntervalId(0);
      console.log(intervalId);
      return;
    }

    const newIntervalId = setInterval(() => {
      setSecond((second) => second + 1);
    }, 1000);
    setPlayed(true);
    setIntervalId(newIntervalId);
    return second;
  };

  return (
    <div>
      <h1 className='text-center'>25+5 Clock</h1>
      <div className='container'>
        <div class='row align-items-start'>
          <div className='col text-center'>
            <h3 id='break-label'>Break Length</h3>
            <div className='btn_space'>
              <span
                onClick={incBreak}
                className=' btn_space click'
                id='break-increment'
              >
                <i class='fa-solid fa-plus'></i>
              </span>
              <span id='break-length' className='fs-4 btn_space'>
                {breakNum}
              </span>
              <span
                onClick={decBreak}
                className='click btn_space'
                id='break-decrement'
              >
                <i class='fa-solid fa-minus'></i>
              </span>
            </div>
          </div>
          <div className='col text-center'>
            <h3 id='session-label' className=''>
              Session Length
            </h3>
            <div className=''>
              <span
                onClick={incSec}
                className='click btn_space'
                id='session-increment'
              >
                <i class='fa-solid fa-plus'></i>
              </span>
              <span id='session-length' className='fs-4 btn_space'>
                {session}
              </span>
              <span
                onClick={decSec}
                className='click btn_space'
                id='session-decrement'
              >
                <i class='fa-solid fa-minus'></i>
              </span>
            </div>
          </div>
        </div>
        <section id='circle' className='text-center'>
          <h3 id='timer-label'>Timer</h3>
          <h4>{second}</h4>
          <span onClick={SecondHand}>
            {played ? (
              <i class='fa-solid fa-circle-pause'></i>
            ) : (
              <i class='fa-solid fa-circle-play'></i>
            )}
          </span>
        </section>
      </div>
    </div>
  );
}

export default App;
