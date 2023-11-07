const router = require('express').Router();
const {User,validateUser} = require('../models/user');
const {hashPassword} = require('../utils/hash')
const auth = require('../middleware/auth')
//post new user
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        console.error('Validation error:', error.details[0].message);
        return res.status(400).json(error.details[0].message);
    }

    const isUnique = (await User.count({ username: req.body.username })) === 0;
    if (!isUnique) {
        console.error('Username not unique:', req.body.username);
        return res.status(400).json({ error: 'The username is not unique' });
    }

    try {
        const user = new User(req.body);
        user.password = await hashPassword(user.password);
        await user.save();
        console.log('User created successfully:', user);
        res.sendStatus(201);
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json(err);
    }
});


//Get current user details
router.get('/',auth,async (req,res)=>{
    res.send({currentUser:req.user});
})

module.exports = router