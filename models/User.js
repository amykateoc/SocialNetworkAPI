const { Schema, model } = require('mongoose');
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//most of this is referencing NoSql activity 22
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: {
        type: Array,
        ref: 'Thought',
        localField: '_id',
        foreignField: 'user'
    },
    friends: {
        type: Array,
        ref: 'Friends',
        localField: '_id',
        foreignField: 'user'
    },
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// THIS IS OPTION 1 FOR THE VIRTUALS, TAKEN FROM ACTIVITY 22
// userSchema
//     .virtual('thoughts')
//     .get(function () {
//         return `${this.thoughts.length}`;
//     })
//     .set(function () {
//         const userThoughts = this.thoughts.length
//         this.set({userThoughts});
//     });

// userSchema
//     .virtual('friends')
//     .get(function () {
//         return `${this.friends.length}`;
//     })
//     .set(function () {
//         const userFriends = this.freinds.length
//         this.set({userFriends})
//     });


// THIS IS OPTION 2 FOR THE VIRTUALS, TAKEN FROM MONGOOSE DOCUMENTATION
    // userSchema.virtual('thoughts', {
    //     ref: 'Thought',
    //     localField: '_id',
    //     foreignField: 'user'
    // });
    // userSchema.virtual('friendCount', {
    //     ref: 'Friends',
    //     localField: '_id',
    //     foreignField: 'user'
    // });

//
// thoughts: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Thought'
// },
// friends: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
// }

const User = model('User', userSchema);
module.exports = User;