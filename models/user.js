const mongoose = require('mongoose');
const Joi = require('joi');
const userschema = mongoose.Schema(
    {
        username:{type:String,required:true},
        password:{type:String,require:true},
        Email:{type:String,require:true},
        FirstName:{type:String,require:true},
        Surname:{type:String,require:true}
    }
)

const User = mongoose.model('User',userschema);

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(1).max(35).required(),
        password:Joi.string().min(10).max(50).required(),
        Email:Joi.string().min(5).max(50).required(),
        FirstName:Joi.string().min(1).max(35).required(),
        Surname:Joi.string().min(1).max(35).required()
    });
    return schema.validate(user);
}

module.exports = {User,validateUser};