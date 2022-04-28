import React, { useState } from 'react';

function App() {
  const [breakNum, setBreak] = useState(5);
  const [session, setSession] = useState(25);
  const [time, setTime] = useState(session * 60);
  const [intervalId, setIntervalId] = useState(0);
  const [played, setPlayed] = useState(false);
  function Time(t) {
    var min = Math.floor(t / 60);
    t = t - min * 60;
    return [t, min];
  }
  const [second, setSecond] = useState(Time(time)[0]);
  const [min, setMin] = useState(Time(time)[1]);
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
    case breakNum >= 61:
      setBreak(60);
      break;
    case breakNum < 1:
      setBreak(1);
      break;
    case session >= 61:
      setSession(60);
      break;
    case session < 1:
      setSession(1);
      break;
    case second < 0:
      setSecond(59);
      setMin((min) => min - 1);
      break;
    default:
      break;
  }
  const SecondHand = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setPlayed(!played);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      setSecond((second) => second - 1);
    }, 1000);
    setPlayed(!played);
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
          <div className='mx-auto hstack gap-1' style={{ width: '30%' }}>
            <h4>{min < 10 ? '0' + min : min}:</h4>
            <h4>{second < 10 ? '0' + second : second}</h4>
          </div>
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
