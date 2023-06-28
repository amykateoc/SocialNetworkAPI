const router = require('express').Router();
const { Thought } = require('../../models');

//create new thought
router.post('/new-thought', async (req, res) => {
   try { 
    const newThought = await new Thought(
        { thoughtText: req.body.thoughtText },
        { $addToSet: {username: req.body.username} }, //req.body????
        { new: true }
        // am I adding the username to the thought or is it the other way around?
        );
        res.status(200).json(newThought)
} catch {
    console.log("Something went wrong");
    res.status(500).json({ message: "Something went wrong" });
}
}); 

//add reaction to thought
router.put('/:id/:reactionId', async (req, res) => {
    try {
        const reactionData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: {reaction: req.params.reactionId} },
            { new: true }
        );
        res.status(200).json(reactionData);
    } catch (err) {
        console.log("Something went wrong");
        res.status(500).json({ message: "Something went wrong" });
    }
});

//delete reaction
router.delete('/:id/:reactionId', async (req, res) => {
    try {
        const reactionData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: {reaction: req.params.reactionId} },
            { new: true }
        );
        res.status(200).json(reactionData);
    } catch (err) {
        console.log("Something went wrong");
        res.status(500).json({ message: "Something went wrong" });
    }
});

//get all thoughts
router.get('/all-thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find({}).populate("username").populate("reactions");
        res.status(200).json(thoughts);
    } catch (err) {
        console.log("Something went wrong");
        res.status(500).json({ message: "Something went wrong" });
    }
});

//delete thought
router.delete('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete(
            { _id: req.params.id },
            //delete associated reactions????
        );
        res.status(200).json(thought);
    } catch (err) {
        console.log("Something went wrong");
        res.status(500).json({ message: "Something went wrong" });
    }
});

//update a thought
router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAnUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(thought);
        console.log(`Updated: ${thought}`);
    } catch (err) {
        console.log("Something went wrong");
        res.status(500).json({ message: "Something went wrong" });
    }
});