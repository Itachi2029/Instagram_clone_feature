import Login from "./Components/login/Login";
import Signup from "./Components/Signup/Signup";
import Context from "./Context";
import Profile from "./Components/Profile/Profile";
import Edit from "./Components/Edit/Edit";

import { useState } from "react";
import Home from './Components/Home/Home';
import { BrowserRouter as Router,Route,Routes, Navigate} from "react-router-dom";

function App() {
  
  const isAuthenticated=localStorage.getItem('login')
  

  const [user, setUser] = useState(localStorage.getItem('username'));
  const[isPost,setisPost]=useState(true);
  
  
  const User=
  {
    user,
    setUser,
    
    isPost,
    setisPost,
    
  }

  return (
   
    <Context.Provider value={User}>



      
      
            
      <Router>
            <Routes>
                 <Route path="/" Component={Login}/>
                 <Route path="/signup" Component={Signup}/>
                 <Route path="/Home" element={isAuthenticated?<Home/>:<Navigate to="/"/>}/>
                 <Route path="/Profile/:user" element={isAuthenticated?<Profile/>:<Navigate to="/"/>}/>
                 <Route path="/Edit/:image/:username" element={isAuthenticated?<Edit/>:<Navigate to="/"/>}/>
               
               
            </Routes>
          
      </Router>
          
    
    
    </Context.Provider>
  );
}

export default App;
