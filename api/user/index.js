// Node Modules
import mongoose from 'mongoose';
const router = require('express').Router();
import genhash from 'hash.js';
import jwt from 'jsonwebtoken';
import gensalt from '@kdf/salt';

// App Modules
import userSchema from '../../models/user';

const ObjectID = mongoose.Types.ObjectId;


// Methods
const register = async (req, res) => {
    var user = {...req.body};
    // Generate salt and hash
    const salt = (await gensalt(16)).toString('hex');
    const hash = genhash.sha256().update(user.password).update(salt).digest('hex')
    user = {...req.body, salt, hash}
    // Save user and send response
    try {
        var userToSave = new userSchema(user);
        var response = await userToSave.save();
        // Successfully saved ✅
        if(response._id) {
            var token = jwt.sign({id:response._id}, response.salt, { expiresIn: '1h' })
            res.sendResponse(true,response,token)
        }
        else // Failed to save ❌
        res.sendResponse(false, response)
    } catch (error) {
        // Error 💔
        res.sendResponse(false, error.message)
    }
}
const users = async (req, res) => {
    try {
        var response = await userSchema.find();
        res.sendResponse(true, response);
    } catch (error) {
        res.sendResponse(false, error.message);
    }
}
const user = async (req, res) => {
    try {
        var response = await userSchema.findById(req.query.user_id);
        if(response._id)
            return res.sendResponse(true, response);
        throw({message: 'user not found'});
    } catch (error) {
        res.sendResponse(false, error.message);
    }
}
const login = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        
        // Fire the query
        var response = await userSchema.findOne({$or: [{username: username}, {email: username}]});
        
        // If user found
        if (response != null && response.salt) {
            // Verify inputted password is correct
            const hash = genhash.sha256().update(password).update(response.salt).digest('hex')
            // Incorrect password ❌
            if(hash!=response.hash)
            return res.json({status: 'failure', reason: 'incorrect password'})
            // Correct password, generate token ✅
            var token = jwt.sign({id:response._id}, response.salt, { expiresIn: '1h' })
            res.sendResponse(true,response, token)
        } else {
            console.log(response);
            // User not found or mongo error
            res.sendResponse(false,'user not found');
        }

    } catch (error) {
        // Mongo Error 💔
        res.sendResponse(false,error.message)
    }
}

const cart = async (req, res) => {
    try {
        const { user_id, cart } = req.body;
        if(!user_id || !cart)
            return res.sendResponse(false,'user_id or cart missing');
        const response = await userSchema
            .findByIdAndUpdate({_id: user_id}, {cart: cart})
            .exec();
        
        res.sendResponse(true,response);
    } catch (error) {        
        res.sendResponse(false,error.message);
    }
}

// Apis
router.post('/register', register);
router.post('/cart', cart);
router.get('/users', users);
router.get('/', user);
router.post('/login', login);
module.exports = router;