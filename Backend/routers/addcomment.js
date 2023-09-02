module.exports=function({app,mongoose,upload}){

    const comments=require('../database/Comment')
    
    app.post('/comment',upload.single('image'),(req,res)=>{

        const{Postid,username,comment}=req.body
        console.log(req.body)
        comments.create({Postid:Postid,username:username,comment:comment})
        return res.status(200).json({sucess:"have been suces"})



    })


    app.get('/viewcomment',async(req,res)=>{
        
        const id=req.query.postid
        console.log(id)
        const result= await comments.find({Postid:id})
        res.send(result)
})
  
  



}