// Node Modules
import mongoose from 'mongoose'
import restaurantSchema from '../../models/restaurant';
import addressSchema from '../../models/address';
import genhash from 'hash.js';
import jwt from 'jsonwebtoken';
import gensalt from '@kdf/salt';

// App Modules
var router= require('express').Router();
const ObjectID = mongoose.Types.ObjectId;

const get = async (req,res) => {
    try {
        const query = {...req.query}
        const restaurantDetails = await restaurantSchema.findById(query.id);
        res.sendResponse(true, restaurantDetails)
    } catch (error) {
        res.sendResponse(false, error.message)
        
    }
}
const list = async (_,res) => {
    try {
        // const body = {...req.body}
        const restaurantList =await  restaurantSchema.find();
        console.log(restaurantList);
        
        res.sendResponse(true, restaurantList)
    } catch (error) {
        res.sendResponse(false, error.message);
        
    }
}

const register = async (req,res) => {
    var restaurantDetails = {...req.body}
    const salt = (await gensalt(16)).toString('hex');
    const hash = genhash.sha256().update(restaurantDetails.password).update(salt).digest('hex')
    restaurantDetails = {...req.body, salt, hash}
    try {
        const addressDetails = restaurantDetails.address;
        const address = new addressSchema(addressDetails);
        const data = await address.save();
        restaurantDetails.address = address._id;
    } catch (error) {
        
        console.log(error);
        return res.sendResponse(false,error.message)
    }
    const restaurant = new restaurantSchema(restaurantDetails);
    try {
        const data = await restaurant.save();
        var token = jwt.sign({id:data._id}, data.salt, { expiresIn: '1h' })
        res.sendResponse(true, data);
    } catch (error) {
        console.log(error);
        res.sendResponse(false, error.message);
    }
}

const login = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        
        // Fire the query
        var response = await restaurantSchema.findOne({$or: [{phone: username}, {email: username}]});
        
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
            // res.send({status: 'success', data: response, token});
        } else {
            console.log(response);
            // User not found or mongo error
            res.sendResponse(false,'user not found')
            // res.send({status: 'failure', reason: response});
        }

    } catch (error) {
        // Mongo Error 💔
        res.sendResponse(false,error.message)
        // res.send({status: 'failure', reason: error.message});
    }
}

// router.get('/', (_,res) => res.send('Hello World'));
router.get('/', get);
router.get('/list', list);
router.post('/register', register);
router.post('/login', login);
module.exports = router;