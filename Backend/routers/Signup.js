

module.exports = function ({ app, mongoose, upload }) {



   const Usertable = require("../database/User")

    app.post("/Signup", upload.single('image'), async (req, res) => {
        
        
        
        const { username, pass, info } = req.body

      
        

        try{
             
            const find = await Usertable.findOne({ username: username })

            if (find) {
              return res.status(200).json({ error: 'User already exist' })
            }
            
            const newUser = new Usertable({
              username: username,
              password: pass,
              contact: info,
              image:"uuuu.png"            
            });


        await newUser.save()
        return res.status(200).json({ success: 'User Create' })
        }
        catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }) ;





app.get('/details', async (req, res) => {
      const user = req.query.username;
      console.log(user);
    
      try {
        const userDetails = await Usertable.findOne({ username: user })  // Changed 'find' to 'findOne'
        
        if (userDetails) {
          return res.status(200).json({ success: true, data: userDetails });
        } else {
          return res.status(404).json({ error: "User not found" });  // Changed status to 404
        }
      } catch (err) {
        return res.status(500).json({ error: err.message });  // Changed status to 500 and returning error message
      }
    });

    app.get('/all', async (req, res) => {
      try {
       
        const userdetails = await Usertable.find({}).select('username image') // Changed 'find' to 'findOne'
        
        if (userdetails.length>0) {
          console.log(userdetails)
          return res.send(userdetails );
        } else {
          return res.status(404).json({ error: "User not found" });  // Changed status to 404
        }
      } catch (err) {
        return res.status(500).json({ error: err.message });  // Changed status to 500 and returning error message
      }
    });
    


    app.post('/changeprofile',upload.single('image'),async(req,res)=>{
      const username=req.query.username

      if(!req.file)
        return res.status(400).send('No image uploaded');
  
      const userdetail = await Usertable.findOneAndUpdate(
        { username }, 
        { $set: { image: req.file.filename } }, 
        { new: true } 
      );

      if(!userdetail)
         return     res.status(401).json({success:false})
      return   res.status(200).json({success:true});
    
    
    })






  } 
