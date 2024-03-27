const Goal = require('../models/goalModel')
const User = require('../models/userModel')




// @desc Get goals
// @router GET /api/goals
// @acess Private
const getGoals = async(req,res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
}

// @desc set goals
// @router POST /api/goals
// @acess Private
const setGoal = async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ error: 'Please add a text field' });
        }

        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id,
        });

        res.status(201).json(goal); // Use 201 for successful resource creation
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// @desc Update goals
// @router PUT /api/goals/:id
// @acess Private
const updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

      

        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'User not authorized' });
        }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// @desc delete goals
// @router DELETE /api/goals/:id
// @acess Private

const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

       

        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'User not authorized' });
        }

        await goal.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {getGoals , setGoal, updateGoal, deleteGoal}