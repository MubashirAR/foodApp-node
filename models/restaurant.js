import mongoose from 'mongoose';
import addressSchema from './address'

var ObjectId = mongoose.Schema.Types.ObjectId;
import foodItemSchema from './foodItem';
const restaurantSchema = mongoose.Schema({
    name: {type:String, required: true},
    salt: {type:String, required: true},
    hash: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    bio: {type:String},
    address: {type: ObjectId, ref: 'address', required:true},
    menu: [foodItemSchema],
    phone: {type:Number, required: true, unique: true},
    profile_image: {type:String},
    images: [{type:{type:String}}]
})


restaurantSchema.path('email').validate(email => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email) , 'should be a valid email')
// mongoose.model('Food_Item', foodItemSchema)
export default mongoose.model('Restaurant', restaurantSchema)