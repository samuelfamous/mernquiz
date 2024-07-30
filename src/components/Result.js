import React, { useEffect } from 'react'
import '../styles/Result.css'
import { Link } from'react-router-dom'
import ResultTable from './ResultTable'
import { useDispatch , useSelector} from 'react-redux'
import { attempts_Number, earnedPoints_Number , flagResult} from '../helper/helper'

/** import actions */
import { resetResultAction } from '../redux/result_reducer'
import { resetAllAction } from '../redux/question_reducer'
import { usePublishResult } from '../hooks/setResult'
export default function Result() {

  const dispatch = useDispatch()
   const { questions : {queue, answers }, result : {result ,userId }} = useSelector(state => state)

    useEffect(() => {
      console.log(attempts,earnedPoints,flag)
    })

  const totalPoints = queue.length * 10 
  const attempts = attempts_Number(result)
  const earnedPoints = earnedPoints_Number(result,answers, 10);
  const flag = flagResult(totalPoints,earnedPoints)

  /** Store user result  */
  usePublishResult({
    result,
    username : userId,
    attempts,
    points:earnedPoints,
    achieved : flag ? "Passed" : "Failed"})
  function onRestart(){
    console.log('On Restart')
    dispatch(resetResultAction())
    dispatch(resetAllAction())
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>

      <div className='result flex-center'>
        <div className='flex'>
          <span>Username</span>
          <span className='bold'>Dailly Tutorial</span>
        </div>

        <div className='flex'>
          <span>Total Quiz Point :</span>
          <span className='bold'>{totalPoints || 0}</span>
        </div>

        <div className='flex'>
          <span>Total Question :</span>
          <span className='bold'>{queue.length || 0 }</span>
        </div>

        <div className='flex'>
          <span>Total Attemps</span>
          <span className='bold'>{attempts || 0 }</span>
        </div>

        <div className='flex'>
          <span>Total Earn Points</span>
          <span className='bold'>{earnedPoints || 0}</span>
        </div>

        <div className='flex'>
          <span>Quiz Result</span>
          <span className='bold' style={{ color : `${flag ? "#2aff95" : "#ff2a66"}`}}>{flag ? "Passed" : " Failed"}</span>

        </div>
      </div>

      {/* restart btn */}
      <div className='start'>
        <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
      </div>
      {/* result table */}
      <div className="container">
        <ResultTable />
      </div>
    </div>
  )
}
