const { Schema, model } = require('mongoose');
// const validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: true,
});

// THIS IS OPTION 1 FOR THE VIRTUALS, TAKEN FROM ACTIVITY 22
userSchema
    .virtual('thoughtCount')
    .get(function () {
        return `${this.thoughts.length}`;
    })
    // .set(function () {
    //     const userThoughts = this.thoughts.length
    //     this.set({userThoughts});
    // });

userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`;
    })
    // .set(function () {
    //     const userFriends = this.freinds.length
    //     this.set({userFriends})
    // });


const User = model('User', userSchema);
module.exports = User;