import React, { useState } from 'react';

function App() {
  const [second, setSecond] = useState(1500);
  const [breakTime, setBreakTime] = useState(false);
  const [text, setText] = useState('Session');
  const [breakNum, setBreak] = useState(5);
  const [session, setSession] = useState(25);
  const [intervalId, setIntervalId] = useState(0);
  const [played, setPlayed] = useState(false);
  function Time(t) {
    // t = t * 60;
    var min = Math.floor(t / 60);
    t = t - min * 60;
    return `${min < 10 ? '0' + min : min}:${t < 10 ? '0' + t : t}`;
  }

  const incBreak = () => {
    setBreak(breakNum + 1);
  };
  const decBreak = () => {
    setBreak(breakNum - 1);
  };
  const incSec = () => {
    setSession(session + 1);
    setSecond(second + 60);
  };
  const decSec = () => {
    setSession(session - 1);
    setSecond(second - 60);
  };
  const reset = () => {
    setBreak(5);
    setSession(25);
    setSecond(1500);
    setBreakTime(false);
    setText('Session');
    clearInterval(intervalId);
    setPlayed(false);
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
      setSecond(60);
      break;
    case second < 0:
      const Break = () => {
        setBreakTime(false);
        setSecond(breakNum * 60);
        setText('Break');
      };
      const Session = () => {
        setBreakTime(true);
        setSecond(session * 60);
        setText('Session');
      };
      breakTime ? Break() : Session();
      break;
    default:
      break;
  }
  const SecondHand = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setPlayed(false);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      setSecond((second) => second - 1);
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
                onClick={played ? '' : incBreak}
                className=' btn_space click'
                id='break-increment'
              >
                <i class='fa-solid fa-plus'></i>
              </span>
              <span id='break-length' className='fs-4 btn_space'>
                {breakNum}
              </span>
              <span
                onClick={played ? '' : decBreak}
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
                onClick={played ? '' : incSec}
                className='click btn_space'
                id='session-increment'
              >
                <i class='fa-solid fa-plus'></i>
              </span>
              <span id='session-length' className='fs-4 btn_space'>
                {session}
              </span>
              <span
                onClick={played ? '' : decSec}
                className='click btn_space'
                id='session-decrement'
              >
                <i class='fa-solid fa-minus'></i>
              </span>
            </div>
          </div>
        </div>
        <section id='circle' className='text-center'>
          <h3 id='timer-label'>{text}</h3>
          <div className='mx-auto hstack gap-1' style={{ width: '30%' }}>
            <h4 id='time-left'>{Time(second)}</h4>
          </div>
          <section id='btns'>
            <span onClick={SecondHand} id='start_stop'>
              {played ? (
                <i class='fa-solid fa-circle-pause'></i>
              ) : (
                <i class='fa-solid fa-circle-play'></i>
              )}
            </span>
            <span id='reset' onClick={reset}>
              <i class='fa-solid fa-rotate'></i>
            </span>
          </section>
        </section>
      </div>
    </div>
  );
}

export default App;
