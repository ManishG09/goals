const Goal = require('../models/goalModel')




// @desc Get goals
// @router GET /api/goals
// @acess Private
const getGoals = async(req,res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
}

// @desc set goals
// @router POST /api/goals
// @acess Private
const setGoal = async(req ,res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    
    res.status(200).json(goal)
}

// @desc Update goals
// @router PUT /api/goals/:id
// @acess Private
const updateGoal =async (req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
}


// @desc delete goals
// @router DELETE /api/goals/:id
// @acess Private

const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            res.status(404).json({ error: 'Goal not found' });
            return;
        }

        await goal.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {getGoals , setGoal, updateGoal, deleteGoal}