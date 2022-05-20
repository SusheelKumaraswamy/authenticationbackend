const mongoose = require('mongoose');
const schema = mongoose.Schema;

const signupschema = new schema({
    MailID:{
        type:String,
        required:true,
        unique:true
    },
    UserName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
});

const signup = mongoose.model('signups',signupschema);

module.exports = signup;