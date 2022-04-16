import React, { useState, useEffect } from 'react';
import { useTimerContext, CountTimer, TimerSettings } from './CountTimer';

export default function App() {
  const [resultGlobalTimesUp, setResultGlobalTimesUp] = useState(false);
  const [resultTimesUp1, setResultTimesUp1] = useState(false);
  const [resultTimesUp2, setResultTimesUp2] = useState(false);


  const settings = useTimerContext().settings({
    _time: {seconds: 10},
    _isCountDown: true,
    _callbackAlarm: () => setResultGlobalTimesUp(<div>Tempo Global Esgotado!</div>),
  });

  const settings1 = TimerSettings({
    _time: {minutes: 1},
    _timeAlarm: {seconds: 30},
    _isCountDown: true,
    _callbackAlarm: () => setResultTimesUp1(<div>Tempo #1 Esgotado!</div>),
  });

  const settings2 = TimerSettings({
    _timeAlarm: {minutes: 1},
    _callbackAlarm: () => setResultTimesUp2(<div>Tempo #2 Esgotado!</div>),
  });

  function handleGlobalReset() {
    settings.reset();
    setResultGlobalTimesUp(false);
  }

  function handleReset1() {
    settings1.reset();
    setResultTimesUp1(false);
  }

  function handleReset2() {
    settings2.reset();
    setResultTimesUp2(false);
  }


  return (
    <>
      <h1>React Global Count Down Timer Example</h1>
      <CountTimer settings={settings}>
        {({ days, hours, minutes, seconds }) => {
          return (
            <>
              ⏱⬇
              <span> {days}d : </span>
              <span>{hours}h : </span>
              <span>{minutes}m : </span>
              <span>{seconds}s </span>
            </>
          );
        }}
      </CountTimer>
      <br />
      <br />
      {!settings.isAlarmed && (
        <>
          <button onClick={() => settings.togglePause()}>
            {!settings.pause ? 'pausar' : 'continuar'}
          </button>
        </>
      )}
      {settings.isAlarmed && (
        <>
          <button onClick={handleGlobalReset}>reiniciar</button>
        </>
      )}
      <br />
      <br />
      {resultGlobalTimesUp}
      <br />
      <br />
      <h1>React Standalone #1 Count Down Timer Example</h1>
      <CountTimer settings={settings1}>
        {({ days, hours, minutes, seconds }) => {
          return (
            <>
              ⏱⬇
              <span> {days}d : </span>
              <span>{hours}h : </span>
              <span>{minutes}m : </span>
              <span>{seconds}s </span>
            </>
          );
        }}
      </CountTimer>
      <br />
      <br />
      {!settings1.isAlarmed && (
        <>
          <button onClick={() => settings1.togglePause()}>
            {!settings1.pause ? 'pausar' : 'continuar'}
          </button>
        </>
      )}
      {settings1.isAlarmed && (
        <>
          <button onClick={handleReset1}>reiniciar</button>
        </>
      )}
      <br />
      <br />
      {resultTimesUp1}
      <br />
      <br />
      <h1>React Standalone #2 Count Up Timer Example</h1>
      <CountTimer settings={settings2}>
        {({ days, hours, minutes, seconds }) => {
          return (
            <>
              ⏱⬆
              <span> {days}d : </span>
              <span>{hours}h : </span>
              <span>{minutes}m : </span>
              <span>{seconds}s </span>
            </>
          );
        }}
      </CountTimer>
      <br />
      <br />
      {!settings2.isAlarmed && (
        <>
          <button onClick={() => settings2.togglePause()}>
            {!settings2.pause ? 'pausar' : 'continuar'}
          </button>
        </>
      )}
      {settings2.isAlarmed && (
        <>
          <button onClick={handleReset2}>reiniciar</button>
        </>
      )}
      <br />
      <br />
      {resultTimesUp2}
      <br />
      <br />
    </>
  );
}
