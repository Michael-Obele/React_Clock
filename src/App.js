import React, { useState, useRef } from 'react';

function App() {
  const [breakTime, setBreakTime] = useState(false);
  const [text, setText] = useState('Session');
  const [breakNum, setBreak] = useState(5);
  const [session, setSession] = useState(25);
  const [second, setSecond] = useState(1500);
  const [intervalId, setIntervalId] = useState(0);
  const [played, setPlayed] = useState(false);
  const beepSound = useRef();
  function Time(t) {
    var min = Math.floor(t / 60);
    t = t - min * 60;
    return `${min < 10 ? '0' + min : min}:${t < 10 ? '0' + t : t}`;
  }

  const incBreak = () => {
    setBreak(breakNum + 1);
    if (breakTime) {
      if (breakNum < 60) {
        setSecond((breakNum + 1) * 60);
      }
    }
  };
  const decBreak = () => {
    setBreak(breakNum - 1);
    if (breakTime) {
      if (breakNum > 1) {
        setSecond((breakNum - 1) * 60);
      }
    }
  };
  const incSec = () => {
    setSession(session + 1);
    if (!breakTime) {
      if (session < 60) {
        setSecond((session + 1) * 60);
      }
    }
  };
  const decSec = () => {
    setSession(session - 1);
    if (!breakTime) {
      if (session > 1) {
        setSecond((session - 1) * 60);
      }
    }
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
      const Break = () => {
        setBreakTime(true);
        setSecond(breakNum * 60);
        setText('Break');
      };
      const Session = () => {
        setBreakTime(false);
        setSecond(session * 60);
        setText('Session');
      };
      breakTime ? Session() : Break();
      break;
    case second === 0:
      beepSound.current.play();
      break;
    default:
      break;
  }
  const SecondHand = () => {
    if (intervalId) {
      setIntervalId(0);
      clearInterval(intervalId);
      setPlayed(false);
      return 0;
    }

    const newIntervalId = setInterval(() => {
      setSecond((second) => second - 1);
    }, 100);
    setPlayed(true);
    setIntervalId(newIntervalId);
    return second;
  };
  const reset = () => {
    setBreak(5);
    beepSound.current.pause();
    beepSound.current.load();
    setSession(25);
    setSecond(1500);
    setBreakTime(false);
    setText('Session');
    setIntervalId(0);
    clearInterval(intervalId);
    setPlayed(false);
  };

  return (
    <div>
      <h1 className='text-center fs-1 title'>25+5 Clock</h1>
      <div className='container'>
        <div className='row align-items-start'>
          <div className='col-lg text-center'>
            <h3 id='break-label'>Break Length</h3>
            <div className='btn_space'>
              <span
                onClick={played ? '' : incBreak}
                className=' btn_space click'
                id='break-increment'
              >
                <i className='fa-solid fa-plus'></i>
              </span>
              <span id='break-length' className='fs-4 btn_space'>
                {breakNum}
              </span>
              <span
                onClick={played ? '' : decBreak}
                className='click btn_space'
                id='break-decrement'
              >
                <i className='fa-solid fa-minus'></i>
              </span>
            </div>
          </div>
          <div className='col-lg text-center'>
            <h3 id='session-label' className=''>
              Session Length
            </h3>
            <div className=''>
              <span
                onClick={played ? '' : incSec}
                className='click btn_space'
                id='session-increment'
              >
                <i className='fa-solid fa-plus'></i>
              </span>
              <span id='session-length' className='fs-4 btn_space'>
                {session}
              </span>
              <span
                onClick={played ? '' : decSec}
                className='click btn_space'
                id='session-decrement'
              >
                <i className='fa-solid fa-minus'></i>
              </span>
            </div>
          </div>
        </div>
        <section id='circle' className='text-center'>
          <h3 id='timer-label'>{text}</h3>
          <div
            className='mx-auto hstack gap-1 text-center'
            style={{ width: '30%' }}
          >
            <h4
              id='time-left'
              className='text-center'
              style={second < 60 ? { color: 'red' } : {}}
            >
              {Time(second)}
            </h4>
          </div>
          <section id='btns'>
            <span id='start_stop' onClick={SecondHand}>
              {played ? (
                <i className='fa-solid fa-circle-pause'></i>
              ) : (
                <i className='fa-solid fa-circle-play'></i>
              )}
            </span>
            <span id='reset' onClick={reset}>
              <i className='fa-solid fa-rotate'></i>
            </span>
          </section>
        </section>
      </div>
      <audio
        id='beep'
        preload='auto'
        ref={beepSound}
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </div>
  );
}

export default App;
