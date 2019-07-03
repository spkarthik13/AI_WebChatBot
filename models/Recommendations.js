const mongoose = require('mongoose');
const {Schema} = mongoose;

const recSchema = new Schema({
    product: String,
    link: String
});

mongoose.model('recommendation', recSchema);