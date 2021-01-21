const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    login:{
        type:String,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = model('User', UserSchema);