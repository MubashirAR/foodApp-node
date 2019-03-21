import mongoose from 'mongoose';

var ObjectId = mongoose.Types.ObjectId;

const addressSchema = mongoose.Schema({
    address_line_1: {type:String, required: true},
    address_line_2: {type:String, required: true},
    address_city: {type:String, required: true},
    address_state: {type:String, required: true},
    address_zip: {type:String, required: true},
    address_country_id: {type:String, required: true},
})
export default mongoose.model('Address', addressSchema)