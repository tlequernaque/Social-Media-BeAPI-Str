const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: dayjs(),
            get: timestamp => dayjs().format(DD/MM/YYYY),
        },
        username: {
           type: String,
           required: true, 
        },
        reactions: [reactionSchema],
    },
    // {
    //     toJSON: {
    //         virtuals: true,
    //     },
    //     id: false
    // },
);

userSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;