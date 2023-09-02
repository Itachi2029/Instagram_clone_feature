import { useRef } from 'react';
import './Signup.css';

export default function Signup(){
  
   const emailormobileref=useRef(null)
   const usernameref=useRef(null)
   const nameref=useRef(null)
   const passwordref=useRef(null)
   

   const getInput=async()=>{

      const username=usernameref.current.value 
      const name=nameref.current.value
      const password=passwordref.current.value 
      const emailormobile=emailormobileref.current.value
      usernameref.current.value = '';
      nameref.current.value = '';
      passwordref.current.value = '';
      emailormobileref.current.value='';
   
      
      return{username,name,password,emailormobile}

   }

   const verfication=({username,name,password})=>{

      if(username.trim().length===0){
         alert("Enter Username")
         return false
      }

      else if(password.trim().length===0)
      {
         alert("Enter Password")
         return false
      }
      else if(name.trim().length===0)
      {
         alert("Enter Name ")
         return false
      }
      return true
   }


   const createform=async({username,name,password,emailormobile})=>{
      
      const formd =new FormData();
      formd.append("username",username)
      
      formd.append("name",name)
      
      formd.append('pass',password)
      formd.append('info',emailormobile)
      
      return formd;
   }

   const createuser=async({username,name,password,emailormobile})=>{
       
     
      const formdetails=await createform({username,name,password,emailormobile})
      
      const url="http://localhost:4000/Signup"
      return await fetch(url,{
         method:"Post",
         body:formdetails
      })


   }

   const onsubmit=async()=>{
      
      const{username,name,password,emailormobile}=await getInput()
   
      if(verfication({username,name,password})){

         await createuser({username,name,password,emailormobile})
         .then(response => {
            return response.json()
         })
         .then(data => {
            
            if(data.sucess)
                alert(data.sucess)
            else if(data.error)
                alert(data.error) 
        
          
         })
         .catch(error=>{
            alert(error)
         })
        
         
         
         
         
         
         


      }

            

   }
   




   
   





   return(

     <div className='Signup'>
        

         <div className="l">
            <p className='title'>Instagram</p>
            <p className='first'>Sign up to see photo and videos<br></br> from your friends.</p>
            
            <button className='login_button'>Login in with facebook</button>
            
            <div className="line-container">
                <div className="line"></div>
                <div className="text">OR</div>
                <div className="line"></div> 
            </div>
            
            <div className='inputs'>
               <input className="input"  placeholder='Mobile Number or Email' ref={emailormobileref}></input>
               <input className="input"  placeholder='Full Name' ref={nameref}></input>
               <input className="input"  placeholder='Username' ref={usernameref}></input>
               <input className="input"  placeholder='Password' ref={passwordref}></input>
            </div>
            
            
            <p className='para'>
            People who use our service may have uploaded your contact information to Instagram. Learn More
            </p>
            <p className='para'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
            
            
            <button className='sign' onClick={onsubmit}>Sign up</button>


         </div>
         <div className='l2'>
            
            <p> Have an account? <a href="/">Log in</a></p>
         
         </div>

     </div>
   )

}