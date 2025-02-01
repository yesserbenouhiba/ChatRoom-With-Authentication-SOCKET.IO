const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    status : {
        type : String,
        value : ["online","offline"],
        default : "offline"
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;