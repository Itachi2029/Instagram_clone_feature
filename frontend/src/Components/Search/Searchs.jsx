
import './Searchs.css';
import React,  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Searchs(props){
    const[users,setUsers]=useState([])
    const [input,setinput]=useState(null)
    const Navigator=useNavigate()
    const {toggle}=props
    

    useEffect(() => {
        const fetchData = async () => {
            const url = "http://localhost:4000/all";
            try {
                const response = await fetch(url, { method: 'GET' });
                const data = await response.json(); 
                setUsers(data);

            } catch (error) {
                console.error('Error fetching data:', error);
                alert('An error occurred while fetching data');
            }
        };

        fetchData();
    }, []);

    if(!users)
      return 
    console.log(users)
    const submit=(event)=>{
        setinput(event.target.value)
        const ul = document.getElementsByClassName('user-list');
        const li = ul[0].getElementsByTagName("li");
    
        for (var i = 0; i < li.length; i++) {
            const listItemText = li[i].innerText; 
            if (listItemText.indexOf(input) > -1) {
                li[i].style.display = "flex"; // Show the list item
            } else {
                li[i].style.display = "none"; // Hide the list item
            }
        }
    }

    console.log(input)
    const link=(user)=>{
          Navigator(`/Profile/${user}`)
          toggle(false)
    }
    return(<>
    
      <div className='search'>
         <div className='input_search'>
             <input onChange={submit} placeholder="Search for user"></input> 
         </div>

         <ul className="user-list">

         {
              users.map((user,index)=>(
                <>
                    <li key={index} className="user-card" onClick={() => link(user.username)}>
                       <img src={`http://localhost:4000/image?username=${user.image}`} alt="resource" ></img>
                        
                        <p>{user.username}</p>
                    </li>
                </>

              ))            
         }
         </ul>


      
      </div>
       
    </>)
}

 