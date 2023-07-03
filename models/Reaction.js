const { Schema, Types } = require('mongoose');

//most of this is referencing NoSql activity 22
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        //read more about ObjectId data type 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: time => new Date(time).toLocaleString()
    },
    username: {
        type: String,
        required: true,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    }
},
{
    toJSON: { 
        getters: true,
        virtuals: true 
    },
    timestamps: true,
});

// reactionSchema
//     .virtual('formatDate')
//     .get(function () {
//         return  `${this.createdAt}`
//     })


// const Reaction = model('Reaction', reactionSchema);
module.exports = reactionSchema;