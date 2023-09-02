

module.exports=function({app,mongoose,upload}){


    app.post('/post/reaction',(req,res)=>{

       
       const post=req.query.Postid 
       console.log(post)
       const Post=require('../database/Post')
       Post.findOneAndUpdate(
        { Postid:post}, 
        { $set: { reaction: 3 } }, 
        { new: true }
      ).then(updatedUser => {
        if (updatedUser) {
          console.log('Updated user:', updatedUser);
        } else {
          console.log('User not found.');
        }
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
    } )




   
  

    
    app.post('/post',upload.single('image'),async(req,res)=>{
           if(req.body.login=='false'){
            res.status(200).json({sucess:'User create'})
           }
           console.log(req.body)
           console.log(req.file)
           const{username,paragraph}=req.body        
           const Post=require('../database/Post');

           const newPost=new Post({
            username:username,
            content:paragraph,
            image:req.file.filename,
            createdAt:Date.now()
           });
          
          await newPost.save().then((save)=>{
            res.status(200).json({sucess:'User create'})
          })
          .catch((error)=>{
            res.send('Some error ocuur')
          })


             

    });

    







    
    app.post('/user/like',async(req,res)=>{
        console.log(req.body)
        const{Posid,username}=req.body

         const Like=require('../database/Like');
         
         const newlike=new Like({
          Postid:Posid,
          Username:username
         });
        await newlike.save();

         
        });


    app.get('/postdetail',async(req,res)=>{
          
         const username=req.query.username
         console.log('ssa',username)
         const db = mongoose.connection
         const collections = db.collection('posts');
         const reso=await collections.find({username:username}).toArray()
         console.log(reso)

         res.send(reso)

    })


  
    
    app.get('/post',async(req,res)=>{
         
      const db = mongoose.connection
      const collections = db.collection('posts');
      const result= await collections.aggregate([
        
           {
          $lookup:{
            from :"users",
            localField:"username",
            foreignField:"username",
            as:"userdetails"
          }
        },
        {
          $unwind: "$userdetails"
        },
        
          {
            $project: {

              userdetails: {
              
              _id: 0,
              username: 0,
              password: 0,
              contact: 0,
              __v: 0,
            }
            
            }
          }
        

      
      ]).toArray();
     
    
      res.send(result)
 })





 app.get('/countcomment',async(req,res)=>{
  const id=req.query.postid
  const Post=require('../database/Post');
  const result=await Post.find({Postid:id}).select('reaction')
  if(result)
     res.send(result[0].reaction.toString())
})



app.post('/like', async(req, res) => {
  const postId =req.query.postid;
  
  const newContent = req.query.reaction;
  const Post=require('../database/Post');

  try {

    const updatedPost = await Post.findOneAndUpdate(
      { Postid: postId }, // Query condition
      { $set: { reaction: newContent } }, // Update operation
      { new: true }
    );
   

    if (updatedPost) {
      res.json({ success: true, message: 'Post updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
  

});
}