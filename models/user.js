import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    username: {type:String, required: true, unique: true},
    first_name: String,
    last_name: String,
    salt: {type:String, required: true},
    hash: {type:String, required: true}
});

// Validations
userSchema.path('username').validate(username => username.length > 5, 'should be atleast 6 characters')

export default mongoose.model('user', userSchema)