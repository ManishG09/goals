
// @desc Get goals
// @router GET /api/goals
// @acess Private
const getGoals = async(req,res) => {
    res.status(200).json({Message: 'Get Goals'})
}

// @desc set goals
// @router POST /api/goals
// @acess Private
const setGoal = async(req ,res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    
    res.status(200).json({Message: 'Create Goals'})
}

// @desc Update goals
// @router PUT /api/goals/:id
// @acess Private
const updateGoal =async (req,res) => {
    res.status(200).json({Message: `Update Goals ${req.params.id}`})
}


// @desc delete goals
// @router DELETE /api/goals/:id
// @acess Private

const deleteGoal = async (req,res) => {
    res.status(200).json({Message: `delete Goals ${req.params.id}`})
}



module.exports = {getGoals , setGoal, updateGoal, deleteGoal}