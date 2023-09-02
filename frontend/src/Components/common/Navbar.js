
import './Modal.css';
import Homes from '../img/Homes.png';
import  Search  from '../img/Search.png';
import explore from '../img/explore.png'
import { useState } from 'react';
import  Context  from '../../Context';
import { useContext } from 'react';
import withModal from './Modal';
import AddPost from '../AddPost/Add';
import { useNavigate } from 'react-router-dom';
import Searchs from '../Search/Searchs'




const Navabar=(props)=>{
    const{user,setUser}=useContext(Context)
    const{toggleModal}=props
    const Navgiate=useNavigate()
    const[tog,settog]=useState(false)
    const Logout=()=>{
        setUser(null)
        localStorage.clear()
        Navgiate('/')

    }
    const Posts=()=>{
        toggleModal('addPost')
    }

    const searching=()=>{
        settog(!tog)
    }

   
   
    const Profile=()=>{
    
        Navgiate(`/Profile/${user}`)
    }
   

    return (
        <>
        
            <div className='navbar'>
                <h3>Instagram</h3>
                <nav>
                    <ul>
                        <li> 
                            <a href="/Home">
                               <img className="home" src={Homes} alt="jomr" /> <p>Home</p>
                               </a>
                        </li>
                        <li onClick={searching}>
                          
                             <img className="home" src={Search} alt="jomr" /><p>Search</p> 
                        
                        </li>
                        <li onClick={Posts}>
                           
                                 <img className="home" src={explore} alt="jomr" /><p>Post</p> 
                            
                        </li>
                       

                        <li onClick={Profile}>
                           <img  className="Profile" src={`http://localhost:4000/user?username=${user}`} alt="jomr" /><p>Profile</p>
                        </li>

                        <li  onClick={Logout}>
                           <img  className="home" src={explore} alt="jomr" /><p>Logput</p>
                        </li>

                    </ul>
                </nav>
                
            </div>
            {  tog && <Searchs toggle={settog}/>

            }
            
        </>
    )
    }
export default withModal(AddPost)(Navabar);
