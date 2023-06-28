const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

//most of this is referencing NoSql activity 22
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleString()
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
    },
    {
    toJSON: { 
        getters: true,
        virtuals: true 
    },
    timestamps: true,
    id: false
});


thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}`;
    });

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;