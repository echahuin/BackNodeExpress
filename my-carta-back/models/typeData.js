const mongoose = require('mongoose');
const { Schema } = mongoose;

const typeDataSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required:true},
    imageUrl: {type: String, required:false},
    public_id: {type: String}
});

module.exports = mongoose.model('TypeData', typeDataSchema);
