import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    password: String
});

export default mongoose.model('user', userSchema)