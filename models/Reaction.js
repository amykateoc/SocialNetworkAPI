const { Schema, model } = require('mongoose');

//most of this is referencing NoSql activity 22
const reactionSchema = new Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId,
        //read more about ObjectId data type 
    },
    createdAt: {
        type: Date,
        default: created_at,
        //use getter method to format the timestamp on query???
    },
    username: {
        type: String,
        required: true,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    toJSON: { 
        getters: true,
        virtuals: true 
    },
    timestamps: true,
});

reactionSchema
    .virtual('formatDate')
    .get(function () {
        return  `${this.createdAt}`
    })
    //this is definitely wrong
    .set(function (v) {
        const month = v.split('/')[0];
        const day = v.split('/')[1];
        const year = v.split('/')[3];
        this.set({ month, day, year });
    })

const Reaction = model('Reaction', reactionSchema);    module.exports = Reaction;