const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    product: String,
    counter: {type: Number, default: 1}
})

mongoose.model('order', orderSchema)