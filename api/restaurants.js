// Node Modules
import mongoose from 'mongoose'
import restaurantSchema from '../models/restaurant';
import addressSchema from '../models/address';

// App Modules
import app from '../index'
const ObjectID = mongoose.Types.ObjectId;


const registerRestaurant = async (req,res) => {
    const restaurantDetails = {...req.body}
    try {
        const addressDetails = restaurantDetails.address;
        const address = new addressSchema(addressDetails);
        const data = await address.save();
        restaurantDetails.address = address._id;
    } catch (error) {
        return res.sendResponse(false,error.message)
    }
    const restaurant = new restaurantSchema(restaurantDetails);
    try {
        const data = await restaurant.save();
        res.sendResponse(true, data);
    } catch (error) {
        res.sendResponse(false, error.message);
    }
}
const getRestaurant = (req,res) => {
    try {
        const body = {...req.body}
        const restaurantDetails = restaurantSchema.findById(body.id);
        res.sendResponse()
    } catch (error) {
        
    }
}
app.get('/testRestaurant', (_,res) => res.send('Hello World'));
app.get('/getRestaurant', (_,res) => getRestaurant);
app.post('/registerRestaurant', registerRestaurant);