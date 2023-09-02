module.exports=function({app,mongoose}){

    const Like=require('../database/Like')
    app.post('/reaction',async(req,res)=>{
        const { username, Postid } = req.query;
      
        try {
          const likeRecord = await Like.create({ Postid:Postid, Username:username });
          console.log('Inserted like record:', likeRecord);
          res.status(200).send('Record successfully inserted');
        } catch (error) {
          console.error('Error inserting like record:', error);
          res.status(500).send('Unsuccessful');
        }
        
});

app.get('/reaction',async(req,res)=>{

    const result=await Like.find({})
    res.send(result)

});

   







}