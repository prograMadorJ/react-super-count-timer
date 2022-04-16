import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext({});

function TimerProvider({ children, settings }) {
  return (
    <TimerContext.Provider value={{ settings }}>
      {children}
    </TimerContext.Provider>
  );
}

function useTimerContext() {
  return useContext(TimerContext);
}

const TimerSettings = ({
  _pause,
  _date,
  _time,
  _dateAlarm,
  _timeAlarm,
  _isCountDown,
  _callbackAlarm,
}) => {
  const [init, setInit] = useState({
    _pause: _pause || false,
    _date: _time ? getNewDate({..._time}) : (_date || new Date(new Date().getFullYear() + '-01-01 00:00:00Z')),
    _dateAlarm:  _timeAlarm ? getNewDate({..._timeAlarm}) :
      (_dateAlarm || new Date(new Date().getFullYear() + '-01-01 00:00:00Z')),
    _isCountDown: _isCountDown || false,
    _callbackAlarm,
  });

  const [pause, setPause] = useState(init._pause);
  const [date, setDate] = useState(init._date);
  const [timer, setTimer] = useState({});
  const [dateAlarm, setDateAlarm] = useState(init._dateAlarm);
  const [isCountDown, setIsCountDown] = useState(init._isCountDown);
  const [callbackAlarm, setCallbackAlarm] = useState(() => _callbackAlarm);
  const [isAlarmed, setIsAlarmed] = useState(false);

  function getNewDate({ days, hours, minutes, seconds }) {
    const date = new Date(new Date().getFullYear() + '-01-01 00:00:00Z');
    days && date.setUTCHours(days * 24);
    hours && date.setUTCHours(hours);
    minutes && date.setUTCMinutes(minutes);
    seconds && date.setUTCSeconds(seconds);
    return date;
  }

  function reset() {
    setDate(_time ? getNewDate({..._time}) : init._date);
    setIsCountDown(_isCountDown);
    setPause(_pause);
    setDateAlarm(_timeAlarm ? getNewDate({..._timeAlarm}) : init._dateAlarm);
    setCallbackAlarm(() => _callbackAlarm);
    setIsAlarmed(false);
  }

  function togglePause() {
    setPause(v => !v)
  }

  return {
    timer,
    setTimer,
    date,
    setDate,
    pause,
    setPause,
    dateAlarm,
    setDateAlarm,
    isCountDown,
    setIsCountDown,
    getNewDate,
    callbackAlarm,
    setCallbackAlarm,
    isAlarmed,
    setIsAlarmed,
    init,
    setInit,
    reset,
    togglePause
  };
};

function CountTimer({ children, settings }) {
  const { date, callbackAlarm } = settings;
  const [tictac, setTicTac] = useState();

  function handlePaused() {
    clearInterval(settings.timer);
    settings.setPause((v) => !v);
  }

  function handleSeconds() {
    settings.setDate((d) => {
      if (settings.isCountDown) {
        d.setUTCSeconds(d.getUTCSeconds() - 1);
      } else {
        d.setUTCSeconds(d.getUTCSeconds() + 1);
      }

      return d;
    });
  }

  function handleTicTac() {
    if (!settings.pause) {
      setTicTac(date.getUTCSeconds());
    } else {
      settings.setIsAlarmed(false);
    }
  }

  function handleAlarm() {
    if (settings.dateAlarm.toString() === date.toString()) {
      callbackAlarm && callbackAlarm();
      handlePaused();
      settings.setIsAlarmed(true);
    }
  }

  function padStart(value) {
    return String(value).padStart(2, '0');
  }

  useEffect(() => {
    if (settings.pause) return clearInterval(settings.timer);

    const timer = setInterval(() => {
      handleSeconds();
      handleTicTac();
      handleAlarm();
    }, 1000);
    settings.setTimer(timer);
  }, [settings.pause]);

  return children ? (
    <>
      {children({
        days: date.getUTCDate() - 1,
        hours: padStart(date.getUTCHours()),
        minutes: padStart(date.getUTCMinutes()),
        seconds: padStart(date.getUTCSeconds()),
      })}
    </>
  ) : (
    <>
      <span>
        {date.getUTCDate() - 1}
        <span> Days </span>
      </span>
      <span>:&nbsp;</span>
      <span>
        {date.getUTCHours()}
        <span> Hours </span>
      </span>
      <span>:&nbsp;</span>
      <span>
        {date.getUTCMinutes()}
        <span> Minutes </span>
      </span>
      <span>:&nbsp;</span>
      <span>
        {date.getUTCSeconds()}
        <span> Seconds </span>
      </span>
    </>
  );
}

export { TimerProvider, useTimerContext, TimerSettings, CountTimer };
