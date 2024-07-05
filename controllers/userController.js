const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
   return jwt.sign({_id:_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        const firstname = user.firstname
        //create a token
        const token = createToken(user._id);
        res.status(200).json({ firstname, email, token});

    }catch(error){
        res.status(400).json({error: error.message});
    }

}

//signup user
const signupUser = async (req, res) => {
    const {firstname, lastname, email, password} = req.body

    try{
        const user = await User.signup(firstname, lastname, email, password);

        //create a token
        const token = createToken(user._id);

        res.status(200).json({firstname , email, token});
    } catch (error){
        res.status(400).json({error: error.message})
    }
    
}

module.exports = {
    loginUser,
    signupUser
}