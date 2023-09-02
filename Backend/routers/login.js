


module.exports=function({app,upload,mongoose}){
   
   const db=mongoose.connection
   const collection = db.collection('users');


   app.post("/login",upload.single('image'),async(req,res)=>{
       const{Username,Password} =req.body
       console.log(Username,Password)
       const find=await collection.findOne({username:Username,password:Password})
    
        if(find){
            return res.status(200).json({ success: "login sucessfull", data: find });
        }
        

        
        return res.status(404).json({error:' Sorry, your password or username was incorrect. Please double-check your password.'})

         
       
   });

   



   
   

};