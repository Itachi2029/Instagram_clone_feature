const mongoose=require('mongoose')
const follow={
 
    Username:{
        type:String,
        required:true,
    },
    following:{
        type:String,
        required:true
    }


};
const following =new mongoose.Schema(follow);
const Following=mongoose.model('Following',following)
module.exports=Following;