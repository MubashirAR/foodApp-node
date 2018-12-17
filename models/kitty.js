

const mongoose = require('mongoose');
const Cat = mongoose.model('Cat', { name: String });
export default Cat;