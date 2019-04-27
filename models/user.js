import mongoose from 'mongoose';
var ObjectId = mongoose.Schema.Types.ObjectId;
import cartSchema from './cart';
const userSchema = mongoose.Schema({
    username: {type:String, required: true, unique: true},
    first_name: {type:String, required: true},
    last_name: {type:String, required: true},
    mobile: {type: Number, required: true, unique: true},
    email: {type:String, required: true, unique: true},
    salt: {type:String, required: true},
    hash: {type:String, required: true},
    addresses: [{type: ObjectId, ref: 'address'}],
    cart: cartSchema
});

// Validations
userSchema.path('username').validate(username => username.length > 5, 'should be atleast 6 characters')
userSchema.path('email').validate(email => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email) , 'should be a valid email')

export default mongoose.model('user', userSchema);