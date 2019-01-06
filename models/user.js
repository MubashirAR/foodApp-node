import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    salt: String,
    hash: String
});

export default mongoose.model('user', userSchema)