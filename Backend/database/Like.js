const mongoose=require('mongoose')
const like={
    Postid:{
        type:Number,
        

    },
    Username:{
        type:String,
        reuired:true,
    }


};
const likes =new mongoose.Schema(like);
const Like=mongoose.model('Likes',likes)
module.exports=Like;