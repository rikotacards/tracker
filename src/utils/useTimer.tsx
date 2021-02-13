import React from 'react'; 

export const useTimer = (initialState = 0) => {
  const [timer, setTimer] = React.useState(initialState)
  const [isActive, setIsActive] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)
  const countRef = React.useRef<any>(null)
console.log('useTimer is running')
  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      console.log('INSIDE TIMER', timer)
      setTimer((timer) => timer + 1)
    }, 1000)
  }
  console.log('isActive', isActive, 'isPaused', isPaused, 'timer', timer)

  const handlePause = () => {
    console.log('++++++PAUSE HANDLING')
    console.log('ON Pause, CURRENT', countRef.current)
    clearInterval(countRef.current)
    setIsPaused(false)
  }

  const handleResume = () => {
    console.log('RESUMM!')
    setIsPaused(true)
    console.log('====== ON RESUME CURRENT', countRef.current)
    countRef.current = setInterval(() => {
      console.log('RESUME, timer', timer)
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
}