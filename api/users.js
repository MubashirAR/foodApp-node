// Node Modules
import mongoose from 'mongoose'

// App Modules
import app from '../index'
import genhash from 'hash.js'
import jwt from 'jsonwebtoken'
import gensalt from '@kdf/salt'
import userSchema from '../models/user'

const ObjectID = mongoose.Types.ObjectId;

app.post('/registerUser', async function(req, res){
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
        if(response._id)
            res.send({status: 'success', data: response});
        else // Failed to save ❌
            res.send({status: 'failure', reason: response})
    } catch (error) {
        // Error 💔
        res.send({status: 'failure', reason: error.message});
    }
});
app.get('/users', async function(req, res){
    var response = await userSchema.find();
    res.send(response);
});
app.post('/login', async function(req, res){
    try {
        const username = req.body.username
        const password = req.body.password

        // Fire the query
        var response = await userSchema.findOne({username: req.body.username});

        // If user found
        if (response != null && response.salt) {
            // Verify inputted password is correct
            const hash = genhash.sha256().update(password).update(response.salt).digest('hex')
            // Incorrect password ❌
            if(hash!=response.hash)
                return res.json({status: 'failure', reason: 'incorrect password'})
            // Correct password, generate token ✅
            var token = jwt.sign({id:response._id}, response.salt, { expiresIn: '1h' })
            res.send({status: 'success', data: response, token});
        } else {
            // User not found or mongo error
            res.send({status: 'failure', reason: response});
        }

    } catch (error) {
        // Mongo Error 💔
        res.send({status: 'failure', reason: error.message});
    }
});