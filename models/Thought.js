const { Schema, model } = require('mongoose');

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
        default: created_at,
        //use getter method to format the timestamp on query???
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        type: Array,
        child: reaction
        //Array of nested documents created with the reactionsSchema???
    },
    toJSON: { 
        getters: true,
        virtuals: true 
    },
    timestamps: true,
    id: false
});

thoughtSchema
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

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}`;
    })
    .set(function () {
        const thoughtReactions = this.reactions.length
        this.set({thoughtReactions});
    });

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;