const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    plannedTime: {
        type: Date, required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
});

module.exports = model('Eventapplication', schema);