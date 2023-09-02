const mongoose=require('mongoose')
const Comment={
    Postid:{
        type:Number,
        

    },    
    username:{
        type:String,
        reuired:true,
    }
    
    ,
    comment:{
        type:String,
        reuired:true,
    }


};
const comments =new mongoose.Schema(Comment);
const comment=mongoose.model('comments',comments)
module.exports=comment;