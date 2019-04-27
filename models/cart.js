import mongoose from 'mongoose';
import foodItemSchema from './foodItem';
var ObjectId = mongoose.Schema.Types.ObjectId;
const cartSchema = new mongoose.Schema({
    restaurant_id: {type: ObjectId, ref: 'restaurant'},
    delivery_address_id: {type: ObjectId, ref: 'address'},
    items: [foodItemSchema]
});
export default cartSchema;