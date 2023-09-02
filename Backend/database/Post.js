
const mongoose = require('mongoose');
const Counter = require('../database/Auto');


const postSchema = new mongoose.Schema({
    Postid: 
    { type: Number, 
     unique: true }, 
    
    content:{
        type:String,   
        require:true
    },
    image:{
        type:String

    },
    username:{
        type:String

    },
    createdAt: {
        type:String
             
    },
    reaction:{
        type:Number,
        default:0
    }

});
postSchema.pre('save', async function (next) {
    const doc = this;

    if (doc.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                'Postid', 
                { $inc: { sequenceValue: 1 } },
                { new: true, upsert: true }
            );

            doc.Postid = counter.sequenceValue;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
