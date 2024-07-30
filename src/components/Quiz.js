import React, { useEffect,useState } from 'react'
import Questions from './Questions'
import { MoveNextQuestion ,MovePrevQuestion} from '../hooks/FetchQuestions'
import { PushAnswer } from '../hooks/setResult'
/** redux store import */
import { useSelector, useDispatch } from'react-redux'
import { Navigate } from 'react-router-dom';
export default function Quiz() {
    const [check, setChecked] = useState(undefined)

    // const state= useSelector(state => state)
    const { queue, trace }= useSelector(state => state.questions);
    const { result } = useSelector(state => state.result);
    const dispatch = useDispatch()
    useEffect(() => {
    
      // console.log(state)
      // console.log(result)
  
    })

    function onNext(){
        console.log('on next');
        // dispatch(MoveNextQuestion())

        if(trace < queue.length){
          dispatch(MoveNextQuestion())

          if(result.length <= trace){
            dispatch(PushAnswer(check))
          }
        }

        // rest the value of the check variable
        setChecked(undefined);
    }
    function onPrev(){
        console.log('on prev');
        // dispatch(MovePrevQuestion())
        if(trace > 0){
          dispatch(MovePrevQuestion())
        }
    }

    function onChecked(check){
      console.log(check)
      setChecked(check);
    }

    /** Finish*/
    if(result.length && result.length >= queue.length){
      return <Navigate to='/result' replace='true'/>
    }
  return (
    <div className='container'>
     <h1 className='title text-light'>Quiz Application</h1>
     {/* display questions */}
     <Questions onChecked={onChecked} />
       <div className='grid'>
        { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button>:<div></div>}
        <button className='btn next' onClick={onNext}>Next</button>
       </div>
    </div>
  )
}
