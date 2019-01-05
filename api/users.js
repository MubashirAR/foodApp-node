import app from '../index';
import user from '../models/user'
app.post('/registerUser', async function(req, res){
    var userToSave = new user(req.body);
    var response = await userToSave.save();
    res.send(response);
});
app.get('/users', async function(req, res){
    var response = await user.find();
    res.send(response);
});