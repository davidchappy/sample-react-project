import React from 'react'
import './ProgressBar.css'

// The step/page progress bar visible only on mobile - 10-24-17
export const ProgressBar = props => {
  // 3% starting value
  const barWidth = ((props.currentStep / props.stepCount) * 100) + 3
  const meter = <div className="meter" style={{ width: barWidth + "%" }}></div>

  return (
    <div className="ProgressBar">
      {meter}
    </div>
  )
}

export default ProgressBar

