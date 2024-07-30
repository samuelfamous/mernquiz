import React, { useEffect, useState } from 'react'
// import data from '../database/data'

/** Custome hook */
import { useFetchQuestion } from '../hooks/FetchQuestions';
import { useDispatch, useSelector } from 'react-redux';
// import { updateResultAction } from '../redux/result_reducer';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {

    const [checked ,setChecked ] = useState(undefined);
    
    // const question = data[0]

    const [{isLoading, apiData, serverError}] = useFetchQuestion();

    const dispatch = useDispatch();
     
    const  questions  = useSelector(state => state.questions.queue[state.questions.trace])
    const trace = useSelector(state => state.questions.trace)
    const result = useSelector(state => state.result.result)
    useSelector(state => console.log(state))
    useEffect(() => {
      // console.log(isLoading)
      console.log(apiData)
      // console.log(serverError)
        // console.log(data)
        // console.log(questions)
        console.log({trace,checked});

        dispatch(updateResult({trace,checked }))
    },[checked])

    function onSelect(i){
        setChecked(i);
        // console.log('radio btn change',i);
        onChecked(i);
        dispatch(updateResult({trace,checked }))
    }

    if(isLoading) return <h3 className='text-ligh'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>Error: {serverError || "Unknow Error"}</h3>
  return (
    <div className='questions'>
      <h2 className='text-light'>{questions?.question}</h2>
      <ul key={questions?.id}>
         {questions?.options.map((q,i) =>(
            <li key={i}>
            <input
             type="radio"
             value={false}
             name='option'
             id= {`q${i}-option`}//'q1-option' 
             onChange={() => onSelect(i)}
            />
            <label className='text-primary' htmlFor= {`q${i}-option`}>{q}</label>
            <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
            </li> 
         ))}
      </ul>
    </div>
  
    
  )
}
