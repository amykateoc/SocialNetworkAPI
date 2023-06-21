const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        console.log("receiving request to save user")
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        console.log(dbUserData)

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = dbUserData.id
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});