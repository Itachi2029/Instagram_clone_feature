import './Post.css'
import Postcard from '../Post/Postcard'
import { useEffect,useContext} from 'react';
import { useState } from 'react';
import Context from '../../Context';
export default function Post() {
 
      const{isPost}=useContext(Context)
    
      const [posts,setpost]=useState([])

      useEffect(() => {
            const fetchData = async () => {
              try {
                const url = "http://localhost:4000/post";
                const response = await fetch(url, {
                  method: "GET"
                });
                const data = await response.json();
                await setpost(data);
              } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error appropriately
              }
            };
          
            fetchData();
          }, [setpost,isPost]);
          
      
     


      return (<>
      
           
            <div className='Post'>
               
               <div className='contest'>
                    {  posts.map((post)=>(
                        
                             <Postcard key={post.Postid} id={post.Postid} username={post.username} image={post.image}   content={post.content} />
                        

                    ))

                    }
                 </div>

            </div>

      </>)

}