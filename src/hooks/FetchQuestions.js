import { useEffect, useState } from "react";
// import data ,{answers } from "../database/data";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
/** redux actions */
import * as Action from "../redux/question_reducer";

/** Fetch question hook to fetch api */
export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        const fetchQuestions = async () => {
            setGetData(prev => ({ ...prev, isLoading: true }));
            
            try {
                // let question = await data;
                const [{ questions,answers}] = await getServerData('http://localhost:8080/api/questions',(data) => data)
                console.log({ questions,answers})
                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({...prev, apiData : {questions , answers }}))
                    /** Dispatch an action */
                    dispatch(Action.startExamAction({question : questions,answers }));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
            
        };

        fetchQuestions();
    }, [dispatch]);

    return [getData, setGetData];
};
//============================= chatgpt ===============

/** MoveAction Dispatch Function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction())
    } catch (error) {
       console.log(error) 
    }
}

/** MovePrevAction Dispatch Function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction())
    } catch (error) {
       console.log(error) 
    }
}