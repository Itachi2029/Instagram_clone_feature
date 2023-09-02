import './Profile.css';
export default function Card(porps){
    const{image}=porps
     
    

    return(
        
        
        <img className='imagi' src={`http://localhost:4000/image?username=${image}`} alt="hfjf" />
        
       
         
    )

}