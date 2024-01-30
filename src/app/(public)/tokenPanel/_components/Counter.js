import React from 'react'
import CountdownTimer from './CountdownTimer'

import './counter.css'

export default function Counter({ date }) {
  return (
    <div>
      <CountdownTimer targetDate={date} />
    </div>
  )
}
