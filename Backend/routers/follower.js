module.exports=function({app,mongoose}){

    const follow=require('../database/Follower')

    app.post('/follower/add',(req,res)=>{


        const{id,following}=req.query
        
        follow.create({Username:id,following:following})


       res.send("Sucessfully typing")


    });

    app.get('/follower',async(req,res)=>{
      
      const{id}=req.query
      console.log(req.query) 
      const follower=await follow.aggregate([
        {
            $match:
             {Username:id}
        }])



      console.log(follower)
      res.send(follower)

        


      

    })






}