
import './Post.css';
import { useNavigate } from 'react-router-dom';
import { useState,useRef, useContext, useEffect } from 'react';
import  Context from '../../Context';

import { AiOutlineHeart } from 'react-icons/ai';

export default function Post(props) {

   const {user}=useContext(Context)
   
   
   const[commen,setcommen]=useState([])
   const[r,setr]=useState(false)
   const commentref =useRef(null)
   const Navigate = useNavigate()
   const [like, setLike] = useState(null);
   const { username, content, image,id } = props
   const [showComments, setShowComments] = useState(false); 


   
   useEffect(() => {
      fetchLikeCount();
    });


    const fetchLikeCount = async () => {
      try {
        const response = await fetch(`http://localhost:4000/countcomment?postid=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLike(data);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    const increase = async () => {
      try {
       
        setLike(like + 1);
  
      
        const response = await fetch(`http://localhost:4000/like?postid=${id}&reaction=${like + 1}`, {
          method: 'POST',
        });
        
        if (!response.ok) {
         
          setLike(like);
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
  




























   
   
   const input=({comment,user,id})=>{
      const form=new FormData()
      form.append("Postid",id)
      form.append("comment",comment)
      form.append("username",user)
      return form
   }


   useEffect(() => {
      const fetchComments = async () => {
         const url = `http://localhost:4000/viewcomment?postid=${id}`;
         try {
            const response = await fetch(url);
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setcommen(data);
            
         } catch (error) {
            console.error('An error occurred while fetching comments:', error);
         }
      };

      fetchComments();
   }, [id,r]);


    



 


   const comm=async()=>{
      const comment=commentref.current.value
      if(comment.trim().length===0)
         return false
      const form=input({comment,user,id})
      
      commentref.current.value=''
      
      const url="http://localhost:4000/comment"
      await fetch(url,{
         method:
             "Post",
         body:form
         
      })
      .then(response=>{
         
         return response.json()
      })
      .then(data=>{
         if(data.sucess){
               setr(!r)
               console.log(data)
         }
      })
      .catch((error)=>{
         alert("error coming")
      })
   
   
   }







   

   const toggleComments = () => {
      setShowComments(!showComments);
    };

   const link = () => {
      Navigate(`/Profile/${username}`)
   }

   return (<>

      <div className='card'>
         <div className='user_de'>
            <img onClick={link} src={`http://localhost:4000/user?username=${username}`} alt="kdsjad"></img>
            <p>{username}</p>
         </div>
         <img className='img' src={`http://localhost:4000/image?username=${image}`} alt="kdshf"></img>
         <div className='icon'>
            
            <AiOutlineHeart onClick={increase}  className="like-icon" style={{ fontSize: '24px', color: 'red', cursor: 'pointer' }}/>
            {like}
         </div>
        
         <p className='content'>{content}</p>
          
         <p href='#' className='comment' onClick={toggleComments}>
            {showComments ? 'Hide comments' : 'View comments'} 
         </p>
         
         {showComments && (
            <div className='comments_view'>
                   
                  {
                     commen.map((key,index)=>(
                     
                     <div key={index} className='comments'>
                           <img  src={`http://localhost:4000/user?username=${key.username}`} alt='kdshf'></img>
                           <p>{key.comment}</p>
                     </div>
                     ))
                  }
            </div>
            )
         }
         <div className='comment_section'>
            <input className="commenting" placeholder='Add Comment' ref={commentref}></input>
            <button className="posting_button" id="posting_button" onClick={comm}>Post</button>
         </div>




      </div>
   </>)

}