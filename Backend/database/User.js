const mongoose=require('mongoose')
const User=new mongoose.Schema({
    
    
    username: {
    type: String,
    required: true,
    unique: true

},
password: {
    type: String,
    required: true,

},
contact: {
    type: String,
    required: true,

},
image: {
    type: String

}
});
const Users=mongoose.model('Users',User)
module.exports=Users;
