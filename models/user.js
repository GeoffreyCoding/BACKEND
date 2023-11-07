const mongoose = require('mongoose');
const Joi = require('joi');
const { hashPassword } = require('../utils/hash');

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        Email: { type: String, required: true },
        FirstName: { type: String, required: true },
        Surname: { type: String, required: true }
    }
);

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(1).max(35).required(),
        password: Joi.string().min(10).max(50).required(),
        Email: Joi.string().min(5).max(50).required(),
        FirstName: Joi.string().min(1).max(35).required(),
        Surname: Joi.string().min(1).max(35).required()
    });
    return schema.validate(user);
}

module.exports = { User, validateUser };
