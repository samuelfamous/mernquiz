import Questions from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

export async function getQuestions(req, res){
   try {
      const q = await Questions.find();
      res.json(q);
   } catch (error) {
     res.json({error})
   }
}

/** Insert all question = postQuestion */
// export async function insertQuestions(req, res){
//     try {
//        Questions.insertMany({ questions : [1], answers : [0]}, function(err,data){
//         res.json({ msg: "Data Saved Successfully "})
//        }) 
//     } catch (error) {
//        res.json({ error }) 
//     }
// }

export async function insertQuestions(req, res) {
    try {
        // Assuming req.body contains the data to be inserted
        // const { questions, answers } = req.body;

        // Insert data into the Questions collection
        await Questions.insertMany([{ questions, answers }]);

        // Send a success response
        res.json({ msg: "Data Saved Successfully" });
    } catch (error) {
        // Send an error response
        res.json({ error: error.message });
    }
}
/** Delete all Question */
export async function dropQuestions(req, res){
    try {
        await Questions.deleteMany();
        res.json({ msg: "Data deleted Successfully" });
    } catch (error) {
        res.json({ error })
    }
}

/** Get result */
export async function getResult(req, res){
    try {
        const r = await Result.find();
        res.json(r);
    } catch (error) {
        res.json({ error })
    }
}


/** Insert result */
// export async function storeResult(req, res){
//     try {
//         const { username, result, attempts, points , achived } = req.body;
//         if(!username && !result ) throw new Error('Data Not Provided ...!')
//         await Result.create({ username, result, attempts, points , achived },(err,data)=>{
//             res.json({ msg: "Result Saved Successfully" });});
       
//     } catch (error) {
//         res.json({ error });
//     }
// }

export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achieved } = req.body; // Fixed 'achived' to 'achieved'
        
        // Check if username or result is not provided
        if (!username || !result) {
            throw new Error('Data Not Provided ...!');
        }
        
        // Create a new result
        const newResult = await Result.create({ username, result, attempts, points, achieved });
        
        // Send a success response
        res.json({ msg: "Result Saved Successfully", data: newResult }); // Including the saved data in the response
    } catch (error) {
        // Check if it's a known error or a database error
        if (error instanceof Error) {
            res.status(400).json({ error: error.message }); // Bad Request for validation errors
        } else {
            res.status(500).json({ error: 'Internal Server Error' }); // General catch-all for other errors
        }
    }
}


/** delete all result  */
export async function dropResult(req, res){
    try {
        await Result.deleteMany();
        res.json({ msg: "Result deleted Successfully" });
    } catch (error) {
       res.json({ error }) 
    }
}


// export default router;