import React, { useEffect, useState } from 'react'
import beep from './assets/beep.mp3'
import './Clock.css'
export const Clock = () => {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [running, setRunning] = useState()
  const [breakTime, setBreakTime] = useState(false)

  useEffect(() => {
    setTimeLeft(sessionLength * 60)
  }, [sessionLength])

  useEffect(() => {
    if (timeLeft < 0) {
      document.getElementById('beep').play()
      setBreakTime(prev => !prev)
    }
  }, [timeLeft])

  useEffect(() => {
    if (breakTime) setTimeLeft(breakLength * 60)
    else setTimeLeft(sessionLength * 60)
  }, [breakTime])

  const runClock = () => {
    if (!running) {
      setRunning(
        setInterval(() => {
          setTimeLeft(prev => prev - 1)
        }, 1000)
      )
    } else {
      clearTimer()
    }
  }

  const reset = () => {
    clearTimer()
    const audio = document.getElementById('beep')
    audio.pause()
    audio.currentTime = 0
    setSessionLength(25)
    setBreakLength(5)
    setTimeLeft(25 * 60)
    setBreakTime(false)
  }

  const clearTimer = () => {
    clearInterval(running)
    setRunning(false)
  }
  return (
    <div className='clock' id='clock'>
      <audio id='beep' src={beep} />
      <div id='break-label'>
        Break length
        <div className='count-mod'>
          <button
            id='break-decrement'
            onClick={() => setBreakLength(prev => (prev > 1 ? prev - 1 : prev))}
          >
            -
          </button>
          <div id='break-length'>{breakLength}</div>
          <button
            id='break-increment'
            onClick={() =>
              setBreakLength(prev => (prev < 60 ? prev + 1 : prev))
            }
          >
            +
          </button>
        </div>
      </div>
      <div id='session-label'>
        Session length
        <div className='count-mod'>
          <button
            id='session-decrement'
            onClick={() =>
              setSessionLength(prev => (prev > 1 ? prev - 1 : prev))
            }
          >
            -
          </button>{' '}
          <div id='session-length'>{sessionLength}</div>
          <button
            id='session-increment'
            onClick={() =>
              setSessionLength(prev => (prev < 60 ? prev + 1 : prev))
            }
          >
            +
          </button>
        </div>
      </div>

      <div id='timer-label' className='timer-label'>
        {breakTime ? 'Break' : 'Session'}
        <div id='time-left'>
          {`${
            timeLeft / 60 < 10
              ? `0${Math.floor(timeLeft / 60)}`
              : Math.floor(timeLeft / 60)
          }:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`}
        </div>
      </div>
      <div className='action-buttons'>
        <button id='start_stop' onClick={runClock}>
          Start/stop
        </button>
        <button id='reset' onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  )
}
