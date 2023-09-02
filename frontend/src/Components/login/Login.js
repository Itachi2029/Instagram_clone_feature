import { useState,useRef} from 'react';
import '../login/Login.css';

import { useNavigate } from 'react-router-dom'; 



export default function Login() {

    const Usernameref = useRef(null)
    const Passwordref = useRef(null)
    const [msg,setmsg]=useState('')
    const navigate = useNavigate();

    
    
   
        
          
         





    const input = async () => {
        const Username = Usernameref.current.value
        const Password = Passwordref.current.value

        return { Username, Password }
    }

    const validation = ({ Username, Password }) => {

        if (Username.trim().length === 0) {
            alert('Check the input')
            return false
        }
        else if (Password.trim().length === 0) {
            alert('Check the input')
            return false
        }
        return true
    }

    const checker = async ({ Username, Password }) => {

        const form = new FormData()
        form.append('Username', Username)
        form.append('Password', Password)
        console.log(Username, Password)
        return form

    }

    const finalsubmit = async ({ check }) => {
        const url = "http://localhost:4000/login"

        return await fetch(url, {
            method:
                "POST",
            body:
                check,

        })



    }

    const Tran=async()=>{
       navigate("/Home")
    }


    const onsubmit = async () => {
        const { Username, Password } = await input()
        if (validation({ Username, Password })) {
    
            Usernameref.current.value = ''
            Passwordref.current.value = ''
            const check = await checker({ Username, Password })
            await finalsubmit({ check })
                .then(response => {

                    
                    return response.json()
                })
                .then(data => {
                    console.log(data.success)
                    if(data.success){
                        localStorage.setItem('username',data.data.username)
                        localStorage.setItem('login',true)
                        Tran()
                        console.log('home')
                    
                    }
                    else if (data.error) {
                        setmsg(data.error)
                    }
                })
                .catch(error => {
                    alert('Something went error', error)
                })



        }

    }




    return (


        <>
    

        
        
    
        <div className='Signup1'>

     
            <div className="lo">

                <p className='title'>Instagram</p>






                <div className='inputss'>
                    <input className="input" placeholder='Username' ref={Usernameref} ></input>
                    <input className="input" placeholder='Password' ref={Passwordref}></input>
                </div>

                <button className='sign' onClick={onsubmit}>Log In</button>

                <div className="line-container">
                    <div className="line"></div>
                    <div className="text">OR</div>
                    <div className="line"></div>
                </div>
                <a href="sfsdf"> Log in with Facebook</a>
                <p className='error'>{msg}</p>







            </div>
            <div className='l2'>

                <p> Don't have an account? <a href="signup"> Sign up</a></p>

            </div>

        </div>
    </>

    )
}