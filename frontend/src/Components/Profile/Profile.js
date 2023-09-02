import { useEffect } from "react";
import Navabar from "../common/Navbar"
import './Profile.css';
import { useNavigate} from "react-router-dom";
import {useParams } from "react-router-dom";
import Card from "./Card";



import { useState } from "react";

export default function Profile() {

  const { user } = useParams();
  const [userdetail, setuserdetail] = useState(null);
  const[details,setdetails]=useState(null)
  const[totalpost,settotal ]=useState(0)
  const nava=useNavigate()

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:4000/postdetail?username=${user}`;
        const response = await fetch(url, {
          method: "GET"
        });
        const data = await response.json();
        await setdetails(data);
        settotal(data.length)
         
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error appropriately
      }
    };
  
    fetchData();
  }, [user]);
  



  
  


  useEffect(() => {

    const fuss = async () => {
      const url = `http://localhost:4000/details?username=${user}`

      try {
        const response = await fetch(url, {
          method: "get"
        });
        const data = await response.json();
        if (data.success) {
          await setuserdetail(data.data);

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }


    }
    fuss();
  }, [user]);



  if (!userdetail || !details) {
    return
  }
  
  const edit=()=>{
    nava(`/Edit/${userdetail.image}/${userdetail.username}`)

    
  }
  


  return (

    <>
      <Navabar />
      <div className="profile">

     
      


        <img className="profile_picture" src={`http://localhost:4000/image?username=${userdetail.image}`}  alt="skashfka"></img>
        
        <div className="user_profile">
          <button onClick={edit} className="edi"> Edit Details</button>
          <h1 className="profile_name">{userdetail.username}</h1>
          <div className="user_follow">
            <p className="profile_post">Post {totalpost}</p>
          </div>
         
        </div>
      </div>
      <div className="border"></div>
      <div className="post_bar">
        
         
         {
          details.map((detail,index)=>(
            
            <Card key={index} image={detail.image} />
          ))
        }
                   

               

      
      </div>

    </>

  )


}