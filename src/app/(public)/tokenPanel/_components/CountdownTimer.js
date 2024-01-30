import React from 'react'

import { useCountdown } from './hooks/useCountdown'

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="time__board contain">
      <div className="item__container">
        <div className="time__item">
          <span className="text__value">{days < 0 ? 0 : days}</span>
        </div>
        <span className="text__title">Days</span>
      </div>
      <div className="time__separate">
        <p>:</p>
      </div>
      <div className="item__container">
        <div className="time__item">
          <span className="text__value">{hours < 0 ? 0 : hours}</span>
        </div>
        <span className="text__title">Hours</span>
      </div>
      <div className="time__separate">
        <p>:</p>
      </div>
      <div className="item__container">
        <div className="time__item">
          <span className="text__value">{minutes < 0 ? 0 : minutes}</span>
        </div>
        <span className="text__title">Minutes</span>
      </div>
      <div className="time__separate">
        <p>:</p>
      </div>
      <div className="item__container">
        <div className="time__item">
          <span className="text__value">{seconds < 0 ? 0 : seconds}</span>
        </div>
        <span className="text__title">Seconds</span>
      </div>
    </div>
  )
}

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />
}

export default CountdownTimer
