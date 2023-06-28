const router = require('express').Router();
const { User } = require('../../models');

//create new user
router.post('/new-user', (req, res) => {
    const newUser = new User({
        username: req.params.username,
        email: req.params.email
    });
    newUser.save();
    if (newUser) {
        res.status(200).json(newUser);
    } else {
        console.log('Something went wrong');
        res.status(500).json({ message: 'something went wrong' });
    }
})

//get all users
router.get('/all-users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'something went wrong' });
    }
});

//get one user by id with thoughts and friends data
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        }).populate("thoughts").populate("friends");
        res.status(200).json(user);
    } catch (err) {
        console.log('Something went wrong');
        res.status(500).json({ message: 'Something went wrong' });
    }
});

//update user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findOneAnUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(user);
        console.log(`Updated: ${user}`);
    } catch (err) {
        console.log("Something went wrong");
        res.status(500).json({ message: "Something went wrong" });
    }
});

//delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete(
            { _id: req.params.id }
        );
        res.status(200).json(user);
    } catch (err) {
        console.log("Something went wrong");
        res.status(500).json({ message: "Something went wrong" });
    }
});

//add friend
router.put('/:id/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: {friends: req.params.friendId} },
            { new: true }
        );
        res.status(200).json(userData);
    } catch (err) {
        console.log("Something went wrong");
        res.status(500).json({ message: "Something went wrong" });
    }
});

//delete friend
router.delete('/:id/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: {friends: req.params.friendId} },
            { new: true }
        );
        res.status(200).json(userData);
    } catch (err) {
        console.log("Something went wrong");
        res.status(500).json({ message: "Something went wrong" });
    }
});