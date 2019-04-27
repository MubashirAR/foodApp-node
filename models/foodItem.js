import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;
const foodItemSchema = new mongoose.Schema({
    name: {type:String, required: true},
    price: {type:Number, required: true},
    description: {type:String, required: true},
    category: {type:String, required: true},
    ingredients: [{type:String}],
    quantity: {type: Number, default: 0}
});
export default foodItemSchema;