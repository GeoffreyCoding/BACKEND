const mongoose = require('mongoose')
const Joi = require('joi')

const BulletinBoardSchema = mongoose.Schema(
    {
        id:{type:String,require:true},
        issueName: {type:String,require:true},
        description: {type:String,require:true},
        department: {type:String,require:true}
    }
)

const BulletinBoard  = mongoose.model('BulletinBoard',BulletinBoardSchema)

function validateBulletinBoard(BulletinBoard){
    const schema = Joi.object({
        id: Joi.string().min(1).max(50).required(),
        issueName: Joi.string().min(1).max(35).required(),
        description: Joi.string().min(1).max(255).required(),
        department: Joi.string().min(1).max(35).required()
    })
    return schema.validate(BulletinBoard);
}

module.exports = {BulletinBoard,validateBulletinBoard};